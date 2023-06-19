import { Entity } from '@loopback/repository';
import { Contracto } from './contracto.model';
export declare class Proyectos extends Entity {
    id?: number;
    nombre: string;
    descripcion: string;
    montoTotal: number;
    montoUsado?: number;
    montoDisponible?: number;
    presupuestoId: number;
    contractos: Contracto[];
    constructor(data?: Partial<Proyectos>);
}
export interface ProyectosRelations {
}
export type ProyectosWithRelations = Proyectos & ProyectosRelations;
