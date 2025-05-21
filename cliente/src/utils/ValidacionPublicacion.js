//S 
// utils/ValidacionPublicacion.js
export const validarFormularioPublicacion = (formData) => {
  const errores = {};

  if (!formData.titulo.trim()) {
    errores.titulo = 'El título es obligatorio.';
  }

  if (!formData.descripcion.trim()) {
    errores.descripcion = 'La descripción es obligatoria.';
  }

  if (!formData.pago || isNaN(formData.pago) || parseFloat(formData.pago) <= 0) {
    errores.pago = 'El pago debe ser un número positivo.';
  }

  return errores;
};

