import { Entity } from '@loopback/repository';
export declare class Factura extends Entity {
    id?: number;
    fechaCreada: string;
    estado: string;
    totalFactura: number;
    fechaPagada?: string;
    contractoId: number;
    constructor(data?: Partial<Factura>);
}
export interface FacturaRelations {
}
export type FacturaWithRelations = Factura & FacturaRelations;
