import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const AlertClient = withReactContent(Swal); 


export const confirmAlert = (preConfirm) =>{
    return AlertClient.fire({
        title: '¿Estás seguro de realizar la accion?',
        text: 'le recomendamos que espere a que la solicitud termine!',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
        reverseButtons: true,
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        showLoaderOnConfirm: true,
        allowOutsideClick: () => !AlertClient.isLoading(),
        preConfirm, 
    }); 

}; 