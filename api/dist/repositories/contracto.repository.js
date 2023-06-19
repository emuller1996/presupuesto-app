"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContractoRepository = void 0;
const tslib_1 = require("tslib");
const core_1 = require("@loopback/core");
const repository_1 = require("@loopback/repository");
const datasources_1 = require("../datasources");
const models_1 = require("../models");
let ContractoRepository = class ContractoRepository extends repository_1.DefaultCrudRepository {
    constructor(dataSource, proyectosRepositoryGetter, facturaRepositoryGetter) {
        super(models_1.Contracto, dataSource);
        this.proyectosRepositoryGetter = proyectosRepositoryGetter;
        this.facturaRepositoryGetter = facturaRepositoryGetter;
        this.facturas = this.createHasManyRepositoryFactoryFor('facturas', facturaRepositoryGetter);
        this.registerInclusionResolver('facturas', this.facturas.inclusionResolver);
        this.proyectos = this.createBelongsToAccessorFor('proyectos', proyectosRepositoryGetter);
        this.registerInclusionResolver('proyectos', this.proyectos.inclusionResolver);
    }
};
ContractoRepository = tslib_1.__decorate([
    tslib_1.__param(0, (0, core_1.inject)('datasources.mysql')),
    tslib_1.__param(1, repository_1.repository.getter('ProyectosRepository')),
    tslib_1.__param(2, repository_1.repository.getter('FacturaRepository')),
    tslib_1.__metadata("design:paramtypes", [datasources_1.MysqlDataSource, Function, Function])
], ContractoRepository);
exports.ContractoRepository = ContractoRepository;
//# sourceMappingURL=contracto.repository.js.map