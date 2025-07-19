'use client';
import { useState } from 'react';

interface Props {
  sectionId: string;
}

export default function QuestionBox({ sectionId }: Props) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    const res = await fetch('/api/ask', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ question, sectionId }),
    });
    const data = await res.json();
    setAnswer(data.answer || data.error);
    setLoading(false);
  };

  return (
    <div className="p-4 mb-6 bg-white rounded-lg shadow-sm">
      <h3 className="text-lg font-semibold mb-2 text-green-600">Ask about this section</h3>
      <textarea
        value={question}
        onChange={e => setQuestion(e.target.value)}
        placeholder="Type your question..."
        className="w-full rounded p-2 text-sm text-black bg-green-100"
        rows={2}
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-2 bg-green-600 text-white px-4 py-2 rounded disabled:bg-gray-400"
      >
        {loading ? 'Thinking...' : 'Ask Gemini'}
      </button>
      {answer && (
        <div className="mt-4 p-3 bg-green-50 rounded text-sm text-black">
          <strong>Answer:</strong> {answer}
        </div>
      )}
    </div>
  );
}