import React, { useState } from 'react';
import Imagen from '../../assets/costillas.jpg';
import ImagenOffcanvas from '../../assets/carne.png';
import Swal from 'sweetalert2';
import { useFormik } from 'formik';
import * as yup from 'yup';
import InventoryCard from '../admin/components/InventoryCard';
import OffCanvas from '../admin/components/OffCanvas';
import AddPreparationModal from '../admin/components/AddPreparationModal';
import EditPreparationModal from '../admin/components/EditPreparationModal';
import EditCutModal from '../admin/components/EditCutModal';
import AddCutModal from '../admin/components/AddCutModal';

const validationSchema = yup.object({
    cut: yup.string().required('Campo obligatorio'),
    quantity: yup.number().required('Campo obligatorio'),
    price: yup.number().required('Campo obligatorio'),
});

function Inventory() {
    const [showOffcanvas, setShowOffcanvas] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showModalEdit, setShowModalEdit] = useState(false);
    const [showModalAdd, setShowModalAdd] = useState(false);
    const [showModalEditPreparation, setShowModalEditPreparation] = useState(false);
    const [selectedCut, setSelectedCut] = useState({ cut: 'Costillas', quantity: 100, price: 130, image: Imagen, preparationType: { preparation: "Asadas", cost: 20 } });

    const [previewImage, setPreviewImage] = useState(null);

    const handleModalToggle = () => {
        setShowModal(!showModal);
        setShowOffcanvas(false)
    }

    const handleEditModalToggle = () => {
        setShowModalEdit(!showModalEdit);
        setShowOffcanvas(false)
        formik.setValues({ cut: selectedCut.cut, quantity: selectedCut.quantity, price: selectedCut.price });
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

    const handleOpenOffcanvas = () => { 
        setShowOffcanvas(true);
    };

    const formik = useFormik({
        initialValues: {
            cut: '',
            quantity: '',
            price: '',
            image: null,
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
                <h2 className='text-4xl font-semibold '>Inventorio</h2>
            </div>
            <div>
                <div className="grid justify-items-end">
                    <button type="button" onClick={handleAddModalToggle} className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900  mb-4">
                        Añadir Corte
                    </button>
                </div>
            </div>
            <InventoryCard selectedCut={selectedCut} setShowOffcanvas={setShowOffcanvas} showOffcanvas={showOffcanvas} />
            <OffCanvas
                showOffcanvas={showOffcanvas}
                setShowOffcanvas={setShowOffcanvas}
                selectedCut={selectedCut}
                handleModalToggle={handleModalToggle}
                handleEditModalToggle={handleEditModalToggle}
                handleAddModalToggle={handleAddModalToggle}
                handleEditPreparationModalToggle={handleEditPreparationModalToggle}
            />
            <AddPreparationModal showModal={showModal} handleCerrarModal={handleCerrarModal} />
            <EditPreparationModal
                showModalEditPreparation={showModalEditPreparation}
                handleCerrarModalEditPreparation={handleCerrarModalEditPreparation}
                selectedCut={selectedCut}
                handleOpenOffcanvas={handleOpenOffcanvas}
                />
            <EditCutModal
                showModalEdit={showModalEdit}
                handleCerrarModalEdit={handleCerrarModalEdit}
                selectedCut={selectedCut}
                handleImageUpload={handleImageUpload}
            />
            <AddCutModal
                showModalAdd={showModalAdd}
                handleCerrarModalAdd={handleCerrarModalAdd}
                formik={formik}
                handleImageUpload={handleImageUpload}
            />
        </div>
    );
}

export default Inventory;
