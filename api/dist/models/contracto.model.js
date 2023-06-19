"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contracto = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const proyectos_model_1 = require("./proyectos.model");
const factura_model_1 = require("./factura.model");
let Contracto = class Contracto extends repository_1.Entity {
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
], Contracto.prototype, "id", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'string',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Contracto.prototype, "nombre", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        required: true,
    }),
    tslib_1.__metadata("design:type", Number)
], Contracto.prototype, "monto_total", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
        default: 0,
    }),
    tslib_1.__metadata("design:type", Number)
], Contracto.prototype, "monto_usado", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'number',
    }),
    tslib_1.__metadata("design:type", Number)
], Contracto.prototype, "monto_disponible", void 0);
tslib_1.__decorate([
    (0, repository_1.property)({
        type: 'date',
        required: true,
    }),
    tslib_1.__metadata("design:type", String)
], Contracto.prototype, "fecha_creado", void 0);
tslib_1.__decorate([
    (0, repository_1.belongsTo)(() => proyectos_model_1.Proyectos),
    tslib_1.__metadata("design:type", Number)
], Contracto.prototype, "proyectosId", void 0);
tslib_1.__decorate([
    (0, repository_1.hasMany)(() => factura_model_1.Factura),
    tslib_1.__metadata("design:type", Array)
], Contracto.prototype, "facturas", void 0);
Contracto = tslib_1.__decorate([
    (0, repository_1.model)({
        settings: {
            foreignKeys: {
                fk_contracto_proyectosId: {
                    name: 'fk_contracto_proyectosId',
                    entity: 'Proyectos',
                    entityKey: 'id',
                    foreignKey: 'proyectosId',
                },
            },
        },
    }),
    tslib_1.__metadata("design:paramtypes", [Object])
], Contracto);
exports.Contracto = Contracto;
//# sourceMappingURL=contracto.model.js.map