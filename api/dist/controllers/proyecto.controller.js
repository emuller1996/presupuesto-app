"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProyectoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ProyectoController = class ProyectoController {
    constructor(proyectosRepository) {
        this.proyectosRepository = proyectosRepository;
    }
    async create(proyectos) {
        return this.proyectosRepository.create(proyectos);
    }
    async count(where) {
        return this.proyectosRepository.count(where);
    }
    async find(filter) {
        return this.proyectosRepository.find(filter);
    }
    async updateAll(proyectos, where) {
        return this.proyectosRepository.updateAll(proyectos, where);
    }
    async findById(id, filter) {
        return this.proyectosRepository.findById(id, filter);
    }
    async updateById(id, proyectos) {
        await this.proyectosRepository.updateById(id, proyectos);
    }
    async replaceById(id, proyectos) {
        await this.proyectosRepository.replaceById(id, proyectos);
    }
    async deleteById(id) {
        await this.proyectosRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/proyectos'),
    (0, rest_1.response)(200, {
        description: 'Proyectos model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Proyectos) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Proyectos, {
                    title: 'NewProyectos',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProyectoController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/proyectos/count'),
    (0, rest_1.response)(200, {
        description: 'Proyectos model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Proyectos)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProyectoController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/proyectos'),
    (0, rest_1.response)(200, {
        description: 'Array of Proyectos model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Proyectos, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Proyectos)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProyectoController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/proyectos'),
    (0, rest_1.response)(200, {
        description: 'Proyectos PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Proyectos, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Proyectos)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Proyectos, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProyectoController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/proyectos/{id}'),
    (0, rest_1.response)(200, {
        description: 'Proyectos model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Proyectos, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Proyectos, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProyectoController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/proyectos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Proyectos PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Proyectos, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Proyectos]),
    tslib_1.__metadata("design:returntype", Promise)
], ProyectoController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/proyectos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Proyectos PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Proyectos]),
    tslib_1.__metadata("design:returntype", Promise)
], ProyectoController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/proyectos/{id}'),
    (0, rest_1.response)(204, {
        description: 'Proyectos DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], ProyectoController.prototype, "deleteById", null);
ProyectoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ProyectosRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ProyectosRepository])
], ProyectoController);
exports.ProyectoController = ProyectoController;
//# sourceMappingURL=proyecto.controller.js.map