import React, { createContext, useMemo } from 'react';
import { DocumentProps } from '../documents/Document';
import { ValidityStatus } from '../validity/ValidityIndicator';
import useDocumentChecking, { ValidityState } from './useDocumentChecking';

interface Props {
  children: React.ReactNode,
  allDocuments: DocumentProps[]
}

export interface ValidityCheckState {
  'checksum': ValidityStatus,
  'schema': ValidityStatus,
  'signature': ValidityStatus,
}

interface CheckDocumentsContextValue {
  checkDocument: (id: string) => void,
  state: ValidityState
}

export const CheckDocumentsContext = createContext<CheckDocumentsContextValue>({
  checkDocument: () => undefined,
  state: {},
});

const CheckDocumentsProvider = ({ children, allDocuments }: Props) => {
  const { checkDocument, state } = useDocumentChecking(allDocuments);

  const contextValue = useMemo(() => ({
    checkDocument,
    state
  }), [checkDocument, state]);

  return (
    <CheckDocumentsContext.Provider value={contextValue}>
      {children}
    </CheckDocumentsContext.Provider>
  );
};

export default CheckDocumentsProvider;
