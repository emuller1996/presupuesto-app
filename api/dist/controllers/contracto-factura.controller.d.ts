import { Count, Filter, Where } from '@loopback/repository';
import { Contracto, Factura } from '../models';
import { ContractoRepository, ProyectosRepository } from '../repositories';
export declare class ContractoFacturaController {
    protected contractoRepository: ContractoRepository;
    protected proyectoRepository: ProyectosRepository;
    constructor(contractoRepository: ContractoRepository, proyectoRepository: ProyectosRepository);
    find(id: number, filter?: Filter<Factura>): Promise<Factura[]>;
    create(id: typeof Contracto.prototype.id, factura: Omit<Factura, 'id'>): Promise<Factura>;
    patch(id: number, factura: Partial<Factura>, where?: Where<Factura>): Promise<Count>;
    delete(id: number, where?: Where<Factura>): Promise<Count>;
}
