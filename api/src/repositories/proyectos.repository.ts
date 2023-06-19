import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Proyectos, ProyectosRelations, Presupuesto, Contracto} from '../models';
import {PresupuestoRepository} from './presupuesto.repository';
import {ContractoRepository} from './contracto.repository';

export class ProyectosRepository extends DefaultCrudRepository<
  Proyectos,
  typeof Proyectos.prototype.id,
  ProyectosRelations
> {

  public readonly presupuesto: BelongsToAccessor<Presupuesto, typeof Proyectos.prototype.id>;

  public readonly contractos: HasManyRepositoryFactory<Contracto, typeof Proyectos.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('PresupuestoRepository') protected presupuestoRepositoryGetter: Getter<PresupuestoRepository>, @repository.getter('ContractoRepository') protected contractoRepositoryGetter: Getter<ContractoRepository>,
  ) {
    super(Proyectos, dataSource);
    this.contractos = this.createHasManyRepositoryFactoryFor('contractos', contractoRepositoryGetter,);
    this.registerInclusionResolver('contractos', this.contractos.inclusionResolver);
    this.presupuesto = this.createBelongsToAccessorFor('presupuesto', presupuestoRepositoryGetter,);
    this.registerInclusionResolver('presupuesto', this.presupuesto.inclusionResolver);
  }
}
