import { Entity } from '@loopback/repository';
import { Proyectos } from './proyectos.model';
export declare class Presupuesto extends Entity {
    id?: number;
    descripcion: string;
    totalCantidad: number;
    totalGasto?: number;
    totalGastoPorcentaje?: number;
    totalRestante?: number;
    proyectos: Proyectos[];
    constructor(data?: Partial<Presupuesto>);
}
export interface PresupuestoRelations {
}
export type PresupuestoWithRelations = Presupuesto & PresupuestoRelations;
