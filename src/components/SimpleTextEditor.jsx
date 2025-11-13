import React, { useState } from 'react';
import {
  Bold,
  Italic,
  Underline,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3
} from 'lucide-react';

const SimpleTextEditor = ({ value, onChange, placeholder }) => {
  const [content, setContent] = useState(value || '');

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  const insertFormatting = (before, after = '') => {
    const textarea = document.getElementById('simple-editor');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = content.substring(start, end);
    const newText = content.substring(0, start) + before + selectedText + after + content.substring(end);
    
    setContent(newText);
    onChange(newText);
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + before.length, start + before.length + selectedText.length);
    }, 10);
  };

  const formatButtons = [
    {
      icon: Heading1,
      action: () => insertFormatting('<h1>', '</h1>'),
      title: 'Titre 1'
    },
    {
      icon: Heading2,
      action: () => insertFormatting('<h2>', '</h2>'),
      title: 'Titre 2'
    },
    {
      icon: Heading3,
      action: () => insertFormatting('<h3>', '</h3>'),
      title: 'Titre 3'
    },
    {
      icon: Bold,
      action: () => insertFormatting('<strong>', '</strong>'),
      title: 'Gras'
    },
    {
      icon: Italic,
      action: () => insertFormatting('<em>', '</em>'),
      title: 'Italique'
    },
    {
      icon: Underline,
      action: () => insertFormatting('<u>', '</u>'),
      title: 'Souligné'
    },
    {
      icon: List,
      action: () => insertFormatting('<ul>\n<li>', '</li>\n</ul>'),
      title: 'Liste à puces'
    },
    {
      icon: ListOrdered,
      action: () => insertFormatting('<ol>\n<li>', '</li>\n</ol>'),
      title: 'Liste numérotée'
    }
  ];

  const insertParagraph = () => {
    insertFormatting('<p>', '</p>');
  };

  const insertLineBreak = () => {
    insertFormatting('<br>\n');
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-3">
        <div className="flex flex-wrap gap-2">
          {formatButtons.map((button, index) => {
            const IconComponent = button.icon;
            return (
              <button
                key={index}
                type="button"
                onClick={button.action}
                title={button.title}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
              >
                <IconComponent className="w-4 h-4" />
              </button>
            );
          })}
          
          <div className="w-px bg-gray-300 mx-1"></div>
          
          <button
            type="button"
            onClick={insertParagraph}
            title="Paragraphe"
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
          >
            P
          </button>
          
          <button
            type="button"
            onClick={insertLineBreak}
            title="Saut de ligne"
            className="px-3 py-1 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-200 rounded transition-colors"
          >
            BR
          </button>
        </div>
      </div>

      {/* Editor */}
      <textarea
        id="simple-editor"
        value={content}
        onChange={handleContentChange}
        placeholder={placeholder}
        className="w-full min-h-[300px] p-4 resize-none focus:outline-none border-none bg-white text-gray-900"
        style={{
          fontFamily: 'system-ui, -apple-system, sans-serif',
          fontSize: '14px',
          lineHeight: '1.6'
        }}
      />

      {/* Help Text */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2 text-xs text-gray-500">
        Sélectionnez du texte et cliquez sur un bouton pour ajouter des balises HTML. 
        Vous pouvez aussi taper directement les balises HTML.
      </div>
    </div>
  );
};

export default SimpleTextEditor;