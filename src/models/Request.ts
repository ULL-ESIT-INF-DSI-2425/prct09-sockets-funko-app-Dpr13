import { Funko } from './Funko.js';

export type RequestType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  usuario: string;
  funko?: Funko;
  id?: number;
};

export type ResponseType = {
  type: 'add' | 'update' | 'remove' | 'read' | 'list';
  success: boolean;
  message: string;
  funkoPops?: Funko[];
};
