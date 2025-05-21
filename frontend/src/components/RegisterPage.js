import React, { useState } from 'react';

const RegisterPage = ({ setCurrentPage, onRegister }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Datos personales
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    // Datos de contacto
    phone: '',
    address: '',
    city: '',
    // Preferencias
    userType: 'inquilino', // inquilino o propietario
    notifications: true,
    termsAccepted: false
  });
  
  const [errors, setErrors] = useState({});
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateStep = (step) => {
    const newErrors = {};
    
    if (step === 1) {
      if (!formData.firstName.trim()) newErrors.firstName = 'El nombre es obligatorio';
      if (!formData.lastName.trim()) newErrors.lastName = 'El apellido es obligatorio';
      if (!formData.email.trim()) {
        newErrors.email = 'El email es obligatorio';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'El email no es válido';
      }
      if (!formData.password) {
        newErrors.password = 'La contraseña es obligatoria';
      } else if (formData.password.length < 8) {
        newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    } else if (step === 2) {
      if (!formData.phone.trim()) newErrors.phone = 'El teléfono es obligatorio';
      if (!formData.city.trim()) newErrors.city = 'La ciudad es obligatoria';
    } else if (step === 3) {
      if (!formData.termsAccepted) {
        newErrors.termsAccepted = 'Debes aceptar los términos y condiciones';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateStep(step)) {
      onRegister(formData);
    }
  };
  
  return (
    <div className="container mx-auto px-4 py-20">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Crear una cuenta en AlquiRate</h1>
        
        {/* Barra de progreso */}
        {step < 4 && (
          <div className="mb-8">
            <div className="flex justify-between mb-2">
              <span className="text-sm font-medium text-gray-500">Paso {step} de 3</span>
              <span className="text-sm font-medium text-gray-500">{Math.round((step / 3) * 100)}% completado</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${(step / 3) * 100}%` }}
              ></div>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-xl shadow-md p-8">
          {/* Paso 1: Datos personales */}
          {step === 1 && (
            <>
              <h2 className="text-xl font-semibold mb-6">Información personal</h2>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-gray-700 font-medium mb-2">Nombre</label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="lastName" className="block text-gray-700 font-medium mb-2">Apellido</label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Correo electrónico</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                
                <div>
                  <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  <p className="text-gray-500 text-sm mt-1">La contraseña debe tener al menos 8 caracteres</p>
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirmar contraseña</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.confirmPassword ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
              
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
          
          {/* Paso 2: Datos de contacto */}
          {step === 2 && (
            <>
              <h2 className="text-xl font-semibold mb-6">Información de contacto</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Teléfono</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>
                
                <div>
                  <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Dirección (opcional)</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                
                <div>
                  <label htmlFor="city" className="block text-gray-700 font-medium mb-2">Ciudad</label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.city ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Anterior
                </button>
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Siguiente
                </button>
              </div>
            </>
          )}
          
          {/* Paso 3: Preferencias */}
          {step === 3 && (
            <form onSubmit={handleSubmit}>
              <h2 className="text-xl font-semibold mb-6">Preferencias</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-medium mb-2">¿Cómo utilizarás AlquiRate?</label>
                  <div className="space-y-2">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="userType"
                        value="inquilino"
                        checked={formData.userType === 'inquilino'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Como inquilino (busco propiedades para alquilar)</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="userType"
                        value="propietario"
                        checked={formData.userType === 'propietario'}
                        onChange={handleChange}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="ml-2 text-gray-700">Como propietario (tengo propiedades para alquilar)</span>
                    </label>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="notifications"
                      checked={formData.notifications}
                      onChange={handleChange}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 rounded"
                    />
                    <span className="ml-2 text-gray-700">Quiero recibir notificaciones sobre nuevas propiedades y actualizaciones</span>
                  </label>
                </div>
                
                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="termsAccepted"
                      checked={formData.termsAccepted}
                      onChange={handleChange}
                      className={`h-4 w-4 text-blue-600 focus:ring-blue-500 rounded mt-1 ${errors.termsAccepted ? 'border-red-500' : ''}`}
                    />
                    <span className="ml-2 text-gray-700">
                      Acepto los <a href="#" className="text-blue-600 hover:underline">Términos y Condiciones</a> y la <a href="#" className="text-blue-600 hover:underline">Política de Privacidad</a> de AlquiRate
                    </span>
                  </label>
                  {errors.termsAccepted && <p className="text-red-500 text-sm mt-1">{errors.termsAccepted}</p>}
                </div>
              </div>
              
              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={handlePrevStep}
                  className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Anterior
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Completar registro
                </button>
              </div>
            </form>
          )}
        </div>
        
        {/* Enlace para iniciar sesión */}
        {step < 4 && (
          <div className="mt-6 text-center">
            <p className="text-gray-600">
              ¿Ya tienes una cuenta? 
              <button 
                onClick={() => setCurrentPage('login')}
                className="ml-1 text-blue-600 hover:underline font-medium"
              >
                Iniciar sesión
              </button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterPage;