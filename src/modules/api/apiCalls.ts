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

const validateChecksum = async ({ id }: { id: DocumentProps['id'] }) => {
  const result = await fetchWithTimeout(`${apiEndpoint}/documents/${id}/validateChecksum`, { method: 'POST' });
  return await result.json();
};

const validateSchema = async ({ id }: { id: DocumentProps['id'] }) => {
  const result = await fetchWithTimeout(`${apiEndpoint}/documents/${id}/validateSchema`, { method: 'POST' });
  return await result.json();
};

const validateSignature = async ({ id }: { id: DocumentProps['id'] }) => {
  const result = await fetchWithTimeout(`${apiEndpoint}/documents/${id}/validateSignature`, { method: 'POST' });
  return await result.json();
};

const apiCalls = {
  fetchDocuments,
  validateChecksum,
  validateSchema,
  validateSignature,
};

export default apiCalls;
