import React, { useState } from 'react';
import { priceRankings } from '../mock/properties';
import { formatPrice } from '../utils/formatters';

const RankingsPage = () => {
  const [selectedCity, setSelectedCity] = useState('Buenos Aires');
  
  // Obtener las ciudades disponibles
  const cities = Object.keys(priceRankings);
  
  // Obtener los barrios de la ciudad seleccionada
  const neighborhoods = selectedCity ? Object.keys(priceRankings[selectedCity]) : [];

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Rankings de precios por ubicación</h1>
      
      <div className="bg-white rounded-xl shadow-md p-6 mb-8">
        <p className="text-gray-600 mb-6">
          Consulta los precios promedio de alquiler en diferentes zonas para tomar decisiones informadas.
          Estos datos se actualizan mensualmente basados en las propiedades listadas en AlquiRate.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="w-full md:w-1/3">
            <label htmlFor="city" className="block text-gray-700 font-medium mb-2">Selecciona una ciudad</label>
            <select
              id="city"
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {cities.map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-6 bg-gray-50 border-b">
          <h2 className="text-xl font-semibold">Precios en {selectedCity}</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Barrio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Promedio</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Mínimo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Precio Máximo</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tendencia</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comparación</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {neighborhoods.map(neighborhood => {
                const data = priceRankings[selectedCity][neighborhood];
                return (
                  <tr key={neighborhood} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{neighborhood}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 font-semibold">{formatPrice(data.averagePrice)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(data.minPrice)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatPrice(data.maxPrice)}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {data.trend === 'up' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                          </svg>
                          Subiendo
                        </span>
                      )}
                      {data.trend === 'down' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                          </svg>
                          Bajando
                        </span>
                      )}
                      {data.trend === 'stable' && (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14"></path>
                          </svg>
                          Estable
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{data.comparison}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      
      <div className="mt-8 bg-white rounded-xl shadow-md p-6">
        <h2 className="text-xl font-semibold mb-4">Consejos para interpretar los precios</h2>
        <ul className="space-y-2 text-gray-600">
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Compara siempre el precio con la calificación de la propiedad y del propietario.</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Ten en cuenta que los precios pueden variar según el tamaño, antigüedad y estado de la propiedad.</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Las tendencias de precios pueden ayudarte a negociar mejor o a decidir el momento adecuado para mudarte.</span>
          </li>
          <li className="flex items-start">
            <svg className="w-5 h-5 mr-2 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Si un precio está muy por debajo del promedio, investiga más a fondo antes de tomar una decisión.</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default RankingsPage;