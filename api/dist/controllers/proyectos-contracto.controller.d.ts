import { Count, Filter, Where } from '@loopback/repository';
import { Proyectos, Contracto } from '../models';
import { ProyectosRepository } from '../repositories';
export declare class ProyectosContractoController {
    protected proyectosRepository: ProyectosRepository;
    constructor(proyectosRepository: ProyectosRepository);
    find(id: number, filter?: Filter<Contracto>): Promise<Contracto[]>;
    create(id: typeof Proyectos.prototype.id, contracto: Omit<Contracto, 'id'>): Promise<Contracto>;
    patch(id: number, contracto: Partial<Contracto>, where?: Where<Contracto>): Promise<Count>;
    delete(id: number, where?: Where<Contracto>): Promise<Count>;
}
