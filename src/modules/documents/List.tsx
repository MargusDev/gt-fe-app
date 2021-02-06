import React from 'react';
import Document, { DocumentProps } from './Document';
import './List.css';
interface Props {
  documents: DocumentProps[]
}

const List = ({ documents }: Props) => {
  return (
    <ul className='Document--list-root' data-testid='document-list'>
      {documents.map(document => <li className='Document--list-item' key={document.id}><Document {...document} /></li>)}
    </ul>
  );
};

export default List;
