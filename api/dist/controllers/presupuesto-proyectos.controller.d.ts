import { Count, Filter, Where } from '@loopback/repository';
import { Presupuesto, Proyectos } from '../models';
import { PresupuestoRepository } from '../repositories';
export declare class PresupuestoProyectosController {
    protected presupuestoRepository: PresupuestoRepository;
    constructor(presupuestoRepository: PresupuestoRepository);
    find(id: number, filter?: Filter<Proyectos>): Promise<Proyectos[]>;
    create(id: typeof Presupuesto.prototype.id, proyectos: Omit<Proyectos, 'id'>): Promise<Proyectos>;
    patch(id: number, proyectos: Partial<Proyectos>, where?: Where<Proyectos>): Promise<Count>;
    delete(id: number, where?: Where<Proyectos>): Promise<Count>;
}
