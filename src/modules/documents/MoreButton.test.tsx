import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import MoreButton from './MoreButton';
import { PaginationStatus } from '../hooks/usePagination';

test('renders More button if standby and end not reached', () => {
  const fetchMore = jest.fn();
  render(<MoreButton paginationStatus={PaginationStatus.Standby} endReached={false} fetchMore={fetchMore} />);
  const buttonElement = screen.getByText('More');
  expect(buttonElement).toBeInTheDocument();
});

test('clicking more button fetches more', () => {
  const fetchMore = jest.fn();
  render(<MoreButton paginationStatus={PaginationStatus.Standby} endReached={false} fetchMore={fetchMore} />);
  const buttonElement = screen.getByText('More');
  fireEvent.click(buttonElement);
  expect(fetchMore).toHaveBeenCalledTimes(1);
});

test('renders loading text if loading', () => {
  const fetchMore = jest.fn();
  render(<MoreButton paginationStatus={PaginationStatus.Loading} endReached={false} fetchMore={fetchMore} />);
  const loadingText = screen.getByText('Loading');
  expect(loadingText).toBeInTheDocument();
});

test('does not render more button if loading', () => {
  const fetchMore = jest.fn();
  render(<MoreButton paginationStatus={PaginationStatus.Loading} endReached={false} fetchMore={fetchMore} />);
  const endText = screen.queryByText('More');
  expect(endText).not.toBeInTheDocument();
});

test('renders end text if end reached', () => {
  const fetchMore = jest.fn();
  render(<MoreButton paginationStatus={PaginationStatus.Standby} endReached={true} fetchMore={fetchMore} />);
  const endText = screen.getByText('End of the road');
  expect(endText).toBeInTheDocument();
});

test('does not render more button if end reached', () => {
  const fetchMore = jest.fn();
  render(<MoreButton paginationStatus={PaginationStatus.Standby} endReached={true} fetchMore={fetchMore} />);
  const endText = screen.queryByText('More');
  expect(endText).not.toBeInTheDocument();
});

test('renders error button if status is error', () => {
  const fetchMore = jest.fn();
  render(<MoreButton paginationStatus={PaginationStatus.Error} endReached={true} fetchMore={fetchMore} />);
  const endText = screen.getByText('Error! Try again!');
  expect(endText).toBeInTheDocument();
});

test('clicking error button re-fetches', () => {
  const fetchMore = jest.fn();
  render(<MoreButton paginationStatus={PaginationStatus.Error} endReached={true} fetchMore={fetchMore} />);
  const endText = screen.getByText('Error! Try again!');
  fireEvent.click(endText);
  expect(fetchMore).toHaveBeenCalledTimes(1);
});
