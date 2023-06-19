import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Contracto } from '../models';
import { ContractoRepository } from '../repositories';
export declare class ContratoController {
    contractoRepository: ContractoRepository;
    constructor(contractoRepository: ContractoRepository);
    create(contracto: Omit<Contracto, 'id'>): Promise<Contracto>;
    count(where?: Where<Contracto>): Promise<Count>;
    find(filter?: Filter<Contracto>): Promise<Contracto[]>;
    updateAll(contracto: Contracto, where?: Where<Contracto>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Contracto>): Promise<Contracto>;
    updateById(id: number, contracto: Contracto): Promise<void>;
    replaceById(id: number, contracto: Contracto): Promise<void>;
    deleteById(id: number): Promise<void>;
}
