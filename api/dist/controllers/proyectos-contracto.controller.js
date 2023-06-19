"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProyectosContractoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ProyectosContractoController = class ProyectosContractoController {
    constructor(proyectosRepository) {
        this.proyectosRepository = proyectosRepository;
    }
    async find(id, filter) {
        return this.proyectosRepository.contractos(id).find(filter);
    }
    async create(id, contracto) {
        return this.proyectosRepository.contractos(id).create(contracto);
    }
    async patch(id, contracto, where) {
        return this.proyectosRepository.contractos(id).patch(contracto, where);
    }
    async delete(id, where) {
        return this.proyectosRepository.contractos(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/proyectos/{id}/contractos', {
        responses: {
            '200': {
                description: 'Array of Proyectos has many Contracto',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Contracto) },
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
], ProyectosContractoController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/proyectos/{id}/contractos', {
        responses: {
            '200': {
                description: 'Proyectos model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Contracto) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Contracto, {
                    title: 'NewContractoInProyectos',
                    exclude: ['id'],
                    optional: ['proyectosId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProyectosContractoController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/proyectos/{id}/contractos', {
        responses: {
            '200': {
                description: 'Proyectos.Contracto PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Contracto, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Contracto))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProyectosContractoController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/proyectos/{id}/contractos', {
        responses: {
            '200': {
                description: 'Proyectos.Contracto DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Contracto))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ProyectosContractoController.prototype, "delete", null);
ProyectosContractoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ProyectosRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ProyectosRepository])
], ProyectosContractoController);
exports.ProyectosContractoController = ProyectosContractoController;
//# sourceMappingURL=proyectos-contracto.controller.js.map