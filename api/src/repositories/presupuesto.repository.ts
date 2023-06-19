import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Presupuesto, PresupuestoRelations, Proyectos} from '../models';
import {ProyectosRepository} from './proyectos.repository';

export class PresupuestoRepository extends DefaultCrudRepository<
  Presupuesto,
  typeof Presupuesto.prototype.id,
  PresupuestoRelations
> {

  public readonly proyectos: HasManyRepositoryFactory<Proyectos, typeof Presupuesto.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProyectosRepository') protected proyectosRepositoryGetter: Getter<ProyectosRepository>,
  ) {
    super(Presupuesto, dataSource);
    this.proyectos = this.createHasManyRepositoryFactoryFor('proyectos', proyectosRepositoryGetter,);
    this.registerInclusionResolver('proyectos', this.proyectos.inclusionResolver);
  }
}
