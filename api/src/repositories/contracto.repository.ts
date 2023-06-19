import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Contracto, ContractoRelations, Proyectos, Factura} from '../models';
import {ProyectosRepository} from './proyectos.repository';
import {FacturaRepository} from './factura.repository';

export class ContractoRepository extends DefaultCrudRepository<
  Contracto,
  typeof Contracto.prototype.id,
  ContractoRelations
> {

  public readonly proyectos: BelongsToAccessor<Proyectos, typeof Contracto.prototype.id>;

  public readonly facturas: HasManyRepositoryFactory<Factura, typeof Contracto.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ProyectosRepository') protected proyectosRepositoryGetter: Getter<ProyectosRepository>, @repository.getter('FacturaRepository') protected facturaRepositoryGetter: Getter<FacturaRepository>,
  ) {
    super(Contracto, dataSource);
    this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter,);
    this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
    this.proyectos = this.createBelongsToAccessorFor('proyectos', proyectosRepositoryGetter,);
    this.registerInclusionResolver('proyectos', this.proyectos.inclusionResolver);
  }
}
