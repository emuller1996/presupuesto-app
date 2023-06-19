import { Getter } from '@loopback/core';
import { DefaultCrudRepository, HasManyRepositoryFactory } from '@loopback/repository';
import { MysqlDataSource } from '../datasources';
import { Presupuesto, PresupuestoRelations, Proyectos } from '../models';
import { ProyectosRepository } from './proyectos.repository';
export declare class PresupuestoRepository extends DefaultCrudRepository<Presupuesto, typeof Presupuesto.prototype.id, PresupuestoRelations> {
    protected proyectosRepositoryGetter: Getter<ProyectosRepository>;
    readonly proyectos: HasManyRepositoryFactory<Proyectos, typeof Presupuesto.prototype.id>;
    constructor(dataSource: MysqlDataSource, proyectosRepositoryGetter: Getter<ProyectosRepository>);
}
