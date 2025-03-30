import { Funko } from './Funko.js';

/**
 * Interface RequestType
 */
export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  usuario: string;
  funko?: Funko;
  id?: number;
};

/**
 * Interface ResponseType
 */
export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  message: string;
  funkoPops?: Funko[];
};
