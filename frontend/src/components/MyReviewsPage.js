import React from 'react';
import { reviews as initialReviewsData } from '../mock/reviews'; // Importar reseñas iniciales con alias
import { properties } from '../mock/properties';
import { currentUser } from '../mock/users';
import { formatDate, truncateText } from '../utils/formatters';
import RatingStars from './RatingStars';

const MyReviewsPage = ({ setCurrentPage, userReviews: appUserReviews }) => {
  // Usar las reseñas pasadas por props desde App.js
  // Asegurar que appUserReviews sea un array antes de filtrar
  const userReviews = Array.isArray(appUserReviews) ? appUserReviews.filter(review => review.userId === currentUser.id) : []; 
  
  // Función para encontrar la propiedad asociada a una reseña
  const getPropertyForReview = (review) => {
    // Si la reseña tiene propertyId (propiedad existente)
    if (review.propertyId) {
      return properties.find(p => p.id === review.propertyId);
    } 
    // Si la reseña tiene addressData (propiedad nueva ingresada manualmente)
    else if (review.addressData) {
      // Crear un objeto de propiedad simulado basado en la dirección
      return {
        id: `new-${review.id}`, // ID único para propiedades nuevas
        title: `Propiedad en ${review.addressData.calle} ${review.addressData.altura}`,
        location: `${review.addressData.nombre}, ${review.addressData.municipio}, ${review.addressData.provincia}`,
        address: `${review.addressData.calle} ${review.addressData.altura}${review.addressData.numeroPiso ? ', ' + review.addressData.numeroPiso : ''}`, // Incluir número/piso si existe
        imageUrl: "https://images.unsplash.com/photo-1580582932707-520ada02fd56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80", // Imagen genérica
        bedrooms: null, // Datos no disponibles para propiedades nuevas
        bathrooms: null,
        area: null,
        price: review.rentalPrice, // Usar el precio de la reseña
        owner: 'Propietario no especificado',
        ownerRating: null,
        propertyRating: review.rating, // Usar la calificación calculada de la reseña
        reviews: [review] // Incluir solo esta reseña
      };
    }
    return null; // No mostrar si no hay propertyId ni addressData
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mis Reseñas</h1>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          {userReviews.length === 0 ? (
            <div className="text-center py-8">
              <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
              <h3 className="text-xl font-semibold mb-2">Aún no has publicado ninguna reseña</h3>
              <p className="text-gray-600 mb-6">
                Comparte tu experiencia alquilando propiedades para ayudar a otros inquilinos.
              </p>
              <button
                onClick={() => setCurrentPage('addReview')}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Calificar una propiedad
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {userReviews.map(review => {
                const property = getPropertyForReview(review);
                if (!property) return null; // No mostrar si la property no se encuentra
                
                return (
                  <div key={review.id} className="border-b border-gray-200 pb-8 last:border-b-0">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-start">
                        <img 
                          src={property.imageUrl} 
                          alt={property.title} 
                          className="w-20 h-20 object-cover rounded-lg mr-4"
                        />
                        <div>
                          <h3 className="text-xl font-semibold text-gray-800 mb-1">{property.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{property.address}</p>
                          <div className="flex items-center">
                            <RatingStars rating={review.rating} size="sm" />
                            <span className="ml-2 text-sm text-gray-500">{formatDate(review.date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                          </svg>
                        </button>
                      </div>
                    </div>
                    
                    <h4 className="font-medium mb-2">{review.title}</h4>
                    <p className="text-gray-700 mb-4">{truncateText(review.comment, 200)}</p>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {review.pros && review.pros.filter(p => p.trim() !== '').map((pro, index) => (
                        <span key={`pro-${index}`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          {pro}
                        </span>
                      ))}
                      
                      {review.cons && review.cons.filter(c => c.trim() !== '').map((con, index) => (
                        <span key={`con-${index}`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                          </svg>
                          {con}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <span className="text-gray-600 mr-2">¿Recomendaría esta propiedad?</span>
                      {review.wouldRecommend ? (
                        <span className="text-green-600 font-medium">Sí</span>
                      ) : (
                        <span className="text-red-600 font-medium">No</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyReviewsPage;

// DONE