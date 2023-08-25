import React, { useEffect, useState } from "react";
import Select from "react-select";
import { Link } from "react-router-dom";
import {
  getAllPresupuestosService,
  getPresupuestobyIdService,
  getProyectoByIdPresupuestoService,
} from "../../services/presupuesto.servicios";
import Modal from "react-bootstrap/Modal";
import FormProyectoComponent from "./FormProyectos";
import ProgressBar from "react-bootstrap/ProgressBar";
import { deleteProyectoServicio } from "../../services/proyectos.servicios";
import { toast } from "react-hot-toast";
import FormPresupuestoComponent from "./FormPresupuesto";
import { MostrarDinero } from "../../utils";

export default function PresupuestoComponent(props) {
  const [presupuestosTodos, setPresupuestosTodos] = useState([]);
  const [presupuestoSelecionado, setPresupuestoSelecionado] =
    useState(undefined);
  const [presupuestoSelecionadoDetalles, setPresupuestoSelecionadoDetalles] =
    useState(undefined);
  const [proyectoSelecionado, setProyectoSelecionado] = useState(undefined);
  const [show, setShow] = useState(false);
  const [showModalPresupuesto, setShowModalPresupuesto] = useState(false);
  const [showModalPresupuestoEditar, setShowModalPresupuestoEditar] =
    useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [ProyectosTodosByPresupueso, setProyectosTodosByPresupueso] =
    useState(undefined);

  useEffect(() => {
    getPresupuestosTodos();

    console.log(JSON.stringify(localStorage.getItem("token")));
  }, []);

  useEffect(() => {
    if (presupuestoSelecionado) {
      getProyectoByIdPresupuesto(presupuestoSelecionado);
      getPresupuestobyId(presupuestoSelecionado);
    }
  }, [presupuestoSelecionado]);

  const getPresupuestosTodos = async () => {
    const result = await getAllPresupuestosService();
    console.log(result);
    const s = result.map((x) => {
      return { label: x.descripcion, value: x.id };
    });

    setPresupuestosTodos(s);
  };

  const getProyectoByIdPresupuesto = async (id) => {
    setProyectosTodosByPresupueso(await getProyectoByIdPresupuestoService(id));
  };

  const getPresupuestobyId = async (id) => {
    setPresupuestoSelecionadoDetalles(await getPresupuestobyIdService(id));
  };

  return (
    <div class="container mt-5">
      <div class="card text-start">
        <div class="card-body">
          <p class="card-text">
            <div className="d-flex justify-content-between">
              <div class="input-group me-3 w-100">
                <button
                  class="btn btn-success me-3"
                  type="button"
                  id="button-addon2"
                  onClick={() => setShowModalPresupuesto(true)}
                >
                  <i class="fa-solid fa-circle-plus fa-xl me-2"></i>
                  Crear Presupuesto
                </button>
                <Select
                  onChange={(e) => {
                    setPresupuestoSelecionado(e.value);
                  }}
                  className="w-50"
                  theme={(theme) => ({
                    ...theme,
                    borderRadius: 0,
                    colors: {
                      ...theme.colors,
                      primary25: "#3bad0e",
                      primary: "#09a004",
                    },
                  })}

                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      height: "100%",
                      borderRadius: "1em",
                      borderColor: "green",
                      backgroundColor: "#e7e7e7",
                      fontSize: "1.3em",
                      color: "#3bad0e",
                      fontWeight: "bold",
                    }),
                    menu: (baseStyles, state) => ({
                      ...baseStyles,
                      borderRadius: "1em",
                      borderColor: "green",
                      fontSize: "1.3em",
                      fontWeight: "semibold",
                      overflow: "hidden",
                    }),
                  }}
                  options={presupuestosTodos}
                />
                <button
                  class="btn btn-warning text-white ms-3"
                  type="button"
                  id="button-addon2"
                  disabled={!presupuestoSelecionado ? true : false}
                  onClick={() => setShowModalPresupuestoEditar(true)}
                >
                  <i class="fa-solid fa-circle-dollar-to-slot me-2"></i>
                  Editar Presupuesto
                </button>
              </div>

              <button
                class="btn btn-info text-white shadow-sm"
                type="button"
                id="button-addon2"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                disabled={!presupuestoSelecionado ? true : false}
              >
                <i class="fa-solid fa-circle-plus fa-xl me-2"></i>
                Agregar Proyecto
              </button>
            </div>

            <div className="row mt-3 g-3">
              <div className="col-12">
                <div className="d-flex justify-content-evenly">
                  <div className="">
                    <span>Disponible</span>
                    <span className="px-2 bg-secondary ms-2 rounded-2"></span>
                  </div>

                  <div className="">
                    <span>Asignado</span>
                    <span className="px-2 bg-warning ms-2 rounded-2"></span>
                  </div>

                  <div className="">
                    <span>Gastado / Usado </span>
                    <span className="px-2 bg-danger ms-2 rounded-2"></span>
                  </div>
                </div>
                <ProgressBar className="mb-3" style={{ height: "2em" }}>
                  <ProgressBar striped variant="danger" now={presupuestoSelecionadoDetalles && presupuestoSelecionadoDetalles.gastoPorcentaje} key={1} />
                  <ProgressBar variant="warning" now={presupuestoSelecionadoDetalles && presupuestoSelecionadoDetalles.asignadoPorcentaje} key={2} />
                  <ProgressBar variant="secondary" now={presupuestoSelecionadoDetalles && presupuestoSelecionadoDetalles.restantePorcenjate} key={3} />
                </ProgressBar>

              </div>
              <div className="col-md-8">
                <div class="card-group">
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Valor Total</h4>
                      <p class="card-text">
                        {presupuestoSelecionadoDetalles &&
                          MostrarDinero(presupuestoSelecionadoDetalles.totalCantidad)
                        }
                      </p>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Valor Restante</h4>
                      <p class="card-text">
                        {presupuestoSelecionadoDetalles &&
                          MostrarDinero(presupuestoSelecionadoDetalles.totalRestante)}
                      </p>
                    </div>
                  </div>
                  <div class="card">
                    <div class="card-body">
                      <h4 class="card-title">Valor Ocupado</h4>
                      <p class="card-text">
                        {presupuestoSelecionadoDetalles &&
                          MostrarDinero(presupuestoSelecionadoDetalles.totalGasto)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {presupuestoSelecionado ? (
              <div class="table-responsive mt-3">
                <table
                  class="table table-striped
              table-hover	
              table-borderless
              align-middle"
                >
                  <thead class="table-light">
                    <tr>
                      <th>#</th>
                      <th>Objetc</th>
                      <th>Descripcion</th>
                      <th>Monto de Proyecto</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody class="table-group-divider">
                    {ProyectosTodosByPresupueso &&
                      ProyectosTodosByPresupueso.length === 0 && (
                        <tr>
                          <td colSpan={5}>
                            <div className="my-4 py-2 text-center">
                              <span class="badge bg-secondary fs-4">
                                No hay Proyectos en este Presupuesto.
                              </span>
                            </div>
                          </td>
                        </tr>
                      )}
                    {ProyectosTodosByPresupueso &&
                      ProyectosTodosByPresupueso.map((p) => (
                        <tr class="">
                          <td>
                            <Link
                              to={`/proyecto/${p.id}`}
                              type="button"
                              class="btn btn-warning text-white"
                            >
                              <i class="fa-regular fa-eye"></i>
                            </Link>
                          </td>
                          <td>{p.nombre}</td>
                          <td>{p.descripcion}</td>
                          <td>
                            {MostrarDinero(p.montoTotal)}
                          </td>
                          <td>
                            <div
                              class="btn-group"
                              role="group"
                              aria-label="Basic example"
                            >
                              <button
                                type="button"
                                class="btn btn-danger fw-semibold"
                                onClick={async () => {
                                  try {
                                    await deleteProyectoServicio(p.id);
                                    toast("Proyecto Elimando Correctamente.");
                                    getProyectoByIdPresupuesto(
                                      presupuestoSelecionado
                                    );
                                  } catch (error) {
                                    console.log(error);
                                    toast(error.message);
                                  }
                                }}
                              >
                                Eliminar
                              </button>
                              <button
                                type="button"
                                class="btn btn-info text-white fw-semibold"
                                onClick={() => {
                                  setProyectoSelecionado(p);
                                  handleShow();
                                }}
                              >
                                Editar
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                  <tfoot></tfoot>
                </table>
              </div>
            ) : (
              <div className="my-4 py-2 text-center">
                <span class="badge bg-danger fs-4">
                  Seleccione un Presupuesto{" "}
                </span>
              </div>
            )}
          </p>
        </div>
      </div>

      <Modal show={show}
        dialogClassName="overflow-hidden rounded-5"
        onHide={handleClose} >
        <Modal.Header className="bg-success rounded-top-3" closeButton>
          <Modal.Title>Editar Proyecto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormProyectoComponent
            getProyectoByIdPresupuesto={getProyectoByIdPresupuesto}
            presupuestoSelecionado={presupuestoSelecionado}
            proyecto={proyectoSelecionado}
            getPresupuestobyId={getPresupuestobyId}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showModalPresupuesto}
        dialogClassName="overflow-hidden rounded-5"
        onHide={() => setShowModalPresupuesto(false)}
      >
        <Modal.Header className="bg-success rounded-top-3" closeButton>
          <Modal.Title>Crear Presupuesto.</Modal.Title>
        </Modal.Header>
        <Modal.Body className=" border-2 border-success">
          <FormPresupuestoComponent
            setShowModalPresupuesto={setShowModalPresupuesto}
            getPresupuestosTodos={getPresupuestosTodos}
            getPresupuestobyId={getPresupuestobyId}
          />
        </Modal.Body>
      </Modal>

      <Modal
        show={showModalPresupuestoEditar}
        dialogClassName="overflow-hidden rounded-5"
        onHide={() => setShowModalPresupuestoEditar(false)}
      >
        <Modal.Header className="bg-success rounded-top-3" closeButton>
          <Modal.Title>Editar Presupuesto.</Modal.Title>
        </Modal.Header>
        <Modal.Body className=" border-2 border-success">
          <FormPresupuestoComponent
            presupuesto={presupuestoSelecionadoDetalles}
            setShowModalPresupuesto={setShowModalPresupuestoEditar}
            getPresupuestosTodos={getPresupuestosTodos}
            getPresupuestobyId={getPresupuestobyId}
          />
        </Modal.Body>
      </Modal>

      {/*  <Articles /> */}

      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content overflow-hidden rounded-5">
            <div class="modal-header bg-success rounded-top-3">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                CREAR PROYECTO
              </h1>

              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <FormProyectoComponent
              getProyectoByIdPresupuesto={getProyectoByIdPresupuesto}
              presupuestoSelecionado={presupuestoSelecionado}
              getPresupuestobyId={getPresupuestobyId}

            />
          </div>
        </div>
      </div>
    </div>
  );
}
