import React from 'react';
import './Document.css';

export interface DocumentProps {
  id: string,
  filename: string,
  author: string,
  created_at: string,
  hash: string,
  size: number
}

const Document = ({ id, filename, author, created_at, hash, size }: DocumentProps) => {
  return (
    <div className='Document--container'>
      <div className='Document--section text-section'>
        <span className='Document--prop' aria-label='Document ID'>{id}</span>
        <span className='Document--prop' aria-label='Document hash'>{hash}</span>
        <span className='Document--prop' aria-label='Author'>{author}</span>
      </div>
      <div className='Document--section text-section'>
        <span className='Document--prop' aria-label='File name'>{filename}</span>
        <span className='Document--prop' aria-label='File size'>{size} kb</span>
        <span className='Document--prop' aria-label='Document created at'>{new Date(created_at).toLocaleString()}</span>
      </div>
      <div className='Document--section'>-</div>
    </div>
  );
};

export default Document;
