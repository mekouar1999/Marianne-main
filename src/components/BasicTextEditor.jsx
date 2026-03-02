import React, { useRef, useEffect, useCallback } from 'react';
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  List,
  ListOrdered,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Link,
  Undo,
  Redo,
  Quote,
  Minus
} from 'lucide-react';

/* -----------------------------------------------------------------------
   Word-like WYSIWYG editor — contentEditable + execCommand.
   Content is stored/emitted as HTML (same format the blog uses).
----------------------------------------------------------------------- */
const BasicTextEditor = ({ value, onChange, placeholder }) => {

  const editorRef = useRef(null);
  const initialised = useRef(false);
  const [styleValue, setStyleValue] = React.useState("");
  const [fontSizeValue, setFontSizeValue] = React.useState("");
  const [currentColor, setCurrentColor] = React.useState('#000000');
  const colorInputRef = useRef(null);
  const savedSelection = useRef(null);

  // Set initial HTML once on mount; also reset when parent clears value.
  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    if (!initialised.current) {
      el.innerHTML = value || '';
      initialised.current = true;
      return;
    }
    // Sync only when value is cleared externally (e.g. after form submit)
    if ((value === '' || value == null) && el.innerHTML !== '') {
      el.innerHTML = '';
    }
  }, [value]);

  const emitChange = useCallback(() => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  // ── Formatting helpers ──────────────────────────────────────────────
  const exec = (command, arg = null) => {
    editorRef.current?.focus();
    document.execCommand(command, false, arg);
    emitChange();
  };

  const formatBlock = (tag) => exec('formatBlock', tag);

  const insertHR = () =>
    exec('insertHTML', '<hr style="border:none;border-top:1px solid #d1d5db;margin:1rem 0" />');

  const insertLink = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString() || '';
    const url = window.prompt('URL du lien :', 'https://');
    if (!url) return;
    if (selectedText) {
      exec('createLink', url);
    } else {
      const text = window.prompt('Texte du lien :', url) || url;
      exec('insertHTML', `<a href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`);
    }
  };

  // Save / restore selection (needed for color picker which steals focus)
  const saveSelection = () => {
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      savedSelection.current = sel.getRangeAt(0).cloneRange();
    }
  };

  const restoreSelection = () => {
    if (savedSelection.current) {
      const sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(savedSelection.current);
    }
  };

  // Convert rgb(r,g,b) → #rrggbb
  const rgbToHex = (rgb) => {
    const m = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (!m) return '#000000';
    return '#' + m.slice(1).map(n => parseInt(n).toString(16).padStart(2, '0')).join('');
  };

  // Apply exact pixel font size using insertHTML (fully undo-trackable)
  const applyFontSize = (px) => {
    if (!px || px <= 0) return;
    editorRef.current?.focus();
    restoreSelection();
    const sel = window.getSelection();
    if (!sel || sel.rangeCount === 0) return;
    const range = sel.getRangeAt(0);
    if (range.collapsed) {
      // No selection: just record the desired size; next typed char will get it
      // via a zero-width span trick
      document.execCommand('fontSize', false, '7');
      const fonts = editorRef.current.querySelectorAll('font[size="7"]');
      fonts.forEach((font) => {
        font.removeAttribute('size');
        font.style.fontSize = px + 'px';
      });
    } else {
      // Wrap selected HTML in a sized span via insertHTML (tracked by undo)
      const selectedHtml = (() => {
        const div = document.createElement('div');
        div.appendChild(range.cloneContents());
        return div.innerHTML;
      })();
      document.execCommand(
        'insertHTML', false,
        `<span style="font-size:${px}px">${selectedHtml}</span>`
      );
    }
    emitChange();
  };

  // Update the color swatch and font size to reflect the color/size at the current cursor position
  const updateCurrentColorAndFontSize = () => {
    // Color
    const raw = document.queryCommandValue('foreColor');
    if (raw) setCurrentColor(rgbToHex(raw));
    // Font size
    {
      let px = '';
      const sel = window.getSelection();
      if (sel && sel.rangeCount > 0) {
        let node = sel.anchorNode;
        if (node && node.nodeType === 3) node = node.parentNode;
        while (node && node !== editorRef.current) {
          const fs = window.getComputedStyle(node).fontSize;
          if (fs && fs.endsWith('px')) {
            px = parseInt(fs, 10);
            break;
          }
          node = node.parentNode;
        }
      }
      setFontSizeValue(px ? String(px) : '');
    }
  };

  // Prevent toolbar clicks from stealing focus / losing selection
  const handleToolbarMouseDown = (e) => e.preventDefault();

  // ── Sub-components ──────────────────────────────────────────────────
  const ToolBtn = ({ onClick, title, children }) => (
    <button
      type="button"
      title={title}
      onMouseDown={handleToolbarMouseDown}
      onClick={onClick}
      className="p-1.5 rounded text-gray-600 hover:bg-gray-200 hover:text-gray-900 transition-colors"
    >
      {children}
    </button>
  );

  const Sep = () => <span className="w-px h-5 bg-gray-300 mx-0.5 self-center shrink-0" />;


  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden shadow-sm">

      {/* ── Toolbar ─────────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-b border-gray-200 px-3 py-2 flex flex-wrap items-center gap-1">

        {/* Paragraph / heading style */}
        <select
          value={styleValue}
          onChange={(e) => {
            const val = e.target.value;
            if (val) {
              formatBlock(val);
              setTimeout(() => setStyleValue(''), 0);
            }
          }}
          className="text-xs border border-gray-300 rounded px-1.5 py-1 text-gray-700 bg-white focus:outline-none"
          title="Style de paragraphe"
        >
          <option value="" disabled>Style</option>
          <option value="p">Paragraphe</option>
          <option value="h1">Titre 1</option>
          <option value="h2">Titre 2</option>
          <option value="h3">Titre 3</option>
          <option value="h4">Titre 4</option>
          <option value="blockquote">Citation</option>
        </select>

        {/* Font size */}
        <select
          value={fontSizeValue}
          onMouseDown={saveSelection}
          onChange={(e) => {
            const val = e.target.value;
            if (val) {
              applyFontSize(Number(val));
              setTimeout(() => setFontSizeValue(''), 0);
            }
          }}
          className="text-xs border border-gray-300 rounded px-1.5 py-1 text-gray-700 bg-white focus:outline-none"
          title="Taille de police (px)"
        >
          <option value="" disabled>Taille</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="18">18</option>
          <option value="20">20</option>
          <option value="24">24</option>
          <option value="28">28</option>
          <option value="32">32</option>
          <option value="36">36</option>
          <option value="48">48</option>
          <option value="64">64</option>
        </select>

        {/* Text color */}
        <label
          title="Couleur du texte"
          className="relative flex items-center px-1.5 h-7 rounded cursor-pointer text-gray-600 hover:bg-gray-200 transition-colors"
          onMouseDown={saveSelection}
        >
          {/* A + live color swatch */}
          <span className="flex flex-col items-center leading-none select-none">
            <span className="text-sm font-bold font-serif" style={{ color: currentColor }}>A</span>
            <span className="w-4 h-1.5 rounded-sm mt-0.5 border border-gray-300" style={{ backgroundColor: currentColor }} />
          </span>
          <input
            ref={colorInputRef}
            type="color"
            value={currentColor}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            onChange={(e) => {
              setCurrentColor(e.target.value);
              editorRef.current?.focus();
              restoreSelection();
              exec('foreColor', e.target.value);
            }}
          />
        </label>

        <Sep />

        <ToolBtn onClick={() => exec('bold')} title="Gras (Ctrl+B)">
          <Bold className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => exec('italic')} title="Italique (Ctrl+I)">
          <Italic className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => exec('underline')} title="Souligné (Ctrl+U)">
          <Underline className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => exec('strikeThrough')} title="Barré">
          <Strikethrough className="w-4 h-4" />
        </ToolBtn>

        <Sep />

        <ToolBtn onClick={() => exec('justifyLeft')} title="Aligner à gauche">
          <AlignLeft className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => exec('justifyCenter')} title="Centrer">
          <AlignCenter className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => exec('justifyRight')} title="Aligner à droite">
          <AlignRight className="w-4 h-4" />
        </ToolBtn>

        <Sep />

        <ToolBtn onClick={() => exec('insertUnorderedList')} title="Liste à puces">
          <List className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => exec('insertOrderedList')} title="Liste numérotée">
          <ListOrdered className="w-4 h-4" />
        </ToolBtn>

        <Sep />

        <ToolBtn onClick={insertLink} title="Insérer un lien">
          <Link className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={insertHR} title="Séparateur horizontal">
          <Minus className="w-4 h-4" />
        </ToolBtn>

        <Sep />

        <ToolBtn onClick={() => exec('undo')} title="Annuler (Ctrl+Z)">
          <Undo className="w-4 h-4" />
        </ToolBtn>
        <ToolBtn onClick={() => exec('redo')} title="Rétablir (Ctrl+Y)">
          <Redo className="w-4 h-4" />
        </ToolBtn>
      </div>

      {/* ── Editable area ───────────────────────────────────────────── */}
      <div
        ref={editorRef}
        contentEditable
        suppressContentEditableWarning
        onInput={emitChange}
        onBlur={emitChange}
        onMouseUp={updateCurrentColorAndFontSize}
        onKeyUp={updateCurrentColorAndFontSize}
        data-placeholder={placeholder || 'Commencez à écrire votre article ici…'}
        className="min-h-[380px] max-h-[640px] overflow-y-auto p-5 outline-none bg-white
          prose prose-sm sm:prose max-w-none
          [&:empty]:before:content-[attr(data-placeholder)]
          [&:empty]:before:text-gray-400
          [&:empty]:before:pointer-events-none"
        style={{ lineHeight: '1.75' }}
      />

      {/* ── Footer hint ─────────────────────────────────────────────── */}
      <div className="bg-gray-50 border-t border-gray-200 px-3 py-1.5 flex items-center gap-2 text-xs text-gray-400">
        <Quote className="w-3 h-3 shrink-0" />
        <span>Vous pouvez coller du texte depuis Word — la mise en forme sera conservée.</span>
      </div>
    </div>
  );
};

export default BasicTextEditor;