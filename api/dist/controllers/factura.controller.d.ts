import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Factura } from '../models';
import { FacturaRepository } from '../repositories';
export declare class FacturaController {
    facturaRepository: FacturaRepository;
    constructor(facturaRepository: FacturaRepository);
    create(factura: Omit<Factura, 'id'>): Promise<Factura>;
    count(where?: Where<Factura>): Promise<Count>;
    find(filter?: Filter<Factura>): Promise<Factura[]>;
    updateAll(factura: Factura, where?: Where<Factura>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Factura>): Promise<Factura>;
    updateById(id: number, factura: Factura): Promise<void>;
    replaceById(id: number, factura: Factura): Promise<void>;
    deleteById(id: number): Promise<void>;
}
