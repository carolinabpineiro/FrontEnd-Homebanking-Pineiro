import React from 'react';
import Swal from 'sweetalert2';
import '@sweetalert2/theme-dark/dark.css'; // Puedes elegir un tema diferente si lo prefieres

const CustomAlert = ({ title, text, onConfirm }) => {
  const showAlert = () => {
    Swal.fire({
      title: title || 'Error!',
      text: text || 'Something went wrong.',
      icon: 'error',
      confirmButtonText: 'OK',
      customClass: {
        container: 'custom-swal', // Aplica clases personalizadas si es necesario
      },
      buttonsStyling: false, // Evita que SweetAlert2 sobreescriba el estilo del botón
    }).then((result) => {
      if (result.isConfirmed && onConfirm) {
        onConfirm();
      }
    });
  };

  // Llama a showAlert cuando el componente se monte
  React.useEffect(() => {
    showAlert();
  }, []);

  return null; // No renderiza nada en el DOM
};

export default CustomAlert;