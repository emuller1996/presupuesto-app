import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Contracto,
  Proyectos,
} from '../models';
import {ContractoRepository} from '../repositories';

export class ContractoProyectosController {
  constructor(
    @repository(ContractoRepository)
    public contractoRepository: ContractoRepository,
  ) { }

  @get('/contractos/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Proyectos belonging to Contracto',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Proyectos),
          },
        },
      },
    },
  })
  async getProyectos(
    @param.path.number('id') id: typeof Contracto.prototype.id,
  ): Promise<Proyectos> {
    return this.contractoRepository.proyectos(id);
  }
}
