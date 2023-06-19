import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Proyectos } from '../models';
import { ProyectosRepository } from '../repositories';
export declare class ProyectoController {
    proyectosRepository: ProyectosRepository;
    constructor(proyectosRepository: ProyectosRepository);
    create(proyectos: Omit<Proyectos, 'id'>): Promise<Proyectos>;
    count(where?: Where<Proyectos>): Promise<Count>;
    find(filter?: Filter<Proyectos>): Promise<Proyectos[]>;
    updateAll(proyectos: Proyectos, where?: Where<Proyectos>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Proyectos>): Promise<Proyectos>;
    updateById(id: number, proyectos: Proyectos): Promise<void>;
    replaceById(id: number, proyectos: Proyectos): Promise<void>;
    deleteById(id: number): Promise<void>;
}
