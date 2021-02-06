import React, { useCallback, useEffect, useState } from 'react';
import { DocumentProps } from './modules/documents/Document';
import List from './modules/documents/List';
import { usePagination } from './modules/hooks/usePagination';
import MoreButton from './modules/documents/MoreButton';
import './App.css';
import api from './modules/api';

interface MetaDataType {
  pagesCount?: number,
  page?: number,
  perPage?: number,
}

function App() {
  const [documents, setDocuments] = useState<DocumentProps[]>([]);
  const [metaData, setMetaData] = useState<MetaDataType>({});

  const fetchDocuments = useCallback(async (page: number, perPage: number) => {
    const { data, meta } = await api.fetchDocuments({ page, perPage });
    setDocuments(prevDocuments => [...prevDocuments, ...data]);
    setMetaData(meta);
  }, []);

  const { fetchNextPage, paginationStatus, page } = usePagination(fetchDocuments, metaData.pagesCount);

  useEffect(() => {
    fetchNextPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App--root'>
      <List documents={documents} />
      <MoreButton paginationStatus={paginationStatus} fetchMore={fetchNextPage} endReached={metaData.pagesCount === page} />
    </div>
  );
}

export default App;
