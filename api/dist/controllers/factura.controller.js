"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturaController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let FacturaController = class FacturaController {
    constructor(facturaRepository) {
        this.facturaRepository = facturaRepository;
    }
    async create(factura) {
        return this.facturaRepository.create(factura);
    }
    async count(where) {
        return this.facturaRepository.count(where);
    }
    async find(filter) {
        return this.facturaRepository.find(filter);
    }
    async updateAll(factura, where) {
        return this.facturaRepository.updateAll(factura, where);
    }
    async findById(id, filter) {
        return this.facturaRepository.findById(id, filter);
    }
    async updateById(id, factura) {
        await this.facturaRepository.updateById(id, factura);
    }
    async replaceById(id, factura) {
        await this.facturaRepository.replaceById(id, factura);
    }
    async deleteById(id) {
        await this.facturaRepository.deleteById(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.post)('/facturas'),
    (0, rest_1.response)(200, {
        description: 'Factura model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Factura) } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Factura, {
                    title: 'NewFactura',
                    exclude: ['id'],
                }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FacturaController.prototype, "create", null);
tslib_1.__decorate([
    (0, rest_1.get)('/facturas/count'),
    (0, rest_1.response)(200, {
        description: 'Factura model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, rest_1.param.where(models_1.Factura)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FacturaController.prototype, "count", null);
tslib_1.__decorate([
    (0, rest_1.get)('/facturas'),
    (0, rest_1.response)(200, {
        description: 'Array of Factura model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Factura, { includeRelations: true }),
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.filter(models_1.Factura)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FacturaController.prototype, "find", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/facturas'),
    (0, rest_1.response)(200, {
        description: 'Factura PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    tslib_1.__param(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Factura, { partial: true }),
            },
        },
    })),
    tslib_1.__param(1, rest_1.param.where(models_1.Factura)),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [models_1.Factura, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FacturaController.prototype, "updateAll", null);
tslib_1.__decorate([
    (0, rest_1.get)('/facturas/{id}'),
    (0, rest_1.response)(200, {
        description: 'Factura model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Factura, { includeRelations: true }),
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, rest_1.param.filter(models_1.Factura, { exclude: 'where' })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FacturaController.prototype, "findById", null);
tslib_1.__decorate([
    (0, rest_1.patch)('/facturas/{id}'),
    (0, rest_1.response)(204, {
        description: 'Factura PATCH success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Factura, { partial: true }),
            },
        },
    })),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Factura]),
    tslib_1.__metadata("design:returntype", Promise)
], FacturaController.prototype, "updateById", null);
tslib_1.__decorate([
    (0, rest_1.put)('/facturas/{id}'),
    (0, rest_1.response)(204, {
        description: 'Factura PUT success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__param(1, (0, rest_1.requestBody)()),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number, models_1.Factura]),
    tslib_1.__metadata("design:returntype", Promise)
], FacturaController.prototype, "replaceById", null);
tslib_1.__decorate([
    (0, rest_1.del)('/facturas/{id}'),
    (0, rest_1.response)(204, {
        description: 'Factura DELETE success',
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Number]),
    tslib_1.__metadata("design:returntype", Promise)
], FacturaController.prototype, "deleteById", null);
FacturaController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.FacturaRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FacturaRepository])
], FacturaController);
exports.FacturaController = FacturaController;
//# sourceMappingURL=factura.controller.js.map