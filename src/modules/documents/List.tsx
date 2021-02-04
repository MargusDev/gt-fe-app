import React from 'react';
import Document, { DocumentProps } from './Document';

interface Props {
  documents: DocumentProps[]
}

const List = ({ documents }: Props) => {
  return (
    <ul data-testid='document-list'>
      {documents.map(document => <li key={document.id}><Document {...document} /></li>)}
    </ul>
  );
};

export default List;
