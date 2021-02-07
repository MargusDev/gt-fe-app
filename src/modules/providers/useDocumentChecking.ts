import { useReducer, useCallback } from 'react';
import apiCalls from '../api/apiCalls';
import { DocumentProps } from '../documents/Document';
import { ValidityStatus } from '../validity/ValidityIndicator';
import { ValidityCheckState } from './CheckDocumentsProvider';

type Action =
  | { type: 'initiateCheck', id: string }
  | { type: 'markStatus', id: string, key: keyof ValidityCheckState, status: ValidityStatus }

export interface ValidityState {
  [id: string]: ValidityCheckState
}

const reducer = (state: ValidityState, action: Action) => {
  switch (action.type) {
  case 'initiateCheck':
    const voidDocumentState: ValidityCheckState = {
      'checksum': ValidityStatus.Void,
      'schema': ValidityStatus.Void,
      'signature': ValidityStatus.Void,
    };
    return {
      ...state,
      [action.id]: { ...voidDocumentState },
    };
  case 'markStatus':
    return {
      ...state,
      [action.id]: {
        ...state[action.id],
        [action.key]: action.status
      }
    };
  default:
    throw new Error();
  }
};

const validationCallForKey = (key: keyof ValidityCheckState) => {
  switch (key) {
  case 'checksum':
    return apiCalls.validateChecksum;
  case 'schema':
    return apiCalls.validateSchema;
  case 'signature':
    return apiCalls.validateSignature;
  default:
    throw new Error();
  }
};

const initialState: ValidityState = {};

export default function useDocumentChecking(documents: DocumentProps[]) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const checkValidity = useCallback(
    async (id, check: keyof ValidityCheckState): Promise<boolean> => {
      dispatch({ type: 'markStatus', id, key: check, status: ValidityStatus.Pending });
      try {
        const result = await validationCallForKey(check)({ id });
        if (result) {
          if (result.valid) {
            dispatch({ type: 'markStatus', id, key: check, status: ValidityStatus.Valid });
            return true;
          } else {
            dispatch({ type: 'markStatus', id, key: check, status: ValidityStatus.Invalid });
            return false;
          }
        } else {
          dispatch({ type: 'markStatus', id, key: check, status: ValidityStatus.Error });
          return false;
        }
      } catch (error) {
        dispatch({ type: 'markStatus', id, key: check, status: ValidityStatus.Error });
        return false;
      }
    },
    [],
  );

  const checkDocument = useCallback(
    async (id: string) => {
      dispatch({ type: 'initiateCheck', id });
      if (!await checkValidity(id, 'checksum')) {
        return;
      };
      if (!await checkValidity(id, 'schema')){
        return;
      }
      await checkValidity(id, 'signature');
    },
    [checkValidity],
  );

  const checkAllDocuments = useCallback(
    () => {
      const allIds = documents.map(doc => doc.id).filter(id => {
        if (state[id] === undefined) {
          return true;
        }

        const { checksum, signature, schema } = state[id];
        const values = [checksum, signature, schema];
        if (values.every(v => v === ValidityStatus.Void)) {
          return true;
        } else if (values.some(v => v === ValidityStatus.Error)) {
          return true;
        } else if (values.some(v => v === ValidityStatus.Invalid)) {
          return true;
        } else if (values.every(v => v === ValidityStatus.Valid)) {
          return true;
        } else return false;
      });
      allIds.map(checkDocument);
    },
    [checkDocument, documents, state],
  );

  return {
    state,
    checkDocument,
    checkAllDocuments
  };
}
