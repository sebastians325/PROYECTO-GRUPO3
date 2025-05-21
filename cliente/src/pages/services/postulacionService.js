// src/services/postulacionService.js
export async function aceptarPostulanteAPI(postulacionId) {
  const res = await fetch(`http://localhost:3001/postulaciones/${postulacionId}/aceptar`, {
    method: 'PUT',
  });

  if (!res.ok) {
    throw new Error('Error al aceptar postulante');
  }

  return await res.json();
}
