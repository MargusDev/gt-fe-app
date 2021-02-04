import React from 'react';
import { render, screen } from '@testing-library/react';
import List from './List';
import { DocumentProps } from './Document';

const testDocuments: DocumentProps[] = [{
  author: 'shauger0',
  created_at: '2019-01-25T14:22:10Z',
  filename: 'et ultrices posuere.jpeg',
  hash: 'cd0150585f245faeae9fd1efc8c7a661',
  id: 'b019be14-8251-47d6-8269-1908d6fc1b45',
  size: 46648255,
}, {
  author: 'moakey1',
  created_at: '2019-01-10T09:12:51Z',
  filename: 'felis donec.mpeg',
  hash: '8197d531d651904aa6bc72c6629a7ee6',
  id: '117e8549-3114-438b-8175-6ac12b892443',
  size: 20397345,
}];

test('renders empty list', () => {
  render(<List documents={[]} />);
  const listElement = screen.getByTestId('document-list');
  expect(listElement).toBeEmptyDOMElement();
});

test('renders non empty list', () => {
  render(<List documents={testDocuments} />);
  const listElement = screen.getByTestId('document-list');
  expect(listElement).not.toBeEmptyDOMElement();
});

test('renders correct amount of documents', () => {
  render(<List documents={testDocuments} />);
  const listElement = screen.getByTestId('document-list');
  expect(listElement.childElementCount).toBe(2);
});
