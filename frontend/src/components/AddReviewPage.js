import React from 'react';

const AddReviewPage = ({ onAddReview }) => {
  // Este es un componente placeholder simple por ahora
  // Reincorporaremos el formulario completo más adelante
  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Calificar una propiedad</h1>
      <p className="text-gray-600 mb-4">Esta sección está en desarrollo. Aquí estará el formulario de calificación.</p>
      <button 
        onClick={() => onAddReview({ simulatedData: true })} // Llama a la función placeholder
        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Simular envío de calificación
      </button>
      {/* Puedes agregar un botón para volver al inicio si quieres */}
      {/* <button 
        onClick={() => setCurrentPage('home')}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Volver al inicio
      </button> */}
    </div>
  );
};

export default AddReviewPage;

// DONE