import { notFound } from 'next/navigation';
import Document from '@/models/Document';
import Section from '@/models/Section';
import DocumentViewer from './DocumentViewer';

interface Props {
  params: { id: string };
}

export default async function DocumentPage({ params }: Props) {
  const { id } = await params;

  // Fetch document with sections
  const document = await Document.findByPk(id, {
    include: [{ model: Section, as: 'sections', order: [['orderIndex', 'ASC']] }],
  });

  if (!document) {
    notFound();
  }

  // Serialize for client component
  const serialized = {
    id: document.id,
    filename: document.filename,
    originalName: document.originalName,
    createdAt: document.createdAt.toISOString(),
    sections: document.sections?.map((s) => ({
      id: s.id,
      title: s.title,
      content: s.content,
      orderIndex: s.orderIndex,
    })) || [],
  };

  return (
    <div className="min-h-screen bg-green-900">
      <DocumentViewer document={serialized} />
    </div>
  );
}