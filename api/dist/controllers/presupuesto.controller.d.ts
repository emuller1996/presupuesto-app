import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Presupuesto } from '../models';
import { PresupuestoRepository } from '../repositories';
export declare class PresupuestoController {
    presupuestoRepository: PresupuestoRepository;
    constructor(presupuestoRepository: PresupuestoRepository);
    create(presupuesto: Omit<Presupuesto, 'id'>): Promise<Presupuesto>;
    count(where?: Where<Presupuesto>): Promise<Count>;
    find(filter?: Filter<Presupuesto>): Promise<Presupuesto[]>;
    updateAll(presupuesto: Presupuesto, where?: Where<Presupuesto>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Presupuesto>): Promise<Presupuesto>;
    updateById(id: number, presupuesto: Presupuesto): Promise<void>;
    replaceById(id: number, presupuesto: Presupuesto): Promise<void>;
    deleteById(id: number): Promise<void>;
}
