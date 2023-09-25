import { writeFile } from 'fs/promises'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const base64File = data.file;

    if (!base64File || typeof base64File !== 'string') {
      return NextResponse.json({ success: false, error: 'File not provided' }, { status: 400 });
    }

    // Extracting the Base64 content from the Data URL
    const base64Content = base64File.split(',')[1];
    if (!base64Content) {
      return NextResponse.json({ success: false, error: 'Invalid file format' }, { status: 400 });
    }

    const buffer = Buffer.from(base64Content, 'base64');

    // Debugging: Log the size of the buffer
    console.log('Buffer size:', buffer.length);

    const path = `/tmp/${data.fileName || 'uploadedFile'}`;
    await writeFile(path, buffer);

    console.log(`open ${path} to see the uploaded file`);

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
