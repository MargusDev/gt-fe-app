import { act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { DocumentProps } from '../documents/Document';
import { ValidityStatus } from '../validity/ValidityIndicator';
import { renderHook } from '@testing-library/react-hooks';
import useDocumentChecking from './useDocumentChecking';
jest.mock('../api/apiCalls');

const testDocuments: DocumentProps[] = [{
  author: 'shauger0',
  created_at: '2019-01-25T14:22:10Z',
  filename: 'et ultrices posuere.jpeg',
  hash: 'cd0150585f245faeae9fd1efc8c7a661',
  id: '1',
  size: 46648255,
}, {
  author: 'moakey1',
  created_at: '2019-01-10T09:12:51Z',
  filename: 'felis donec.mpeg',
  hash: '8197d531d651904aa6bc72c6629a7ee6',
  id: '2',
  size: 20397345,
}];

test('should return empty state intially', async () => {
  const { result } = renderHook(() => useDocumentChecking(testDocuments));

  expect(result.current.state).toStrictEqual({});
});

test('should pass all checks for single document', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useDocumentChecking(testDocuments));

  act(() => {
    result.current.checkDocument('1');
  });

  await waitForNextUpdate();

  expect(result.current.state).toStrictEqual({
    '1': {
      checksum: ValidityStatus.Valid,
      schema: ValidityStatus.Valid,
      signature: ValidityStatus.Valid,
    }
  });
});

test('should validate all documents', async () => {
  const { result, waitForNextUpdate } = renderHook(() => useDocumentChecking(testDocuments));

  act(() => {
    result.current.checkAllDocuments();
  });

  await waitForNextUpdate();

  expect(result.current.state).toStrictEqual({
    '1': {
      checksum: ValidityStatus.Valid,
      schema: ValidityStatus.Valid,
      signature: ValidityStatus.Valid,
    },
    '2': {
      checksum: ValidityStatus.Valid,
      schema: ValidityStatus.Valid,
      signature: ValidityStatus.Valid,
    }
  });
});
