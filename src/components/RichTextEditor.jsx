import React, { useState, useRef, useEffect } from 'react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Link,
  Quote,
  Type,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';

const RichTextEditor = ({ value, onChange, placeholder }) => {
  const editorRef = useRef(null);
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [linkText, setLinkText] = useState('');
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize content only once to avoid cursor issues
  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = value || '';
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  // Handle empty content case
  const handleKeyDown = (e) => {
    // If editor is empty and user types, start with a paragraph
    if (editorRef.current.innerHTML === '' || editorRef.current.innerHTML === '<br>') {
      if (e.key.length === 1 || e.key === 'Enter') {
        document.execCommand('formatBlock', false, 'p');
      }
    }
  };

  const saveSelection = () => {
    const selection = window.getSelection();
    if (selection.rangeCount > 0) {
      return selection.getRangeAt(0);
    }
    return null;
  };

  const restoreSelection = (range) => {
    if (range) {
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
    }
  };

  const formatText = (command, value = null) => {
    const range = saveSelection();
    editorRef.current.focus();
    
    // Small delay to ensure focus is set
    setTimeout(() => {
      if (range) {
        restoreSelection(range);
      }
      document.execCommand(command, false, value);
      updateContent();
    }, 10);
  };

  const updateContent = () => {
    if (editorRef.current && onChange) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleInput = (e) => {
    // Use a debounced update to avoid constant re-rendering
    setTimeout(() => {
      updateContent();
    }, 100);
  };

  const insertHeading = (level) => {
    formatText('formatBlock', `h${level}`);
  };

  const insertLink = () => {
    if (linkUrl && linkText) {
      const range = saveSelection();
      editorRef.current.focus();
      
      setTimeout(() => {
        if (range) {
          restoreSelection(range);
        }
        const linkHtml = `<a href="${linkUrl}" class="text-blue-600 hover:text-blue-700 underline">${linkText}</a>`;
        document.execCommand('insertHTML', false, linkHtml);
        setShowLinkInput(false);
        setLinkUrl('');
        setLinkText('');
        updateContent();
      }, 10);
    }
  };

  const insertList = (ordered = false) => {
    formatText(ordered ? 'insertOrderedList' : 'insertUnorderedList');
  };

  const insertQuote = () => {
    formatText('formatBlock', 'blockquote');
  };

  const setAlignment = (align) => {
    formatText(`justify${align}`);
  };

  const toolbarButtons = [
    {
      group: 'headings',
      buttons: [
        { icon: Heading1, action: () => insertHeading(1), title: 'Titre 1' },
        { icon: Heading2, action: () => insertHeading(2), title: 'Titre 2' },
        { icon: Heading3, action: () => insertHeading(3), title: 'Titre 3' },
      ]
    },
    {
      group: 'formatting',
      buttons: [
        { icon: Bold, action: () => formatText('bold'), title: 'Gras' },
        { icon: Italic, action: () => formatText('italic'), title: 'Italique' },
        { icon: Underline, action: () => formatText('underline'), title: 'Souligné' },
      ]
    },
    {
      group: 'lists',
      buttons: [
        { icon: List, action: () => insertList(false), title: 'Liste à puces' },
        { icon: ListOrdered, action: () => insertList(true), title: 'Liste numérotée' },
        { icon: Quote, action: insertQuote, title: 'Citation' },
      ]
    },
    {
      group: 'alignment',
      buttons: [
        { icon: AlignLeft, action: () => setAlignment('Left'), title: 'Aligner à gauche' },
        { icon: AlignCenter, action: () => setAlignment('Center'), title: 'Centrer' },
        { icon: AlignRight, action: () => setAlignment('Right'), title: 'Aligner à droite' },
      ]
    }
  ];

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      <style jsx>{`
        [data-placeholder]:empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          position: absolute;
        }
        [contenteditable] {
          outline: none;
        }
      `}</style>
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-3">
        <div className="flex flex-wrap gap-2">
          {toolbarButtons.map((group, groupIndex) => (
            <div key={groupIndex} className="flex gap-1">
              {group.buttons.map((button, buttonIndex) => {
                const IconComponent = button.icon;
                return (
                  <button
                    key={buttonIndex}
                    type="button"
                    onClick={button.action}
                    title={button.title}
                    className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
                  >
                    <IconComponent className="w-4 h-4" />
                  </button>
                );
              })}
              {groupIndex < toolbarButtons.length - 1 && (
                <div className="w-px bg-gray-300 mx-1"></div>
              )}
            </div>
          ))}
          
          {/* Link Button */}
          <div className="w-px bg-gray-300 mx-1"></div>
          <button
            type="button"
            onClick={() => setShowLinkInput(!showLinkInput)}
            title="Insérer un lien"
            className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
          >
            <Link className="w-4 h-4" />
          </button>
        </div>

        {/* Link Input */}
        {showLinkInput && (
          <div className="mt-3 p-3 bg-white border border-gray-200 rounded">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-2">
              <input
                type="text"
                placeholder="Texte du lien"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              />
              <input
                type="url"
                placeholder="https://example.com"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className="px-3 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={insertLink}
                className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
              >
                Insérer
              </button>
              <button
                type="button"
                onClick={() => setShowLinkInput(false)}
                className="px-3 py-1 bg-gray-300 text-gray-700 rounded text-sm hover:bg-gray-400"
              >
                Annuler
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Editor */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={updateContent}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning={true}
        className="min-h-[300px] p-4 focus:outline-none prose prose-sm max-w-none
                   prose-headings:text-gray-900 prose-p:text-gray-700 
                   prose-a:text-blue-600 prose-strong:text-gray-900
                   prose-ul:list-disc prose-ol:list-decimal
                   prose-blockquote:border-l-4 prose-blockquote:border-gray-300 
                   prose-blockquote:pl-4 prose-blockquote:italic relative"
        style={{ 
          whiteSpace: 'pre-wrap',
          direction: 'ltr',
          textAlign: 'left',
          unicodeBidi: 'embed'
        }}
        data-placeholder={placeholder}
      />

      {/* Help Text */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-500">
        Utilisez les boutons de la barre d'outils pour formater votre texte. 
        Sélectionnez du texte et cliquez sur un bouton pour appliquer le formatage.
      </div>
    </div>
  );
};

export default RichTextEditor;