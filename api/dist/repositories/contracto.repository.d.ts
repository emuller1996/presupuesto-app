import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Contracto, ContractoRelations, Proyectos, Factura } from '../models';
import { ProyectosRepository } from './proyectos.repository';
import { FacturaRepository } from './factura.repository';
export declare class ContractoRepository extends DefaultCrudRepository<Contracto, typeof Contracto.prototype.id, ContractoRelations> {
    protected proyectosRepositoryGetter: Getter<ProyectosRepository>;
    protected facturaRepositoryGetter: Getter<FacturaRepository>;
    readonly proyectos: BelongsToAccessor<Proyectos, typeof Contracto.prototype.id>;
    readonly facturas: HasManyRepositoryFactory<Factura, typeof Contracto.prototype.id>;
    constructor(dataSource: MysqlDataSource, proyectosRepositoryGetter: Getter<ProyectosRepository>, facturaRepositoryGetter: Getter<FacturaRepository>);
}
