import { Cuenta } from './cuenta.model';
import { RequestClient } from 'src/app/models/RequestClient';

export class RequestClient {
  clienteId?: number;
  persona: {
    edad?: string;
    email?: string;
    direccion?: string;
    genero?: string;
    identificacion?: string;
    nombre?: string;
    apellido?: string;
    telefono?: string;
  }
  estado?: string;
  password?: string;
  cuenta:Cuenta;
}
