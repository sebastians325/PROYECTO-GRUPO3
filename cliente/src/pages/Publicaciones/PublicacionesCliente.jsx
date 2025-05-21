import React from 'react';

function PublicacionesCliente({
  publicaciones,
  postulantesPorPublicacion,
  cambiarEstadoPublicacion,
  aceptarPostulante,
  loading,
  error,
}) {
  if (loading) return <p>Cargando publicaciones...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (publicaciones.length === 0) return <p>No has creado publicaciones todavía.</p>;

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold mb-2">Mis Publicaciones</h3>
      {publicaciones.map(pub => (
        <div key={pub.id} className="border p-4 rounded shadow">
          <h4 className="text-lg font-bold">{pub.titulo}</h4>
          <p>{pub.descripcion}</p>
          <p className="font-semibold">Pago: ${pub.pago}</p>
          <p>Estado: {pub.estado}</p>

          {/* Cambiar estado manual */}
          <div className="my-2">
            <label className="mr-2 font-semibold">Cambiar estado:</label>
            <select
              value={pub.estado}
              onChange={e => cambiarEstadoPublicacion(pub.id, e.target.value)}
              className="border rounded px-2 py-1"
              disabled={pub.estado !== 'abierto'}
            >
              <option value="abierto">Abierto</option>
              <option value="en_proceso">En proceso</option>
              <option value="cerrado">Cerrado</option>
            </select>
          </div>

          {/* Postulantes */}
          <div className="mt-4">
            <h5 className="font-semibold mb-2">Postulantes:</h5>
            {postulantesPorPublicacion[pub.id]?.length === 0 ? (
              <p>No hay postulantes aún.</p>
            ) : (
              <ul className="space-y-2">
                {postulantesPorPublicacion[pub.id]?.map(post => (
                  <li
                    key={post.id}
                    className="border p-2 rounded flex justify-between items-center"
                  >
                    <div>
                      {post.freelancer?.nombre} {post.freelancer?.apellido} - Estado: {post.estado}
                    </div>
                    {post.estado === 'pendiente' && pub.estado === 'abierto' && (
                      <button
                        onClick={() => aceptarPostulante(post.id, pub.id)}
                        className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                      >
                        Aceptar
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default PublicacionesCliente;
