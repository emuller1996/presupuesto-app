import { Entity } from '@loopback/repository';
import { Factura } from './factura.model';
export declare class Contracto extends Entity {
    id?: number;
    nombre: string;
    monto_total: number;
    monto_usado?: number;
    monto_disponible?: number;
    fecha_creado: string;
    proyectosId: number;
    facturas: Factura[];
    constructor(data?: Partial<Contracto>);
}
export interface ContractoRelations {
}
export type ContractoWithRelations = Contracto & ContractoRelations;
