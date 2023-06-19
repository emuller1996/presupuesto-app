import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MysqlDataSource} from '../datasources';
import {Factura, FacturaRelations, Contracto} from '../models';
import {ContractoRepository} from './contracto.repository';

export class FacturaRepository extends DefaultCrudRepository<
  Factura,
  typeof Factura.prototype.id,
  FacturaRelations
> {

  public readonly contracto: BelongsToAccessor<Contracto, typeof Factura.prototype.id>;

  constructor(
    @inject('datasources.mysql') dataSource: MysqlDataSource, @repository.getter('ContractoRepository') protected contractoRepositoryGetter: Getter<ContractoRepository>,
  ) {
    super(Factura, dataSource);
    this.contracto = this.createBelongsToAccessorFor('contracto', contractoRepositoryGetter,);
    this.registerInclusionResolver('contracto', this.contracto.inclusionResolver);
  }
}
