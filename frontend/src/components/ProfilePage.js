import React, { useState } from 'react';
import { currentUser } from '../mock/users'; // Importar currentUser
import { formatDate } from '../utils/formatters';

const ProfilePage = ({ setCurrentPage }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser.name,
    email: currentUser.email,
    // Agrega más campos de perfil si los tienes en mock/users.js
    // phone: currentUser.phone,
    // address: currentUser.address,
    // city: currentUser.city,
  });
  
  const [errors, setErrors] = useState({});

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    // Resetear formulario si cancela la edición
    if (isEditing) {
      setFormData({
        name: currentUser.name,
        email: currentUser.email,
        // phone: currentUser.phone,
        // address: currentUser.address,
        // city: currentUser.city,
      });
      setErrors({});
    }
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'El nombre es obligatorio';
    if (!formData.email.trim()) {
      newErrors.email = 'El email es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'El email no es válido';
    }
    // Agrega validaciones para otros campos si es necesario
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      // Aquí iría la lógica para guardar los cambios en el backend
      console.log('Guardando cambios de perfil:', formData);
      setIsEditing(false);
      // En una app real, actualizarías el estado global del usuario aquí
    }
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Mi Perfil</h1>
        
        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center mb-8">
            {/* Usar currentUser para la foto y el nombre */}
            <img 
              src={currentUser.profilePicture} 
              alt="Foto de perfil" 
              className="w-24 h-24 rounded-full object-cover mr-6"
            />
            <div>
              <h2 className="text-2xl font-semibold text-gray-800">{currentUser.name}</h2>
              <p className="text-gray-600">Miembro desde: {formatDate(currentUser.memberSince)}</p>
              <p className="text-gray-600">Reseñas publicadas: {currentUser.reviewsCount}</p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Información de la cuenta</h3>
              <button
                onClick={handleEditToggle}
                className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                </svg>
                {isEditing ? 'Cancelar' : 'Editar'}
              </button>
            </div>
            
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 font-medium mb-1">Nombre completo</label>
                {isEditing ? (
                  <>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </>
                ) : (
                  <p className="text-gray-800">{currentUser.name}</p>
                )}
              </div>
              
              <div>
                <label className="block text-gray-700 font-medium mb-1">Correo electrónico</label>
                 {isEditing ? (
                  <>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </>
                ) : (
                  <p className="text-gray-800">{currentUser.email}</p>
                )}
              </div>
              
              {/* Agrega más campos aquí si los tienes en mock/users.js */}
              {/* <div>
                <label className="block text-gray-700 font-medium mb-1">Teléfono</label>
                 {isEditing ? (
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-800">{currentUser.phone || 'No especificado'}</p>
                )}
              </div> */}
            </div>
            
            {isEditing && (
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Guardar cambios
                </button>
              </div>
            )}
          </div>
          
          <div className="border-t border-gray-200 pt-8 mt-8">
             <h3 className="text-xl font-semibold mb-6">Otras secciones</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <button
                 onClick={() => setCurrentPage('myReviews')}
                 className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 px-6 py-4 rounded-lg transition-colors"
               >
                 <span className="font-medium text-gray-700">Mis Reseñas</span>
                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                 </svg>
               </button>
               <button
                 onClick={() => setCurrentPage('favorites')}
                 className="flex items-center justify-between bg-gray-100 hover:bg-gray-200 px-6 py-4 rounded-lg transition-colors"
               >
                 <span className="font-medium text-gray-700">Mis Favoritos</span>
                 <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                 </svg>
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;