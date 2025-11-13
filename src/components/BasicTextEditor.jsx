import React, { useState } from 'react';
import {
  Type,
  Bold,
  Italic,
  List,
  Quote,
  Link,
  Eye,
  Code
} from 'lucide-react';
import { proseClasses } from '../utils/proseClasses';

const BasicTextEditor = ({ value, onChange, placeholder }) => {
  const [content, setContent] = useState(value || '');
  const [showPreview, setShowPreview] = useState(false);

  const handleContentChange = (e) => {
    const newContent = e.target.value;
    setContent(newContent);
    if (onChange) {
      onChange(newContent);
    }
  };

  const addTemplate = (template) => {
    const newContent = content + '\n' + template + '\n';
    setContent(newContent);
    onChange(newContent);
  };

  const templates = [
    {
      icon: Type,
      label: 'Titre Principal',
      template: '<h2>Votre titre principal ici</h2>',
      title: 'Ajouter un titre principal'
    },
    {
      icon: Type,
      label: 'Sous-titre',
      template: '<h3>Votre sous-titre ici</h3>',
      title: 'Ajouter un sous-titre'
    },
    {
      icon: Bold,
      label: 'Texte gras',
      template: '<p><strong>Texte en gras</strong></p>',
      title: 'Ajouter du texte en gras'
    },
    {
      icon: Italic,
      label: 'Texte italique',
      template: '<p><em>Texte en italique</em></p>',
      title: 'Ajouter du texte en italique'
    },
    {
      icon: List,
      label: 'Liste à puces',
      template: '<ul>\n<li>Premier élément</li>\n<li>Deuxième élément</li>\n<li>Troisième élément</li>\n</ul>',
      title: 'Ajouter une liste à puces'
    },
    {
      icon: List,
      label: 'Liste numérotée',
      template: '<ol>\n<li>Premier élément</li>\n<li>Deuxième élément</li>\n<li>Troisième élément</li>\n</ol>',
      title: 'Ajouter une liste numérotée'
    },
    {
      icon: Quote,
      label: 'Citation',
      template: '<blockquote><p>Votre citation ici</p></blockquote>',
      title: 'Ajouter une citation'
    },
    {
      icon: Link,
      label: 'Lien',
      template: '<p><a href="https://example.com">Texte du lien</a></p>',
      title: 'Ajouter un lien'
    }
  ];

  const addParagraph = () => {
    addTemplate('<p>Votre paragraphe ici</p>');
  };

  return (
    <div className="border border-gray-300 rounded-lg overflow-hidden">
      {/* Toolbar */}
      <div className="bg-gray-50 border-b border-gray-300 p-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-700">Modèles rapides:</span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setShowPreview(false)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                !showPreview 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Code className="w-3 h-3 inline mr-1" />
              Éditer
            </button>
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              className={`px-3 py-1 text-xs rounded transition-colors ${
                showPreview 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <Eye className="w-3 h-3 inline mr-1" />
              Aperçu
            </button>
          </div>
        </div>
        
        {!showPreview && (
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={addParagraph}
              className="px-3 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
              + Paragraphe
            </button>
            
            {templates.map((template, index) => {
              const IconComponent = template.icon;
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => addTemplate(template.template)}
                  title={template.title}
                  className="inline-flex items-center gap-1 px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                >
                  <IconComponent className="w-3 h-3" />
                  {template.label}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Content Area */}
      {showPreview ? (
        /* Preview */
        <div className="min-h-[400px] p-4 bg-white">
          <div 
            className={proseClasses}
            dangerouslySetInnerHTML={{ __html: content || '<p class="text-gray-400">Aucun contenu à prévisualiser...</p>' }}
          />
        </div>
      ) : (
        /* Editor */
        <textarea
          value={content}
          onChange={handleContentChange}
          placeholder={placeholder || "Rédigez votre contenu ici...\n\nUtilisez les boutons ci-dessus pour ajouter des éléments formatés, ou tapez directement du HTML."}
          className="w-full min-h-[400px] p-4 resize-none focus:outline-none border-none bg-white text-gray-900"
          style={{
            fontFamily: 'Monaco, Menlo, "Ubuntu Mono", monospace',
            fontSize: '14px',
            lineHeight: '1.6',
            direction: 'ltr'
          }}
        />
      )}

      {/* Help Text */}
      <div className="bg-gray-50 border-t border-gray-300 px-4 py-2">
        <div className="text-xs text-gray-500">
          {showPreview ? (
            <p>👁️ <strong>Mode Aperçu:</strong> Voici comment votre contenu apparaîtra aux visiteurs. Cliquez sur "Éditer" pour modifier.</p>
          ) : (
            <div>
              <p className="mb-1">✏️ <strong>Mode Édition:</strong></p>
              <ul className="list-disc list-inside space-y-1">
                <li>Utilisez les boutons pour insérer des éléments formatés</li>
                <li>Modifiez le texte dans les balises HTML après insertion</li>
                <li>Cliquez sur "Aperçu" pour voir le résultat final</li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BasicTextEditor;