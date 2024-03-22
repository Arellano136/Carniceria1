import React from 'react';

function InventoryCard({ selectedCut, setShowOffcanvas, showOffcanvas }) {
    return (
        <div className="card effect-shadow-div p-2">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-2">
                <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-2 effect-shadow-input ">
                    <img src={selectedCut.image} className="rounded-t-lg card-img" alt="" width="" />
                    <div className="card-body p-1 ">
                        <div className="grid grid-cols-10 gap-2 items-start">
                            <div className="col-span-5">
                                <p className="card-text text-xl fw-bold lg:text-base">{selectedCut.cut}</p>
                            </div>
                            <div className="col-span-4">
                                <p className="card-text text-xl fw-bold lg:text-base">$ {selectedCut.price}</p>
                            </div>
                            <div className="col-span-1 flex justify-start ">
                                <button
                                    className="text-gray-800 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-full"
                                    type="button"
                                    onClick={() => setShowOffcanvas(true)}
                                    aria-controls="drawer-right-example"
                                    aria-expanded={showOffcanvas}
                                >
                                    <i className="fa-solid fa-ellipsis-vertical text-xl"></i>
                                </button>
                            </div>
                        </div>
                        <div className="grid grid-cols-8 gap-4">
                            <div className="col-span-6">
                                <p className="card-text fw-bold lg:text-ms">Cantidad: {selectedCut.quantity}</p>
                            </div>
                            <div className="col-span-2 flex justify-end">
                                <p className="card-text lg:text-ms">Kilo(s)</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default InventoryCard;