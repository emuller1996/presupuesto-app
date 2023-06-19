"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FacturaContractoController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let FacturaContractoController = class FacturaContractoController {
    constructor(facturaRepository) {
        this.facturaRepository = facturaRepository;
    }
    async getContracto(id) {
        return this.facturaRepository.contracto(id);
    }
};
tslib_1.__decorate([
    (0, rest_1.get)('/facturas/{id}/contracto', {
        responses: {
            '200': {
                description: 'Contracto belonging to Factura',
                content: {
                    'application/json': {
                        schema: (0, rest_1.getModelSchemaRef)(models_1.Contracto),
                    },
                },
            },
        },
    }),
    tslib_1.__param(0, rest_1.param.path.number('id')),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", [Object]),
    tslib_1.__metadata("design:returntype", Promise)
], FacturaContractoController.prototype, "getContracto", null);
FacturaContractoController = tslib_1.__decorate([
    tslib_1.__param(0, (0, repository_1.repository)(repositories_1.FacturaRepository)),
    tslib_1.__metadata("design:paramtypes", [repositories_1.FacturaRepository])
], FacturaContractoController);
exports.FacturaContractoController = FacturaContractoController;
//# sourceMappingURL=factura-contracto.controller.js.map