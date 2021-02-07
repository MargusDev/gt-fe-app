import React, { useContext } from 'react';
import { DocumentProps } from '../documents/Document';
import DocumentValidityButton from './DocumentValidityButton';
import ValidityIndicator, { ValidityStatus } from './ValidityIndicator';
import './CheckValidity.css';
import { CheckDocumentsContext, ValidityCheckState } from '../providers/CheckDocumentsProvider';

interface Props {
  documentId: DocumentProps['id']
}

const CheckValidity = ({ documentId }: Props) => {
  const { checkDocument, state } = useContext(CheckDocumentsContext);
  const documentValidityState = state[documentId];

  return (
    <div className='CheckValidity--container'>
      <div className='CheckValidity--section'>
        <ValidityIndicator indicatorName='Checksum' status={documentValidityState?.['checksum'] || ValidityStatus.Void} />
        <ValidityIndicator indicatorName='Schema' status={documentValidityState?.['schema'] || ValidityStatus.Void} />
        <ValidityIndicator indicatorName='Signature' status={documentValidityState?.['signature'] || ValidityStatus.Void} />
      </div>
      <div className='CheckValidity--section'>
        <DocumentValidityButton status={statusForValidityButton(documentValidityState)} runValidationChecks={() => checkDocument(documentId)} />
      </div>
    </div>
  );
};

const statusForValidityButton = (documentValidityState: ValidityCheckState | undefined) => {
  if (documentValidityState === undefined) {
    return ValidityStatus.Void;
  }

  const stateValues = Object.values(documentValidityState);

  if (stateValues.some(status => status === ValidityStatus.Invalid)) {
    return ValidityStatus.Invalid;
  } else if (stateValues.some(status => status === ValidityStatus.Error)) {
    return ValidityStatus.Error;
  } else if (stateValues.every(status => status === ValidityStatus.Valid)) {
    return ValidityStatus.Valid;
  } else if (stateValues.every(status => status === ValidityStatus.Void)) {
    return ValidityStatus.Void;
  } else {
    return ValidityStatus.Pending;
  }
};

export default CheckValidity;
