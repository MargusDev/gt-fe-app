import React from 'react';
import { PaginationStatus } from '../hooks/usePagination';

interface Props {
  paginationStatus: PaginationStatus,
  endReached: boolean,
  fetchMore: () => void
}

const MoreButton = ({ paginationStatus, endReached = false, fetchMore }: Props) => {
  switch (paginationStatus) {
  case PaginationStatus.Loading:
    return <div>Loading</div>;
  case PaginationStatus.Standby:
    if (endReached) {
      return <div>End of the road</div>;
    } else {
      return <button onClick={fetchMore}>More</button>;
    }
  case PaginationStatus.Error:
    return <button onClick={fetchMore}>Error! Try again!</button>;
  default:
    return null;
  }
};

export default MoreButton;
