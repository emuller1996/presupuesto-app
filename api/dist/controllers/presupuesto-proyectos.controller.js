"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PresupuestoProyectosController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let PresupuestoProyectosController = class PresupuestoProyectosController {
    constructor(presupuestoRepository) {
        this.presupuestoRepository = presupuestoRepository;
    }
    async find(id, filter) {
        return this.presupuestoRepository.proyectos(id).find(filter);
    }
    async create(id, proyectos) {
        return this.presupuestoRepository.proyectos(id).create(proyectos);
    }
    async patch(id, proyectos, where) {
        return this.presupuestoRepository.proyectos(id).patch(proyectos, where);
    }
    async delete(id, where) {
        return this.presupuestoRepository.proyectos(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/presupuestos/{id}/proyectos', {
        responses: {
            '200': {
                description: 'Array of Presupuesto has many Proyectos',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Proyectos) },
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('filter')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PresupuestoProyectosController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/presupuestos/{id}/proyectos', {
        responses: {
            '200': {
                description: 'Presupuesto model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Proyectos) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Proyectos, {
                    title: 'NewProyectosInPresupuesto',
                    exclude: ['id'],
                    optional: ['presupuestoId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PresupuestoProyectosController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/presupuestos/{id}/proyectos', {
        responses: {
            '200': {
                description: 'Presupuesto.Proyectos PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Proyectos, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Proyectos))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PresupuestoProyectosController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/presupuestos/{id}/proyectos', {
        responses: {
            '200': {
                description: 'Presupuesto.Proyectos DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Proyectos))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], PresupuestoProyectosController.prototype, "delete", null);
PresupuestoProyectosController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.PresupuestoRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.PresupuestoRepository])
], PresupuestoProyectosController);
exports.PresupuestoProyectosController = PresupuestoProyectosController;
//# sourceMappingURL=presupuesto-proyectos.controller.js.map