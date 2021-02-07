import React from 'react';
import './ValidityIndicator.css';

export enum ValidityStatus {
  Void,
  Pending,
  Invalid,
  Error,
  Valid,
}

interface Props {
  indicatorName: string,
  status: ValidityStatus,
}

const ValidityIndicator = ({ indicatorName, status }: Props) => {
  return (
    <div className={`ValidityIndicator--container ${stringForStatus(status)}`}>
      {`${indicatorName} ${stringForStatus(status)}`}
    </div>
  );
};

const stringForStatus = (status: ValidityStatus) => {
  switch (status) {
  case ValidityStatus.Error:
    return 'error';
  case ValidityStatus.Invalid:
    return 'invalid';
  case ValidityStatus.Pending:
    return 'pending';
  case ValidityStatus.Valid:
    return 'valid';
  default:
    return '';
  }
};

export default ValidityIndicator;
