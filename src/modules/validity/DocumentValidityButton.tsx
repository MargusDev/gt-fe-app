import React from 'react';
import './DocumentValidityButton.css';
import { ValidityStatus } from './ValidityIndicator';

interface Props {
  status: ValidityStatus,
  runValidationChecks: () => void,
}

const DocumentValidityButton = ({ status, runValidationChecks }: Props) => {
  return (
    <button
      onClick={runValidationChecks}
      disabled={status === ValidityStatus.Pending}
      className={`DocumentValidityButton ${classForStatus(status)}`}
    >
      {buttonTextForStatus(status)}
    </button>
  );
};

const buttonTextForStatus = (status: ValidityStatus) => {
  switch (status) {
  case ValidityStatus.Void:
    return 'Check validity';
  case ValidityStatus.Valid:
    return 'Document valid. Check again?';
  case ValidityStatus.Error:
    return 'Validation error. Try again?';
  case ValidityStatus.Invalid:
    return 'Document invalid. Try again?';
  case ValidityStatus.Pending:
    return 'Checking document';
  default:
    break;
  }
};

const classForStatus = (status: ValidityStatus) => {
  switch (status) {
  case ValidityStatus.Error:
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

export default DocumentValidityButton;
