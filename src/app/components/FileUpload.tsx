"use client";

import Transaction from '@/server/entities/Transaction';
import React, { useState, useRef, DragEvent, ChangeEvent, FormEvent } from 'react';
import ErrorParserList from './ErrorParserList';
import TransactionList from './TransactionList';

export default function FileUpload() {
  const [dragging, setDragging] = useState<boolean>(false);
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success' | 'error'>('idle');

  const [transactions, setTransactions] = useState<Omit<Transaction, "id">[]>([]); // Substitua por seu tipo de transação real
  const [errors, setErrors] = useState<string[]>([]);

  const getBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const onDragOver = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDragging(true);
  };

  const onDragLeave = (): void => {
    setDragging(false);
  };

  const onDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault();
    setDragging(false);
    const transferredFiles = event.dataTransfer.files;
    if (transferredFiles && transferredFiles.length > 0) {
      setFile(transferredFiles[0]);
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const inputFiles = event.target.files;
    if (inputFiles && inputFiles.length > 0) {
      setFile(inputFiles[0]);
    }
  };

  const onBrowseClick = (): void => {
    fileInputRef.current?.click();
  };

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) return;

    setUploadState('idle');
    setErrors([]);
    setTransactions([]);

    try {
      setUploadState('uploading');

      const base64File = await getBase64(file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ file: base64File, fileName: file.name }),
      });

      if (!response.ok) {
        const data = await response.json();
        setErrors(data.errors || ['Upload failed']);
      } else {
        const data = await response.json();
        setTransactions(data.transactions || []);
      }

      setUploadState('success');
    } catch (error) {
      console.error(error);
      setUploadState('error');
    }
  };

  return (
    <form className="max-w-xs mx-auto mt-4" onSubmit={onSubmit}>
      <div
        className={`p-5 border-2 rounded-lg text-center cursor-pointer transition-all ease-in-out duration-300 ${dragging ? 'border-blue-500' : 'border-gray-300'
          }`}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={onBrowseClick}
      >
        <p className="text-gray-500">Drag & Drop file here or click to browse</p>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        onChange={onFileChange}
      />
      {file && <p className="mt-3 text-gray-700">Selected file: {file.name}</p>}
      <button type="submit" className="mt-3 px-4 py-2 bg-blue-500 text-white rounded">
        Upload
      </button>
      <div>
        {uploadState === 'uploading' && <p>Uploading...</p>}
        {uploadState === 'success' && <p>Upload Successful!</p>}
        {uploadState === 'error' && <p>Upload Failed. Please try again.</p>}
      </div>
      <div>
        {errors.length > 0 && <ErrorParserList errors={errors} />}
        {transactions.length > 0 && <TransactionList transactions={transactions} />}
      </div>
    </form>
  );
}
