import { ApplicationError } from '@/protocols';

export function invalidQueryError(): ApplicationError {
  return {
    name: 'InvalidQueryError',
    message: 'Invalid query type',
  };
}
