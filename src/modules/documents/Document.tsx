import React from 'react';

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
    <div>
      {id}-{filename}-{author}-{created_at}-{hash}-{size}
    </div>
  );
};

export default Document;
