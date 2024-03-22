import React, { useState } from "react";
import TableComponent from './components/TableComponent';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';

const schema = yup.object().shape({
  repartidor: yup.string().required('Selecciona un repartidor'),
});

function SolicitudPedido() {
  const [selectedData, setSelectedData] = useState(null);
  const [pedidos, setPedidos] = useState([]);

  const asignarRepartidor = (pedidoId, repartidorNombre) => {
    // Lógica para asignar el repartidor al pedido
    // Por ejemplo, realizar una solicitud al servidor para actualizar el pedido
    // o actualizar el estado local de pedidos

    // Simulando una actualización de pedidos
    const pedidoActualizado = pedidos.map((pedido) => {
      if (pedido.id === pedidoId) {
        return {
          ...pedido,
          repartidor: repartidorNombre,
        };
      }
      return pedido;
    });

    setPedidos(pedidoActualizado);
  };

  const formik = useFormik({
    initialValues: {
      repartidor: '',
    },
    validationSchema: schema,
    onSubmit: (values) => {
      Swal.fire({
        title: '¿Asignar repartidor?',
        text: `¿Deseas asignar el repartidor ${values.repartidor} al pedido?`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, asignar',
        cancelButtonText: 'Cancelar'
      }).then((result) => {
        if (result.isConfirmed) {
          // Asignar el repartidor al pedido
          asignarRepartidor(selectedData.pedido.id, values.repartidor);
          setSelectedData(null); // Limpiar los datos del pedido
          formik.resetForm(); // Resetear el formulario
          Swal.fire(
            '¡Repartidor asignado!',
            'El repartidor ha sido asignado al pedido.',
            'success'
          );
        }
      });
    },
  });

  const handleAsignar = (pedido, cliente) => {
    setSelectedData({ pedido, cliente });
  };

  const handleCancelar = () => {
    if (formik.values.repartidor) {
      Swal.fire({
        title: '¿Cancelar asignación?',
        text: '¿Estás seguro de cancelar la asignación del repartidor?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, cancelar',
        cancelButtonText: 'No, mantener'
      }).then((result) => {
        if (result.isConfirmed) {
          setSelectedData(null); // Limpiar los datos del pedido
          formik.resetForm(); // Resetear el formulario
        }
      });
    } else {
      setSelectedData(null); // Limpiar los datos del pedido
    }
  };

  const repartidores = [
    {
      id: 1,
      nombre: "Juan Pérez",
      vehiculo: "Moto"
    },
    {
      id: 2,
      nombre: "María Gómez",
      vehiculo: "Bicicleta"
    },
    {
      id: 3,
      nombre: "Carlos Ramírez",
      vehiculo: "Automóvil"
    },
    {
      id: 4,
      nombre: "Ana López",
      vehiculo: "Moto"
    },
    {
      id: 5,
      nombre: "Pedro Sánchez",
      vehiculo: "Bicicleta"
    }
  ];

  return (
    <div className="m-12 xl:m-120">
      <div className=' cardPedido w-full effect-shadow-div pb-3 px-6 mt-4'>
        <p className='text-3xl font-extrabold text-center mb-6'>Solicitud de Pedido</p>
        <div className="grid grid-cols-12 gap-4 mb-4">
          <div className='col-span-5'>
            <p className='text-lg font-bold'>Pedido</p>
            {selectedData && (
              <>
                <p className=' text-sm font-medium'>Fecha de Solicitud:</p>
                <p className=' text-sm font-medium'>Fecha de entrega: {selectedData.pedido.fecha_de_entrega}</p>
                <p className=' text-sm font-medium'>Estado: {selectedData.cliente.estatus}</p>
              </>
            )}
          </div>
          <div className='col-span-5'>
            <p className='text-lg font-bold'>Cliente</p>
            {selectedData && (
              <>
                <p className=' text-sm font-medium'>Nombre: {selectedData.cliente.nombre} {selectedData.cliente.apellido}</p>
                <p className=' text-sm font-medium'>Teléfono: {selectedData.cliente.telefono}</p>
                <p className=' text-sm font-medium'>Dirección: {selectedData.cliente.direccion}</p>
              </>
            )}
          </div>
          <div className='col-span-2'>
            <p className='text-lg font-bold'>Monto a Pagar</p>
            {selectedData && <p className='text-5xl font-semibold text-center'>${selectedData.pedido.monto}</p>}
          </div>
        </div>
        <form onSubmit={formik.handleSubmit}>
        <div className='w-3/5 mb-8'>
         
            <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Seleccionar repartidor
            </label>
            <select
              id="repartidor"
              name="repartidor"
              value={formik.values.repartidor}
              onChange={formik.handleChange}
              className={`bg-gray border effect-shadow-input border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-red-500 focus:border-red-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                formik.errors.repartidor ? 'border-red-500' : ''
              }`}
            >
              <option value="">Seleccione un repartidor...</option>
              {repartidores.map((repartidor) => (
                <option key={repartidor.id} value={repartidor.nombre}>
                  {repartidor.nombre} ({repartidor.vehiculo})
                </option>
              ))}
            </select>
            {formik.errors.repartidor && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.repartidor}</p>
            )}
          
        </div>
        <div className='grid grid-flow-col justify-end gap-4'>
          <button
            type="button"
            onClick={handleCancelar}
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red dark:focus:ring-red-900"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red dark:focus:ring-red-900"
          >
            Guardar
          </button>
        </div>
        </form>
      </div>
      <div className=' mb-9'>
        <div className="table-container">
          <TableComponent handleAsignar={handleAsignar} />
        </div>
      </div>
    </div>
  );
}

export default SolicitudPedido;