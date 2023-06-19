import { Getter } from '@loopback/core';
import { DefaultCrudRepository, BelongsToAccessor, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Proyectos, ProyectosRelations, Presupuesto, Contracto } from '../models';
import { PresupuestoRepository } from './presupuesto.repository';
import { ContractoRepository } from './contracto.repository';
export declare class ProyectosRepository extends DefaultCrudRepository<Proyectos, typeof Proyectos.prototype.id, ProyectosRelations> {
    protected presupuestoRepositoryGetter: Getter<PresupuestoRepository>;
    protected contractoRepositoryGetter: Getter<ContractoRepository>;
    readonly presupuesto: BelongsToAccessor<Presupuesto, typeof Proyectos.prototype.id>;
    readonly contractos: HasManyRepositoryFactory<Contracto, typeof Proyectos.prototype.id>;
    constructor(dataSource: MysqlDataSource, presupuestoRepositoryGetter: Getter<PresupuestoRepository>, contractoRepositoryGetter: Getter<ContractoRepository>);
}
