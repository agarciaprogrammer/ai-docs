'use client';

import { useState } from 'react';
import QuestionBox from './QuestionBox';

interface Section {
  id: string;
  title: string;
  content: string;
  orderIndex: number;
}

interface Document {
  id: string;
  filename: string;
  originalName: string;
  createdAt: string;
  sections: Section[];
}

export default function DocumentViewer({ document }: { document: Document }) {
  const [currentSection, setCurrentSection] = useState(0);

  const section = document.sections[currentSection];

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{document.originalName}</h1>
        <p className="text-sm text-gray-500">Uploaded: {new Date(document.createdAt).toLocaleDateString()}</p>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
            disabled={currentSection === 0}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300"
          >
            ← Previous
          </button>
          
          <span className="text-sm text-gray-600">
            Section {currentSection + 1} of {document.sections.length}
          </span>
          
          <button
            onClick={() => setCurrentSection(Math.min(document.sections.length - 1, currentSection + 1))}
            disabled={currentSection === document.sections.length - 1}
            className="px-4 py-2 bg-green-600 text-white rounded disabled:bg-gray-300"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Question Box */}
      <div className="mb-6">
        <QuestionBox sectionId={section.id} />
      </div>

      {/* Section Content */}
      <div className="bg-white rounded-lg shadow-sm p-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b border-gray-200 pb-3">{section.title}</h2>
        <div className="prose prose-lg max-w-none">
          <div className="text-gray-700 leading-relaxed space-y-4 text-justify">
            {section.content.split('\n').map((paragraph, index) => {
              const trimmedParagraph = paragraph.trim();
              if (!trimmedParagraph) return null;
              
              // Detectar títulos (líneas que terminan con números o están en mayúsculas)
              const isTitle = /^[A-Z\s]+$/.test(trimmedParagraph) || 
                             /^\d+\.\s/.test(trimmedParagraph) ||
                             trimmedParagraph.length < 50 && /^[A-Z]/.test(trimmedParagraph);
              
              // Detectar listas
              const isList = /^[-•*]\s/.test(trimmedParagraph) || /^\d+\.\s/.test(trimmedParagraph);
              
              if (isTitle) {
                return (
                  <h3 key={index} className="text-lg font-semibold text-gray-800 mt-6 mb-3 text-justify">
                    {trimmedParagraph}
                  </h3>
                );
              }
              
              if (isList) {
                return (
                  <div key={index} className="flex items-start space-x-2 text-justify">
                    <span className="text-green-600 mt-1">•</span>
                    <span className="flex-1">{trimmedParagraph.replace(/^[-•*]\s/, '')}</span>
                  </div>
                );
              }
              
              return (
                <p key={index} className="text-base leading-relaxed">
                  {trimmedParagraph}
                </p>
              );
            })}
          </div>
        </div>
      </div>

      {/* Section List */}
      <div className="mt-6 bg-white rounded-lg shadow-sm p-4">
        <h3 className="text-sm font-semibold mb-2">Sections</h3>
        <div className="space-y-1">
          {document.sections.map((s, idx) => (
            <button
              key={s.id}
              onClick={() => setCurrentSection(idx)}
              className={`block w-full text-left px-3 py-2 text-sm rounded ${
                idx === currentSection
                  ? 'bg-green-100 text-green-700'
                  : 'hover:bg-gray-100'
              }`}
            >
              {s.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}