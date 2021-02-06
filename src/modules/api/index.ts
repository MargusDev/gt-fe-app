import fetchWithTimeout from './fetchWithTimeout';
import querystring from 'querystring';
import { DocumentProps } from '../documents/Document';

const apiEndpoint = 'http://fe-test.guardtime.com';

interface FetchDocumentsResult {
  meta: {
    pagesCount: number,
    page: number,
    perPage: number,
  },
  data: DocumentProps[]
}

const fetchDocuments = async ({ page, perPage }: { page: number, perPage: number}) => {
  const queryParams = querystring.stringify({ page, perPage });
  const result = await fetchWithTimeout(`${apiEndpoint}/documents?${queryParams}`, { method: 'GET' });
  return await result.json() as FetchDocumentsResult;
};

const apiCalls = {
  fetchDocuments
};

export default apiCalls;
