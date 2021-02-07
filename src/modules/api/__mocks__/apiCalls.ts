import { DocumentProps } from '../../documents/Document';

const validateChecksum = ({ id }: { id: DocumentProps['id'] }) => {
  return new Promise((resolve, reject) => {
    resolve({ valid: true });
  });
};

const validateSchema = ({ id }: { id: DocumentProps['id'] }) => {
  return new Promise((resolve, reject) => {
    resolve({ valid: true });
  });
};

const validateSignature = async ({ id }: { id: DocumentProps['id'] }) => {
  return new Promise((resolve, reject) => {
    resolve({ valid: true });
  });
};

const apiCalls = {
  validateChecksum,
  validateSchema,
  validateSignature,
};

export default apiCalls;
