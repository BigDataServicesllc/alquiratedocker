import React, { useState } from 'react';
import { properties } from '../mock/properties';
import { reviews } from '../mock/reviews';
import { formatPrice, formatDate } from '../utils/formatters';
import RatingStars from './RatingStars';

const PropertyDetailPage = ({ propertyId = 1, setCurrentPage }) => {
  const [activeTab, setActiveTab] = useState('overview');
  
  // Encontrar la propiedad por ID
  const property = properties.find(p => p.id === propertyId) || properties[0];
  
  // Filtrar reseñas para esta propiedad
  const propertyReviews = reviews.filter(review => review.propertyId === property.id);
  
  // Características de la propiedad
  const features = [
    { icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6", label: `${property.bedrooms} Dormitorios` },
    { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", label: `${property.bathrooms} Baños` },
    { icon: "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5", label: `${property.area}m²` },
    { icon: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z", label: property.location },
  ];
  
  // Calcular estadísticas de reseñas
  const calculateReviewStats = () => {
    if (propertyReviews.length === 0) return { avg: 0, counts: [0, 0, 0, 0, 0] };
    
    const counts = [0, 0, 0, 0, 0]; // Para 1, 2, 3, 4, 5 estrellas
    let sum = 0;
    
    propertyReviews.forEach(review => {
      const rating = Math.floor(review.rating);
      if (rating >= 1 && rating <= 5) {
        counts[rating - 1]++;
      }
      sum += review.rating;
    });
    
    return {
      avg: sum / propertyReviews.length,
      counts
    };
  };
  
  const reviewStats = calculateReviewStats();

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="mb-6">
        <button
          onClick={() => setCurrentPage('listings')}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Volver a listados
        </button>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        {/* Imagen principal */}
        <div className="relative h-64 md:h-96">
          <img 
            src={property.imageUrl} 
            alt={property.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-lg font-semibold">
            {formatPrice(property.price)}
          </div>
        </div>
        
        {/* Información básica */}
        <div className="p-6">
          <div className="flex flex-col md:flex-row md:justify-between md:items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">{property.title}</h1>
              <p className="text-gray-600 mb-4">{property.address}</p>
              <div className="flex items-center">
                <RatingStars rating={property.propertyRating} size="lg" />
                <span className="ml-2 text-gray-500">({propertyReviews.length} reseñas)</span>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              <div className="flex items-center mb-2">
                <span className="text-gray-700 font-medium">Dueño:</span>
                <span className="ml-2">{property.owner}</span>
              </div>
              <div className="flex items-center">
                <span className="text-gray-700 font-medium">Calificación del dueño:</span>
                <div className="ml-2">
                  <RatingStars rating={property.ownerRating} size="sm" />
                </div>
              </div>
            </div>
          </div>
          
          {/* Características */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center">
                <svg className="w-5 h-5 text-blue-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={feature.icon}></path>
                </svg>
                <span className="text-gray-700">{feature.label}</span>
              </div>
            ))}
          </div>
          
          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('overview')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'overview'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Descripción
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'reviews'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Reseñas ({propertyReviews.length})
              </button>
              <button
                onClick={() => setActiveTab('location')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'location'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Ubicación
              </button>
            </nav>
          </div>
          
          {/* Contenido de las tabs */}
          <div>
            {/* Descripción */}
            {activeTab === 'overview' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Acerca de esta propiedad</h2>
                <p className="text-gray-700 mb-6">{property.description}</p>
                
                <h3 className="text-lg font-semibold mb-3">Características destacadas</h3>
                <ul className="space-y-2 mb-6">
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Excelente ubicación cerca de transporte público</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Cocina completamente equipada</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Seguridad 24 horas</span>
                  </li>
                  <li className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <span>Excelente iluminación natural</span>
                  </li>
                </ul>
                
                <div className="flex justify-center mt-8">
                  <button
                    onClick={() => setCurrentPage('addReview')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
                  >
                    Calificar esta propiedad
                  </button>
                </div>
              </div>
            )}
            
            {/* Reseñas */}
            {activeTab === 'reviews' && (
              <div>
                <div className="flex flex-col md:flex-row md:items-start mb-8">
                  <div className="md:w-1/3 mb-6 md:mb-0">
                    <h2 className="text-xl font-semibold mb-2">Calificaciones y reseñas</h2>
                    <div className="flex items-center mb-4">
                      <RatingStars rating={reviewStats.avg} size="lg" />
                      <span className="ml-2 text-gray-500">({propertyReviews.length} reseñas)</span>
                    </div>
                    
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map(star => {
                        const count = reviewStats.counts[star - 1];
                        const percentage = propertyReviews.length > 0 
                          ? (count / propertyReviews.length) * 100 
                          : 0;
                        
                        return (
                          <div key={star} className="flex items-center">
                            <span className="text-sm text-gray-600 w-8">{star}</span>
                            <svg className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                            </svg>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 mx-2">
                              <div 
                                className="bg-blue-600 h-2.5 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="text-sm text-gray-600 w-8">{count}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  
                  <div className="md:w-2/3 md:pl-8">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-semibold">Reseñas recientes</h3>
                      <button
                        onClick={() => setCurrentPage('addReview')}
                        className="text-blue-600 hover:text-blue-800 font-medium"
                      >
                        Escribir una reseña
                      </button>
                    </div>
                    
                    {propertyReviews.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="text-gray-500">No hay reseñas para esta propiedad todavía. ¡Sé el primero en dejar una!</p>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        {propertyReviews.map(review => (
                          <div key={review.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-start">
                                <div className="mr-4">
                                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-semibold">
                                    {review.userName.charAt(0)}
                                  </div>
                                </div>
                                <div>
                                  <h4 className="font-semibold">{review.userName}</h4>
                                  <div className="flex items-center">
                                    <RatingStars rating={review.rating} size="sm" showNumber={false} />
                                    <span className="ml-2 text-sm text-gray-500">{formatDate(review.date)}</span>
                                  </div>
                                </div>
                              </div>
                              <div className="text-sm text-gray-500">
                                Período de alquiler: {review.rentalPeriod}
                              </div>
                            </div>
                            
                            <h5 className="font-medium mb-2">{review.title}</h5>
                            <p className="text-gray-700 mb-4">{review.comment}</p>
                            
                            <div className="flex flex-wrap gap-2 mb-4">
                              {review.pros.map((pro, index) => (
                                <span key={`pro-${index}`} className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                                  </svg>
                                  {pro}
                                </span>
                              ))}
                              
                              {review.cons.map((con, index) => (
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
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            
            {/* Ubicación */}
            {activeTab === 'location' && (
              <div>
                <h2 className="text-xl font-semibold mb-4">Ubicación</h2>
                <div className="bg-gray-200 rounded-lg h-64 mb-6 flex items-center justify-center">
                  <p className="text-gray-500">Mapa no disponible en esta versión</p>
                </div>
                
                <h3 className="text-lg font-semibold mb-3">Información del barrio</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"></path>
                    </svg>
                    <div>
                      <span className="font-medium">Transporte</span>
                      <p className="text-gray-600">A 5 minutos de la estación de metro</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"></path>
                    </svg>
                    <div>
                      <span className="font-medium">Comercios</span>
                      <p className="text-gray-600">Supermercados y tiendas a menos de 500m</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"></path>
                    </svg>
                    <div>
                      <span className="font-medium">Educación</span>
                      <p className="text-gray-600">Escuelas y universidades cercanas</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"></path>
                    </svg>
                    <div>
                      <span className="font-medium">Entretenimiento</span>
                      <p className="text-gray-600">Parques, restaurantes y cines en la zona</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
                  <h3 className="text-blue-800 font-semibold mb-2">Seguridad en la zona</h3>
                  <p className="text-blue-700">
                    Este barrio tiene una calificación de seguridad media-alta según las estadísticas locales y las opiniones de los residentes.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailPage;

// DONE