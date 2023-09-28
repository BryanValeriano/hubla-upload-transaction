import { container } from '@/server/container';
import UploadTransactionFileController from '@/server/controllers/UploadTransactionFileController';
import IFileTransactionParser from '@/server/parser/IFileTransactionParser';
import Base64toTransactionParser from '@/server/parser/base64toTransactionParser';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const base64File = data.file;

    if (!base64File || typeof base64File !== 'string') {
      return NextResponse.json({ success: false, error: 'File not provided' }, { status: 400 });
    }

    const base64Content = base64File.split(',')[1];
    if (!base64Content) {
      return NextResponse.json({ success: false, error: 'Invalid file format' }, { status: 400 });
    }

    const parser = new Base64toTransactionParser() as IFileTransactionParser;
    const { transactionRepository } = container();
    const { userRepository } = container();
    const uploadTransactionFileController = new UploadTransactionFileController({ parser, transactionRepository, userRepository });
    const { transactions, errors } = uploadTransactionFileController.execute(base64Content);

    if (errors.length > 0) {
      return NextResponse.json({ success: false, errors }, { status: 400 });
    } else {
      return NextResponse.json({ success: true, transactions }, { status: 201 });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: 'Internal Server Error' }, { status: 500 });
  }
}
