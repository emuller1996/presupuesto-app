"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Factura = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const contracto_model_1 = require("./contracto.model");
let Factura = class Factura extends repository_1.Entity {
    constructor(data) {
        super(data);
    }
};
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        id: true,
        generated: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Factura.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Factura.prototype, "fechaCreada", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Factura.prototype, "estado", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Factura.prototype, "totalFactura", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
    }),
    tslib_1.__metadata("design:type", String)
], Factura.prototype, "fechaPagada", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => contracto_model_1.Contracto),
    tslib_1.__metadata("design:type", Number)
], Factura.prototype, "contractoId", void 0);
Factura = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            foreignKeys: {
                fk_factura_contractoId: {
                    name: 'fk_factura_contractoId',
                    entity: 'Contracto',
                    entityKey: 'id',
                    foreignKey: 'contractoId',
                },
            },
        },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Factura);
exports.Factura = Factura;
//# sourceMappingURL=factura.model.js.map