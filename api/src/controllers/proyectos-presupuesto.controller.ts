import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Proyectos,
  Presupuesto,
} from '../models';
import {ProyectosRepository} from '../repositories';

export class ProyectosPresupuestoController {
  constructor(
    @repository(ProyectosRepository)
    public proyectosRepository: ProyectosRepository,
  ) { }

  @get('/proyectos/{id}/presupuesto', {
    responses: {
      '200': {
        description: 'Presupuesto belonging to Proyectos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Presupuesto)},
          },
        },
      },
    },
  })
  async getPresupuesto(
    @param.path.number('id') id: typeof Proyectos.prototype.id,
  ): Promise<Presupuesto> {
    return this.proyectosRepository.presupuesto(id);
  }
}
