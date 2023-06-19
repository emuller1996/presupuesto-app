"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractoFacturaController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let ContractoFacturaController = class ContractoFacturaController {
    constructor(contractoRepository, proyectoRepository) {
        this.contractoRepository = contractoRepository;
        this.proyectoRepository = proyectoRepository;
    }
    async find(id, filter) {
        return this.contractoRepository.facturas(id).find(filter);
    }
    async create(id, factura) {
        return this.contractoRepository.facturas(id).create(factura);
    }
    async patch(id, factura, where) {
        return this.contractoRepository.facturas(id).patch(factura, where);
    }
    async delete(id, where) {
        return this.contractoRepository.facturas(id).delete(where);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/contractos/{id}/facturas', {
        responses: {
            '200': {
                description: 'Array of Contracto has many Factura',
                content: {
                    'application/json': {
                        schema: { type: 'array', items: (0, rest_1.getModelSchemaRef)(models_1.Factura) },
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
], ContractoFacturaController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.post)('/contractos/{id}/facturas', {
        responses: {
            '200': {
                description: 'Contracto model instance',
                content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Factura) } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Factura, {
                    title: 'NewFacturaInContracto',
                    exclude: ['id'],
                    optional: ['contractoId']
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ContractoFacturaController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/contractos/{id}/facturas', {
        responses: {
            '200': {
                description: 'Contracto.Factura PATCH success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Factura, { partial: true }),
            },
        },
    })),
    tslib_1.__param(2, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Factura))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ContractoFacturaController.prototype, "patch", null);
tslib_1.__decorate([
    (0, rest_1.del)('/contractos/{id}/facturas', {
        responses: {
            '200': {
                description: 'Contracto.Factura DELETE success count',
                content: { 'application/json': { schema: repository_1.CountSchema } },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.query.object('where', (0, rest_1.getWhereSchemaFor)(models_1.Factura))),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], ContractoFacturaController.prototype, "delete", null);
ContractoFacturaController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.ContractoRepository)),
    tslib_1.__param(1, (0, repository_1.repository)(repositories_1.ProyectosRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.ContractoRepository,
        repositories_1.ProyectosRepository])
], ContractoFacturaController);
exports.ContractoFacturaController = ContractoFacturaController;
//# sourceMappingURL=contracto-factura.controller.js.map