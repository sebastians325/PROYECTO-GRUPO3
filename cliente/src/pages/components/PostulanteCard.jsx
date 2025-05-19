// src/components/PostulanteCard.jsx
function PostulanteCard({ postulante, onAceptar, puedeAceptar }) {
  return (
    <li className="border p-2 rounded flex justify-between items-center">
      <div>
        {postulante.freelancer?.nombre} {postulante.freelancer?.apellido} - Estado: {postulante.estado}
      </div>
      {puedeAceptar && (
        <button
          onClick={onAceptar}
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
        >
          Aceptar
        </button>
      )}
    </li>
  );
}

export default PostulanteCard;
