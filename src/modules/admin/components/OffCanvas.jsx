import React from 'react';

function OffCanvas({
    showOffcanvas,
    setShowOffcanvas,
    selectedCut,
    handleModalToggle,
    handleEditModalToggle,
    handleAddModalToggle,
    handleEditPreparationModalToggle,
}) {
    return (
        <>
            {showOffcanvas && <div className="fixed inset-0 z-40 bg-black bg-opacity-25"></div>}
            <div
                id="drawer-right-example"
                className={`fixed top-0 right-0 z-50 h-screen p-4 overflow-y-auto bg-white w-80 dark:bg-gray-800 transition-transform duration-300 ${
                    showOffcanvas ? 'translate-x-0' : 'translate-x-full'
                }`}
                tabIndex="-1"
                aria-labelledby="drawer-right-label"
                role="dialog"
                aria-modal="true"
            >
                <div className="mb-4 ">
                    <div className="grid justify-end">
                        <button
                            type="button"
                            onClick={() => setShowOffcanvas(false)}
                            aria-controls="drawer-right-example"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            <i className="fa-solid fa-x"></i>
                            <span className="sr-only">Close menu</span>
                        </button>
                    </div>
                    <div className="flex flex-col items-center mb-2">
                        <img src={selectedCut.image} className="rounded-t-lg img-offcanvas mb-1" alt="" width="" />
                        <p className="font-bold text-4xl ">{selectedCut.cut}</p>
                    </div>
                    <div className="col-span-10 gap-24 flex items-center mb-3">
                        <div className="col-span-5 ">
                            <p className="font-light text-lg ">Kilo(s)</p>
                            <p className="font-semibold text-3xl ">{selectedCut.quantity}</p>
                        </div>
                        <div className="col-span-5">
                            <p className="font-light text-lg ">Precio</p>
                            <p className="font-semibold text-3xl ">${selectedCut.price}</p>
                        </div>
                    </div>

                    <button
                        type="button"
                        onClick={handleEditModalToggle}
                        className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4"
                    >Cambiar
                    </button>
                    <div className="tablePreparaciondes mb-6">
                        <div className="bg-red p-1 pl-2 mb-3 rounded-md">
                            <p className="text-lg text-normal  text-white">Tipo de Corte</p>
                        </div>
                        <div className="table row-span-10 flex flex-row gap-4 items-center">
                            <div className="row-span-4">
                                <p className="text-normal ">{selectedCut.preparationType.preparation}</p>
                            </div>
                            <div className="row-span-4">
                                <p className="font-normal ">${selectedCut.preparationType.cost}</p>
                            </div>
                            <div className="row-span-2">
                                <button
                                    type="button"
                                    onClick={handleEditPreparationModalToggle}
                                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-sm rounded-md text-lg p-1.5 px-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mr-1"
                                >
                                    <i className="fa-solid fa-pen"></i>
                                </button>
                                <button
                                    type="button"
                                    className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 text-sm rounded-md text-lg p-1.5 px-2 text-center dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 "
                                >
                                    <i className="fa-solid fa-trash-can"></i>
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        onClick={handleModalToggle}
                        className="w-full text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4"
                    >
                        Añadir
                    </button>
                </div>
            </div>
        </>
    );
}

export default OffCanvas;