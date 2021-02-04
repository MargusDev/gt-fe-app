import { useCallback, useReducer } from 'react';

type fetchPageType = (page: number, perPage: number) => Promise<void>

export enum PaginationStatus {
  Standby,
  Loading,
  Error
}
interface PaginationState {
  cursor: number,
  perPage: number,
  status: PaginationStatus
}

const initialState: PaginationState = {
  cursor: 0,
  perPage: 20,
  status: PaginationStatus.Standby
};

type PaginationAction =
  | { type: 'request' }
  | { type: 'failure' }
  | { type: 'success' }

function paginationReducer(state: PaginationState, action: PaginationAction): PaginationState {
  switch (action.type) {
  case 'success':
    return { ...state, cursor: state.cursor + 1, status: PaginationStatus.Standby };
  case 'failure':
    return { ...state, status: PaginationStatus.Error };
  case 'request':
    return { ...state, status: PaginationStatus.Loading };
  default:
    return state;
  }
}


export function usePagination(fetchPage: fetchPageType, maxPage?: number) {
  const [state, dispatch] = useReducer(paginationReducer, initialState);

  const fetchNextPage = useCallback(
    async () => {
      if (maxPage === state.cursor) {
        return;
      }
      dispatch({ type: 'request' });
      try {
        await fetchPage(state.cursor + 1, state.perPage);
        dispatch({ type: 'success' });
      } catch (error) {
        dispatch({ type: 'failure' });
      }
    },
    [fetchPage, state.cursor, state.perPage, maxPage],
  );

  return {
    fetchNextPage,
    paginationStatus: state.status,
    page: state.cursor
  };
}
