'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setUploading(true);
    setMessage('');

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: file,
        headers: {
          'x-file-name': file.name,
        }
      });

      const result = await response.json();
      
      if (result.success) {
        router.push(`/documents/${result.documentId}`);
      } else {
        setMessage(`❌ Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('❌ Upload failed');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-950 py-12 px-4">
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          📄 AI Document Analyzer
        </h1>
        
        <div className="bg-white rounded-lg shadow-md p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload PDF
              </label>
              <input
                type="file"
                accept=".pdf"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="block w-full text-sm text-gray-500
                  file:mr-4 file:py-2 file:px-4
                  file:rounded-full file:border-0
                  file:text-sm file:font-semibold
                  file:bg-blue-50 file:text-green-700
                  hover:file:bg-blue-100"
              />
            </div>
            
            <button
              type="submit"
              disabled={!file || uploading}
              className="w-full bg-green-600 text-white py-2 px-4 rounded-md
                hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {uploading ? 'Uploading...' : 'Upload PDF'}
            </button>
          </form>
          
          {message && (
            <div className="mt-4 p-3 rounded-md bg-blue-50 text-blue-700">
              {message}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}