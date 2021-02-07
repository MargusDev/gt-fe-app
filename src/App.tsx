import React, { useCallback, useEffect, useState } from 'react';
import { DocumentProps } from './modules/documents/Document';
import List from './modules/documents/List';
import { PaginationStatus, usePagination } from './modules/hooks/usePagination';
import MoreButton from './modules/documents/MoreButton';
import './App.css';
import api from './modules/api/apiCalls';
import { useInView } from 'react-intersection-observer';
import useInfiniteScrolling from './modules/hooks/useInfiniteScrolling';
import CheckDocumentsProvider from './modules/providers/CheckDocumentsProvider';

interface MetaDataType {
  pagesCount?: number,
  page?: number,
  perPage?: number,
}

function App() {
  const { ref, inView } = useInView();
  const [documents, setDocuments] = useState<DocumentProps[]>([]);
  const [metaData, setMetaData] = useState<MetaDataType>({});

  const fetchDocuments = useCallback(async (page: number, perPage: number) => {
    const { data, meta } = await api.fetchDocuments({ page, perPage });
    setDocuments(prevDocuments => [...prevDocuments, ...data]);
    setMetaData(meta);
  }, []);

  const { fetchNextPage, paginationStatus, page } = usePagination(fetchDocuments, metaData.pagesCount);

  useInfiniteScrolling({ listEndInView: inView, readyToFetch: paginationStatus === PaginationStatus.Standby, fetchElements: fetchNextPage });

  useEffect(() => {
    fetchNextPage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='App--root'>
      <CheckDocumentsProvider allDocuments={documents}>
        <List documents={documents} />
        <div ref={ref}>
          <MoreButton paginationStatus={paginationStatus} fetchMore={fetchNextPage} endReached={metaData.pagesCount === page} />
        </div>
      </CheckDocumentsProvider>
    </div>
  );
}

export default App;
