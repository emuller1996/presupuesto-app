import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Factura, FacturaRelations, Contracto } from '../models';
import { ContractoRepository } from './contracto.repository';
export declare class FacturaRepository extends DefaultCrudRepository<Factura, typeof Factura.prototype.id, FacturaRelations> {
    protected contractoRepositoryGetter: Getter<ContractoRepository>;
    readonly contracto: BelongsToAccessor<Contracto, typeof Factura.prototype.id>;
    constructor(dataSource: MysqlDataSource, contractoRepositoryGetter: Getter<ContractoRepository>);
}
