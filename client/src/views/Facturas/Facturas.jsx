import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { getProyectoById } from "../../services/proyectos.servicios";
import Modal from "react-bootstrap/Modal";
import FormFacturas from "./FormFacturas";
import { getFacturasByProyectoService } from "../../services/facturas.services";

export default function FacturasComponent() {
  const [proyectoActual, setProyectoActual] = useState(undefined);
  const [facturasTodas, setFacturasTodas] = useState(undefined);
  const { id } = useParams();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);


  useEffect(() => {
    getProyectoActual(id);
    getFacturasTodasByProyecto(id)
  }, [id]);

  const getProyectoActual = async (id) => {
    setProyectoActual(await getProyectoById(id));
  };

  const getFacturasTodasByProyecto = async (id) => {
    try {
      const f = await getFacturasByProyectoService(id);
      console.log(f.data);
      setFacturasTodas(f.data)
    } catch (error) {

    }
  }
  return (
    <div class="container-xxl mt-5">
      <div class="card text-start">
        <div className="d-flex align-items-end center p-3  border-bottom ">
          <h4 className="w-100">
            FACTURAS : {proyectoActual && proyectoActual.nombre}{" "}
          </h4>
          <button
            class="me-2 btn btn-success rounded-4"
            onClick={() => setShow(true)}
          >
            Crear Factura
          </button>
          <button
            onClick={() => {
              navigate(`/proyecto/${id}`);
            }}
            class="float-end btn btn-danger p-3 rounded-4"
          >
            <i class="fa-solid fa-xl fa-angles-left"></i>
          </button>
        </div>
        <div class="card-body">

          <div className="row g-3">
            {facturasTodas &&
              facturasTodas.map((f) => (
                <div className="col-sm-12 col-md-6 col-xl-4">
                  <div className="card">
                    <div className="card-body">
                      <div className="row g-1">
                        <div className="col-6">
                          <span className="fw-semibol fs-5"> {`F - ${f.id}`}</span>
                        </div>
                        <div className="col-6">
                          <span className="fw-semibol fs-5">
                            {`${f.fechaPagado && f.fechaPagado.substring(0, 10)}`}
                          </span>
                        </div>
                        <div className="col-12 text-center">
                          <span class="badge bg-secondary fs-5 rounded-3">
                          {`${f.estado}`}
                          </span>
                        </div>
                        <div className="col-6 ">
                          <span class=" fs-5">{`${f.Contracto && f.Contracto.nombre}`}</span>
                        </div>
                        <div className="col-6 ">
                          <span class=" fs-5">{f.montoTotal}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      <Modal show={show}
        dialogClassName="overflow-hidden rounded-5"
        onHide={() => setShow(false)} >
        <Modal.Header className="bg-success rounded-top-3" closeButton>
          <Modal.Title>Crear Factura</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <FormFacturas setShow={setShow} />
        </Modal.Body>
      </Modal>
    </div>
  );
}
