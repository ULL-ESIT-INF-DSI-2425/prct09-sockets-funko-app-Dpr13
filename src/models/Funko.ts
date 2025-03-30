/**
 * Interface Funko
 */
export interface Funko {
  id: number;
  nombre: string;
  descripcion: string;
  tipo: string;
  genero: string;
  franquicia: string;
  numero: number;
  exclusivo: boolean;
  caracteristicas: string;
  valorMercado: number;
}
