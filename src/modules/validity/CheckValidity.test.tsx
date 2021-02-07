import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { CheckDocumentsContext, ValidityState } from '../providers/CheckDocumentsProvider';
import CheckValidity from './CheckValidity';
import { ValidityStatus } from './ValidityIndicator';

const checkDocument = jest.fn();

test('renders intial button', () => {
  const testState: ValidityState = {
    '1': {
      'checksum': ValidityStatus.Void,
      'schema': ValidityStatus.Void,
      'signature': ValidityStatus.Void
    }
  };

  const wrapper = ({ children }: { children: React.ReactNode }): React.ReactNode => (
    <CheckDocumentsContext.Provider value={{ state: testState, checkDocument }}>
      {children}
    </CheckDocumentsContext.Provider>
  );

  render(<CheckValidity documentId='1' />, { wrapper });
  expect(screen.getByText(/check validity/i)).toBeInTheDocument();
});

test('renders pending button', () => {
  const testState: ValidityState = {
    '1': {
      'checksum': ValidityStatus.Pending,
      'schema': ValidityStatus.Void,
      'signature': ValidityStatus.Void
    }
  };

  const wrapper = ({ children }: { children: React.ReactNode }): React.ReactNode => (
    <CheckDocumentsContext.Provider value={{ state: testState, checkDocument }}>
      {children}
    </CheckDocumentsContext.Provider>
  );

  render(<CheckValidity documentId='1' />, { wrapper });
  expect(screen.getByText(/checking document/i)).toBeInTheDocument();
});

test('renders invalid button', () => {
  const testState: ValidityState = {
    '1': {
      'checksum': ValidityStatus.Invalid,
      'schema': ValidityStatus.Void,
      'signature': ValidityStatus.Void
    }
  };

  const wrapper = ({ children }: { children: React.ReactNode }): React.ReactNode => (
    <CheckDocumentsContext.Provider value={{ state: testState, checkDocument }}>
      {children}
    </CheckDocumentsContext.Provider>
  );

  render(<CheckValidity documentId='1' />, { wrapper });
  expect(screen.getByText(/document invalid/i)).toBeInTheDocument();
});

test('renders error button', () => {
  const testState: ValidityState = {
    '1': {
      'checksum': ValidityStatus.Error,
      'schema': ValidityStatus.Void,
      'signature': ValidityStatus.Void
    }
  };

  const wrapper = ({ children }: { children: React.ReactNode }): React.ReactNode => (
    <CheckDocumentsContext.Provider value={{ state: testState, checkDocument }}>
      {children}
    </CheckDocumentsContext.Provider>
  );

  render(<CheckValidity documentId='1' />, { wrapper });
  expect(screen.getByText(/validation error/i)).toBeInTheDocument();
});

test('renders valid button when all statuses valid', () => {
  const testState: ValidityState = {
    '1': {
      'checksum': ValidityStatus.Valid,
      'schema': ValidityStatus.Valid,
      'signature': ValidityStatus.Valid
    }
  };

  const wrapper = ({ children }: { children: React.ReactNode }): React.ReactNode => (
    <CheckDocumentsContext.Provider value={{ state: testState, checkDocument }}>
      {children}
    </CheckDocumentsContext.Provider>
  );

  render(<CheckValidity documentId='1' />, { wrapper });
  expect(screen.getByText(/document valid/i)).toBeInTheDocument();
});

test('renders pending if not all valid', () => {
  const testState: ValidityState = {
    '1': {
      'checksum': ValidityStatus.Valid,
      'schema': ValidityStatus.Void,
      'signature': ValidityStatus.Void
    }
  };

  const wrapper = ({ children }: { children: React.ReactNode }): React.ReactNode => (
    <CheckDocumentsContext.Provider value={{ state: testState, checkDocument }}>
      {children}
    </CheckDocumentsContext.Provider>
  );

  render(<CheckValidity documentId='1' />, { wrapper });
  expect(screen.getByText(/checking document/i)).toBeInTheDocument();
});

