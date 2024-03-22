import React, { useState } from 'react';

const TableComponent = ({ handleAsignar }) => {
  const [selectedPedido, setSelectedPedido] = useState(null);

  const handleAsignarClick = (pedido, cliente) => {
    setSelectedPedido({ pedido, cliente });
    handleAsignar(pedido, cliente);
  };
  const data = [
    {
      nombre: 'Anna',
      apellido: "Garcia",
      estatus: "Pendiente",
      telefono: "777-455-55-55",
      direccion: "Avenida Independencia, Ciudad, País",
      pedido: {
        num_pedido: "13GOA12",
        fecha_de_solicitud: "13-mar-2024",
        fecha_de_entrega: "15-mar-2024",
        monto: 1233
      },
    },
    {
      nombre: 'Angel',
      apellido: "Suarez",
      estatus: "Pendiente",
      telefono: "777-888-55-55",
      direccion: "Avenida Independencia, Ciudad, País",
      pedido: {
        num_pedido: "13GOA16",
        fecha_de_solicitud: "08-mar-2024",
        fecha_de_entrega: "09-mar-2024",
        monto: 121
      },
    }
  ];

  return (
    <div className="table-container mt-4">
      <div className="grid grid-flow-col bg-red text-start rounded-t-lg text-white row table-head p-2">
        <div className="col-2">#</div>
        <div className="col-2">Nombre </div>
        <div className="col-2">Apellidos</div>
        <div className="col-2">Estatus</div>
        <div className="col-6">Repartidor</div>
      </div>
      <div className="table-body">
        {data.map((item, index) => (
          <div key={index} className="grid grid-flow-col text-start effect-shadow-td p-3 mt-1 mb-1">
            <div className="col-2 bg-light-800">{index + 1}</div>
            <div className="col-2 bg-light-800">{item.nombre}</div>
            <div className="col-2">{item.apellido}</div>
            <div className="col-2">{item.estatus}</div>
            <div className="col-2">
              <button
                type="button"
                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                onClick={() => handleAsignarClick(item.pedido, { nombre: item.nombre, apellido: item.apellido, estatus: item.estatus, telefono: item.telefono, direccion: item.direccion })}
              >
                Asignar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableComponent;