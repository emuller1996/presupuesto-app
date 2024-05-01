import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { useFacturas } from "../../hooks/useFacturas";
import { ViewDollar } from "../../utils";
import { Datepicker } from "flowbite-react";
export default function FacturasPages() {
  const { data, getAllFacturas } = useFacturas();

  const columns = [
    {
      name: "ID",
      selector: (row) => row.id,
      format: (row) => `FAV-${row.id}`,

      sortable: true,
      width: "90px",
    },
    {
      name: "Fecha ",
      selector: (row) => row.fechaPagado.substring(0, 10),
      sortable: true,
      maxWidth: "160px",
    },
    {
      name: "Total ",
      selector: (row) => row.montoTotal,
      format: (row) => ViewDollar(row.montoTotal),
      maxWidth: "180px",
      sortable: true,
    },
    {
      name: "concepto ",
      selector: (row) => row.concepto,
      maxWidth: "250px",
      sortable: true,
    },
    {
      name: "Estado ",
      selector: (row) => row.estado,
      sortable: true,
      maxWidth: "110px",
      cell: (row) => (
        <div className="border p-1 rounded-md flex justify-center items-center bg-green-200 shadow-md border-green-500">
          <div>{row.estado}</div>
        </div>
      ),
    },
    {
      name: "Contracto ",
      selector: (row) => row?.Contracto?.nombre,
      sortable: true,
    },
    {
      name: "Proyecto ",
      selector: (row) => row?.Contracto?.Proyecto?.nombre,
      sortable: true,
    },
  ];
  const [filterText, setFilterText] = useState("");
  const [FacturasSelecionados, setFacturasSelecionados] = useState([]);

  const handleChange = ({ selectedRows }) => {
    // You can set state or dispatch with something like Redux so we can use the retrieved data
    setFacturasSelecionados(selectedRows);
  };
  const filteredItems = data.filter(
    (item) =>
      item?.Contracto?.nombre
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      item?.Contracto?.Proyecto?.nombre
        .toLowerCase()
        .includes(filterText.toLowerCase()) ||
      (item?.ContractoId === null && filterText === "") ||
      item.concepto.toLowerCase().includes(filterText.toLowerCase()) ||
      item.fechaPagado.toLowerCase().includes(filterText.toLowerCase())
  );

  const paginationComponentOptions = {
    rowsPerPageText: "Filas por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };
  useEffect(() => {
    getAllFacturas();
  }, []);

  return (
    <>
      <div className="border border-green-400 shadow flex justify-start items-center  gap-2 p-2 mb-2 rounded-lg ">
        <form className="w-full md:w-1/2 lg:w-1/3">
          <label
            htmlFor="default-search"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
              onChange={(e) => {
                setFilterText(e.target.value);
              }}
              type="search"
              id="default-search"
              className="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-green-500 focus:border-green-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-green-500 dark:focus:border-green-500"
              placeholder="Busca facturas por Contracto, Proyecto"
              required
            />
          </div>
        </form>
        <Datepicker
          language="CO"
          labelTodayButton="Hoy"
          autoHide
          autoSave=""
        

          className="m-2"
          onSelectedDateChanged={(e) => {
            console.log(e.toISOString().substring(0, 10));
            setFilterText(e.toISOString().substring(0, 10));
          }}
          labelClearButton="Limpar"
        />
        {FacturasSelecionados.length > 0 && (
          <button
            type="button"
            className="text-white  bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            <svg
              className="w-5 h-5 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
              />
            </svg>
          </button>
        )}
      </div>
      <div className="border rounded-lg shadow  overflow-hidden border-green-500">
        <DataTable
          columns={columns}
          selectableRows
          onSelectedRowsChange={handleChange}
          responsive
          data={filteredItems}
          pagination
          noDataComponent={
            <div
              className="flex items-center p-4 my-5 text-sm text-gray-800 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600"
              role="alert"
            >
              <svg
                className="flex-shrink-0 inline w-4 h-4 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
              </svg>
              <div>
                <span className="font-medium uppercase">
                  no hay registros para mostrar
                </span>
              </div>
            </div>
          }
          paginationComponentOptions={paginationComponentOptions}
        />
      </div>
    </>
  );
}
