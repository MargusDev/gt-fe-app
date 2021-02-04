import { renderHook, act } from '@testing-library/react-hooks';
import { PaginationStatus, usePagination } from './usePagination';

test('should increment cursor after fetch', async () => {
  const fetchPage = jest.fn();
  const { result, waitForNextUpdate } = renderHook(() => usePagination(fetchPage));

  act(() => {
    result.current.fetchNextPage();
  });

  await waitForNextUpdate();

  expect(result.current.page).toBe(1);
});

test('should call fetch once', async () => {
  const fetchPage = jest.fn();
  const { result, waitForNextUpdate } = renderHook(() => usePagination(fetchPage));

  act(() => {
    result.current.fetchNextPage();
  });

  await waitForNextUpdate();

  expect(fetchPage).toHaveBeenCalledTimes(1);
});

test('should increment cursor multiple times after mutliple fetches', async () => {
  const fetchPage = jest.fn();
  const { result, waitForNextUpdate } = renderHook(() => usePagination(fetchPage));

  act(() => {
    result.current.fetchNextPage();
    result.current.fetchNextPage();
    result.current.fetchNextPage();
  });

  await waitForNextUpdate();

  expect(result.current.page).toBe(3);
});

test('should not increment page if fetch fails', async () => {
  const fetchPage = jest.fn().mockImplementation(() => {
    throw new Error();
  });
  const { result } = renderHook(() => usePagination(fetchPage));

  act(() => {
    result.current.fetchNextPage();
  });

  expect(result.current.page).toBe(0);
});

test('should return error status if fetch fails', async () => {
  const fetchPage = jest.fn().mockImplementation(() => {
    throw new Error();
  });
  const { result } = renderHook(() => usePagination(fetchPage));

  act(() => {
    result.current.fetchNextPage();
  });

  expect(result.current.paginationStatus).toBe(PaginationStatus.Error);
});

test('should not call fetch after max page reached', async () => {
  const fetchPage = jest.fn();
  const { result } = renderHook(() => usePagination(fetchPage, 2));

  await act(async () => {
    await result.current.fetchNextPage();
    await result.current.fetchNextPage();
    await result.current.fetchNextPage();
  });

  expect(fetchPage).toHaveBeenCalledTimes(2);
});
