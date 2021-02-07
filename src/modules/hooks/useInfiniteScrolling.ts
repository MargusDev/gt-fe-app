import { useEffect } from 'react';

type Parameters = {
  listEndInView: boolean,
  readyToFetch: boolean,
  fetchElements: () => void,
}

export default function useInfiniteScrolling({ listEndInView = false, readyToFetch = false, fetchElements }: Parameters) {
  useEffect(() => {
    if (listEndInView && readyToFetch) {
      fetchElements();
    }
  }, [fetchElements, listEndInView, readyToFetch]);
};
