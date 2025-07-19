import { NextRequest, NextResponse } from 'next/server';
import pdf from 'pdf-parse';
import { v4 as uuidv4 } from 'uuid';
import sequelize from '@/lib/db';
import { isDatabaseAvailable } from '@/lib/db';
import Document from '@/models/Document';
import Section from '@/models/Section';

export async function POST(request: NextRequest) {
  try {
    if (!isDatabaseAvailable()) {
      return NextResponse.json({ error: 'Database not available' }, { status: 503 });
    }

    // Initialize database
    await sequelize.authenticate();
    await sequelize.sync();

    const arrayBuffer = await request.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Parse PDF
    const pdfData = await pdf(buffer);
    const text = pdfData.text;
    
    // Simple section splitting by headers (H1, H2)
    const sections = text.split(/\n(?=#{1,2}\s)/g).map((section, index) => {
      const lines = section.split('\n');
      const title = lines[0].replace(/^#{1,2}\s*/, '').trim();
      const content = lines.slice(1).join('\n').trim();
      
      return {
        title: title || `Section ${index + 1}`,
        content: content || section,
        orderIndex: index,
      };
    }).filter(s => s.content.length > 0);

    // Store document
    const document = await Document.create({
      id: uuidv4(),
      filename: `${uuidv4()}.pdf`,
      originalName: request.headers.get('x-file-name') || 'uploaded.pdf',
    });

    // Store sections
    await Section.bulkCreate(
      sections.map(s => ({
        ...s,
        documentId: document.id, // guaranteed non-null now
      }))
    );

    return NextResponse.json({ 
      success: true, 
      documentId: document.id,
      sectionsCount: sections.length,
      message: 'Document processed successfully' 
    });
  } catch (error) {
    console.error('Processing error:', error);
    return NextResponse.json(
      { success: false, error: 'Processing failed' },
      { status: 500 }
    );
  }
}