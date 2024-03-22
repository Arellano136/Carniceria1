import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Swal from 'sweetalert2';

function EditPreparationModal({ showModalEditPreparation, handleCerrarModalEditPreparation, selectedCut, handleOpenOffcanvas }) {

    const validationSchema = yup.object().shape({
        preparation: yup.string().required('Campo obligatorio'),
    });

    const formik = useFormik({
        initialValues: {
            preparation: selectedCut.preparationType.preparation,
            cost: selectedCut.preparationType.cost
        },
        validationSchema: validationSchema,
        onSubmit: (values) => {
            // Handle form submission here
            Swal.fire('Guardado exitosamente!', '', 'success');
            handleCerrarModalEditPreparation();
            handleOpenOffcanvas();
        }
    });

    const handleCloseModal = () => {
        handleCerrarModalEditPreparation();
        handleOpenOffcanvas(); // Abre el offcanvas
    };

    return (
        <div>
            {showModalEditPreparation && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-25">
                    <div id="authentication-modal" className={`absolute top-0 right-0 left-0 z-50 flex justify-start items-center h-screen`}>
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="p-4 md:p-5 ">
                                <div className="grid justify-end">
                                    <button
                                        onClick={handleCloseModal} // Cambiado aquí
                                        type="button"
                                        className=" text-sm font-medium text-end text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                    >
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <form onSubmit={formik.handleSubmit}>
                                    <p className="font-bold text-xl text-center text-red-800">Actualizar tipo de corte</p>

                                    <div className="col-span-12 flex flex-row mt-3 mb-8 gap-4">
                                        <div className="">
                                            <label htmlFor="preparation" className="block mb-1  text-ms font-normal text-gray-900 dark:text-white">
                                                Corte
                                            </label>
                                            <input
                                                type="text"
                                                id="preparation"
                                                name="preparation"
                                                className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                {...formik.getFieldProps('preparation')}
                                            />
                                            {formik.touched.preparation && formik.errors.preparation ? (
                                                <div  className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.preparation}</div>
                                            ) : null}
                                        </div>
                                        <div className="">
                                            <label htmlFor="cost" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                                Precio
                                            </label>
                                            <input
                                                type="number"
                                                id="cost"
                                                min="0"
                                                pattern="[0-9]*"
                                                name="cost"
                                                className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                {...formik.getFieldProps('cost')}
                                            />
                                        </div>
                                    </div>
                                    <div className="grid justify-end">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                Swal.fire({
                                                    title: '¿Está seguro que desea guardar los cambios?',
                                                    icon: 'question',
                                                    showCancelButton: true,
                                                    confirmButtonColor: '#3085d6',
                                                    cancelButtonColor: '#d33',
                                                    confirmButtonText: 'Guardar'
                                                }).then((result) => {
                                                    if (result.isConfirmed) {
                                                        formik.handleSubmit();
                                                    }
                                                });
                                            }}
                                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>)}
        </div>
    )
}

export default EditPreparationModal;
