import React, { useState } from 'react';
import Imagen from '../../assets/costillas.jpg';
import ImagenOffcanvas from '../../assets/carne.png'
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as yup from 'yup';

const validationSchema = yup.object({
    corte: yup.string().required('Campo  obligatorio'),
    cantidad: yup.number().required('Campo obligatorio'),
    precio: yup.number().required('Campo obligatorio'),
});

function Inventario() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEditPreparation, setShowModalEditPreparation] = useState(false);
    const [selectedCut, setSelectedCut] = useState({ corte: 'Costillas', cantidad: 100, precio: 130, imagen: Imagen, tipoPreparacion: { preparacion: "Asado", costo: 20 } });


    const [previewImage, setPreviewImage] = useState(null);


    const handleModalToggle = () => {
        setShowModal(!showModal);
        setShowOffcanvas(false)
    }


    const handleEditModalToggle = () => {
        setShowModalEdit(!showModalEdit);
        setShowOffcanvas(false)
        formik.setValues({ corte: selectedCut.corte, cantidad: selectedCut.cantidad, precio: selectedCut.precio });
    }
    const handleAddModalToggle = () => {
        setShowModalAdd(!showModalAdd);
        setShowOffcanvas(false)
    }
    const handleEditPreparationModalToggle = () => {
        setShowModalEditPreparation(!showModalEditPreparation);
        setShowOffcanvas(false)
    }

    const handleCerrarModalEdit = () => {
        setShowModalEdit(!showModalEdit);
        setShowOffcanvas(true)
    };

    const handleCerrarModalAdd = () => {
        setShowModalAdd(!showModalAdd);
    };

    const handleCerrarModal = () => {
        setShowModal(!showModal);
        setShowOffcanvas(true)
    };
    const handleCerrarModalEditPreparation = () => {
        setShowModalEditPreparation(!showModalEditPreparation);
        setShowOffcanvas(true)
    };

    const formik = useFormik({
        initialValues: {
            corte: '',
            cantidad: '',
            precio: '',
            imagen: null,
        },
        validationSchema,
        onSubmit: (values) => {
            setShowModalEdit(!showModalEdit);
            setShowOffcanvas(true)
            console.log(values);
        },
    });
    const handleImageUpload = (event) => {
        const file = event.currentTarget.files[0];
        formik.setFieldValue('image', file);
        setPreviewImage(URL.createObjectURL(file));
    };

    return (

        <div className="mt-4">
            <div className='grid grid-flex justify-center  mb-8 '>
                <h2 className='text-4xl font-semibold '>Inventario</h2>
            </div>
            <div>

                <div className="grid justify-items-end">
                    <button type="button" onClick={handleAddModalToggle} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4">
                        Agregar
                    </button>
                </div>
            </div>
            <div className="card effect-shadow-div p-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
                    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 effect-shadow-input "
                    >
                        <img src={selectedCut.imagen} className="rounded-t-lg card-img" alt="" width="" />
                        <div className="card-body p-1 ">
                            <div className="grid grid-cols-10 gap-2 items-start">
                                <div className="col-span-5">
                                    <p className="card-text text-xl fw-bold lg:text-base">{selectedCut.corte}</p>
                                </div>
                                <div className="col-span-4">
                                    <p className="card-text text-xl fw-bold lg:text-base">{selectedCut.precio}</p>
                                </div>
                                <div className="col-span-1 flex justify-start ">
                                    <button className="text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full" type="button" onClick={() => setShowOffcanvas(true)} aria-controls="drawer-right-example" aria-expanded={showOffcanvas}>
                                        <i className="fa-solid fa-ellipsis-vertical text-xl"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-8 gap-4">
                                <div className="col-span-6">
                                    <p className="card-text fw-bold lg:text-ms">Cantidad: {selectedCut.cantidad}</p>
                                </div>
                                <div className="col-span-2 flex justify-end">
                                    <p className="card-text lg:text-ms">Kilo(s)</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showOffcanvas && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-25"></div>
            )}
            <div
                id="drawer-right-example"
                className={`fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 transition-transform duration-300 ${showOffcanvas ? 'translate-x-0' : 'translate-x-full'
                    }`}
                tabIndex="-1"
                aria-labelledby="drawer-right-label"
                role="dialog"
                aria-modal="true">

                <div className="mb-4 ">
                    <div className='grid justify-end'>
                        <button
                            type="button"
                            onClick={() => setShowOffcanvas(false)}
                            aria-controls="drawer-right-example"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        ><i className="fa-solid fa-x"></i>
                            <span className="sr-only">Close menu</span>
                        </button>
                    </div>
                    <div className='flex flex-col items-center mb-2'>
                        <img src={selectedCut.imagen} className="rounded-t-lg img-offcanvas mb-1" alt="" width="" />
                        <p className="font-bold text-4xl ">{selectedCut.corte}</p>
                    </div>
                    <div className="col-span-10 gap-24 flex items-center mb-3">
                        <div className="col-span-5 ">
                            <p className="font-light text-lg ">Kilo(s)</p>
                            <p className="font-semibold text-3xl ">{selectedCut.cantidad}</p>
                        </div>
                        <div className="col-span-5">
                            <p className="font-light text-lg ">Costo</p>
                            <p className="font-semibold text-3xl ">${selectedCut.precio}</p>
                        </div>

                    </div>

                    <button type="button" onClick={handleEditModalToggle} className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4">
                        Cambiar
                    </button>
                    <div className='tablePreparaciondes mb-6'>
                        <div className='bg-red p-1 pl-2 mb-3 rounded-md'>
                            <p className="text-lg text-normal  text-white">Tipo de preparacion</p>
                        </div>
                        <div className="table row-span-10 flex flex-row gap-4 items-center">
                            <div className="row-span-4">
                                <p className="text-normal ">{selectedCut.tipoPreparacion.preparacion}</p>
                            </div>
                            <div className="row-span-4">
                                <p className="font-normal ">${selectedCut.tipoPreparacion.costo}</p>
                            </div>
                            <div className="row-span-2">
                                <button type="button" onClick={handleEditPreparationModalToggle} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-sm rounded-md text-lg p-1.5 px-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mr-1">
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button type="button" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-sm rounded-md text-lg p-1.5 px-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 ">
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                    </div>


                    <button onClick={handleModalToggle} className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4">
                        Agregar
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-25">

                    <div id="authentication-modal" className={`absolute top-0 right-0 left-0 z-50 flex justify-start items-center h-screen`}>
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="p-4 md:p-5 ">
                                <div className="grid justify-end">
                                    <button onClick={handleCerrarModal} type="button" className=" text-sm font-medium text-end text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <p className="font-bold text-xl text-center text-red-800">Agregar Tipo de Preparación</p>

                                <div className="col-span-12 flex flex-row mt-3 mb-8 gap-4">
                                    <div className="">
                                        <label htmlFor="preparacion" className="block mb-1  text-ms font-normal text-gray-900 dark:text-white">Preparación</label>
                                        <input type="text" id="" className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="" required />
                                    </div>
                                    <div className="">
                                        <label htmlFor="costo" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">Costo</label>
                                        <input type="text" id="" className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="" required />
                                    </div>
                                </div>
                                <div className="grid justify-end">
                                    <button type="submit" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4">
                                        Guardar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
            {showModalEditPreparation && (
    <div className="fixed inset-0 z-40 bg-black bg-opacity-25">
        <div id="authentication-modal" className={`absolute top-0 right-0 left-0 z-50 flex justify-start items-center h-screen`}>
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="p-4 md:p-5 ">
                    <div className="grid justify-end">
                        <button onClick={handleCerrarModalEditPreparation} type="button" className=" text-sm font-medium text-end text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <p className="font-bold text-xl text-center text-red-800">Actualizar tipo de preparación</p>

                    <div className="col-span-12 flex flex-row mt-3 mb-8 gap-4">
                        <div className="">
                            <label htmlFor="preparacion" className="block mb-1  text-ms font-normal text-gray-900 dark:text-white">Preparación</label>
                            <input type="text" id="" className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={selectedCut.tipoPreparacion.preparacion} required />
                        </div>
                        <div className="">
                            <label htmlFor="costo" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">Costo</label>
                            <input type="text" id="" className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={`$${selectedCut.tipoPreparacion.costo}`} required />
                        </div>
                    </div>
                    <div className="grid justify-end">
                        <button type="submit" className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4">
                            Guardar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
)}
            {showModalEdit && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-25">

                    <div id="authentication-modal" className={`absolute top-0 right-0 left-0 z-50 flex justify-start items-center h-screen`}>
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="p-4 md:p-5 ">
                                <div className="grid justify-end">
                                    <button onClick={handleCerrarModalEdit} type="button" className=" text-sm font-medium text-end text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <p className="font-bold text-xl text-center text-red-800">Actualizar corte de carne</p>
                                <div>
                                    <label htmlFor="corte" className="block mb-1  text-ms font-normal text-gray-900 dark:text-white">
                                        Corte
                                    </label>
                                    <input
                                        type="text"
                                        id="corte"
                                        className="effect-shadow-input w-full"
                                        value={formik.values.corte}
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                    />
                                    <div className="col-span-12 flex flex-row mt-3 mb-8 gap-4">
                                        <div className="">
                                            <label htmlFor="cantidad" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                                Cantidad(kilos)
                                            </label>
                                            <input
                                                type="number"
                                                id="cantidad"
                                                className="effect-shadow-input w-full" min="0"
                                                value={formik.values.cantidad}
                                                onChange={formik.handleChange}
                                                onBlur={formik.handleBlur}
                                            />
                                        </div>
                                        <div className="">
                                            <label htmlFor="precio" className="block mb-1  text-ms font-normal text-gray-900 dark:text-white">
                                                Precio(k)
                                            </label>
                                            <input
                                                type="number"
                                                id="precio"
                                                className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                {...formik.getFieldProps('precio')}
                                                min="0"
                                                pattern="[0-9]*" />

                                        </div>

                                    </div>
                                    <div className="grid items-center justify-center w-full">
                                        <label
                                            className="block mb-1 text-ms font-normal text-gray-900 dark:text-white" htmlFor="imagen">
                                            Subir imagen
                                        </label>
                                        <input
                                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                            aria-describedby="imagen_help"
                                            id="imagen"
                                            type="file"
                                            onChange={handleImageUpload}
                                        />
                                        <p className="mt-1 text-xs text-gray-500 text-end justify-items-end dark:text-gray-300" id="imagen_help">
                                            SVG, PNG, JPG o GIF (MÁX. 800x400px).
                                        </p>
                                    </div>
                                    <div className="grid justify-end mt-4">
                                        <button
                                            type="submit"
                                            className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mb-4"
                                        >
                                            Guardar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            )}
            {showModalAdd && (
                <div className="fixed inset-0 z-40 bg-black bg-opacity-25">

                    <div id="authentication-modal" className={`absolute top-0 right-0 left-0 z-50 flex justify-start items-center h-screen`}>
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <div className="p-4 md:p-5 ">
                                <div className="grid justify-end">
                                    <button onClick={handleCerrarModalAdd} type="button" className=" text-sm font-medium text-end text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">
                                        <i className="fa-solid fa-xmark"></i>
                                    </button>
                                </div>
                                <p className="font-bold text-xl  text-center text-red-800 mb-3">Corte de carne</p>


                                <form onSubmit={formik.handleSubmit}>
                                    <div>
                                        <label htmlFor="corte" className="block mb-1  text-ms font-normal text-gray-900 dark:text-white">
                                            Corte
                                        </label>
                                        <input
                                            type="text"
                                            id="corte"
                                            className="effect-shadow-input w-full"
                                            value={formik.values.corte}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                        />
                                        {formik.touched.corte && formik.errors.corte ? (
                                            <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.corte}</div>
                                        ) : null}

                                        <div className="col-span-12 flex flex-row mt-3 mb-8 gap-4">
                                            <div className="">
                                                <label htmlFor="cantidad" className="block mb-1 text-ms font-normal text-gray-900 dark:text-white">
                                                    Cantidad(kilos)
                                                </label>
                                                <input
                                                    type="number"
                                                    id="cantidad"
                                                    className="effect-shadow-input w-full" min="0"
                                                    value={formik.values.cantidad}
                                                    onChange={formik.handleChange}
                                                    onBlur={formik.handleBlur}
                                                />
                                                {formik.touched.cantidad && formik.errors.cantidad ? (
                                                    <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.cantidad}</div>
                                                ) : null}
                                            </div>
                                            <div className="">
                                                <label htmlFor="precio" className="block mb-1  text-ms font-normal text-gray-900 dark:text-white">
                                                    Precio(k)
                                                </label>
                                                <input
                                                    type="number"
                                                    id="precio"
                                                    className="effect-shadow-input bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    {...formik.getFieldProps('precio')}
                                                    min="0"
                                                    pattern="[0-9]*"
                                                />
                                                {formik.touched.precio && formik.errors.precio ? (
                                                    <div className="grid justify-items-end text-red-500  text-sm mt-2">{formik.errors.precio}</div>
                                                ) : null}
                                            </div>
                                        </div>
                                        <div className="grid items-center justify-center w-full">
                                            <label
                                                className="block mb-1 text-ms font-normal text-gray-900 dark:text-white" htmlFor="imagen"
                                            >
                                                Subir imagen
                                            </label>
                                            <input
                                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                                                aria-describedby="imagen_help"
                                                id="imagen"
                                                type="file"
                                                onChange={handleImageUpload}
                                            />
                                            <p className="mt-1 text-xs text-gray-500 text-end justify-items-end dark:text-gray-300" id="imagen_help">
                                                SVG, PNG, JPG o GIF (MÁX. 800x400px).
                                            </p>
                                        </div>
                                        <div className="grid justify-end mt-4">
                                            <button
                                                type="submit"
                                                className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 mb-4"
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>

                </div>
            )}
        </div >
    );
}

export default Inventario;
