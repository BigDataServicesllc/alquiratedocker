import React, { useState, useEffect } from 'react';

const PropertyQuestionnaire = ({ reviewData, onSubmit, onBack, calculateRating }) => {
  const [formData, setFormData] = useState(reviewData);
  const [errors, setErrors] = useState({});
  const [currentSection, setCurrentSection] = useState(1);
  
  // Sincronizar formData con reviewData inicial
  useEffect(() => {
    setFormData(reviewData);
  }, [reviewData]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    
    // Convertir valores booleanos para radio buttons
    if (type === 'radio') {
      if (value === 'true') {
        setFormData({ ...formData, [name]: true });
      } else if (value === 'false') {
        setFormData({ ...formData, [name]: false });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };
  
  const handleSliderChange = (e) => {
    setFormData({ ...formData, probabilidadRecomendacion: parseInt(e.target.value) });
  };
  
  const handleProChange = (index, value) => {
    const updatedPros = [...formData.pros];
    updatedPros[index] = value;
    setFormData({
      ...formData,
      pros: updatedPros
    });
  };
  
  const handleConChange = (index, value) => {
    const updatedCons = [...formData.cons];
    updatedCons[index] = value;
    setFormData({
      ...formData,
      cons: updatedCons
    });
  };
  
  const addPro = () => {
    setFormData({
      ...formData,
      pros: [...formData.pros, '']
    });
  };
  
  const addCon = () => {
    setFormData({
      ...formData,
      cons: [...formData.cons, '']
    });
  };
  
  const removePro = (index) => {
    const updatedPros = formData.pros.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      pros: updatedPros
    });
  };
  
  const removeCon = (index) => {
    const updatedCons = formData.cons.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      cons: updatedCons
    });
  };
  
  const validateSection = (section) => {
    const newErrors = {};
    
    if (section === 1) {
      if (formData.condicionesSatisfactorias === null) 
        newErrors.condicionesSatisfactorias = "Por favor, responde esta pregunta";
      if (formData.contratoOfrecido === null) 
        newErrors.contratoOfrecido = "Por favor, responde esta pregunta";
      if (formData.pagoElectronico === null) 
        newErrors.pagoElectronico = "Por favor, responde esta pregunta";
      if (!formData.monedaPago) 
        newErrors.monedaPago = "Por favor, selecciona una opción";
      if (!formData.rentalPrice || isNaN(formData.rentalPrice) || parseFloat(formData.rentalPrice) <= 0)
         newErrors.rentalPrice = "Ingresa un precio de alquiler válido";
    } else if (section === 2) {
      if (formData.atencionFallas === null) 
        newErrors.atencionFallas = "Por favor, responde esta pregunta";
      if (formData.aptoNinos === null) 
        newErrors.aptoNinos = "Por favor, responde esta pregunta";
      if (formData.admiteMascotas === null) 
        newErrors.admiteMascotas = "Por favor, responde esta pregunta";
      if (!formData.nivelRuido) 
        newErrors.nivelRuido = "Por favor, selecciona una opción";
    } else if (section === 3) {
       if (formData.transporteCercano === null) 
        newErrors.transporteCercano = "Por favor, responde esta pregunta";
      if (formData.recomendaria === null) 
        newErrors.recomendaria = "Por favor, responde esta pregunta";
      // No se valida probabilidadRecomendacion porque siempre tiene un valor por defecto
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNextSection = () => {
    if (validateSection(currentSection)) {
      setCurrentSection(currentSection + 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handlePrevSection = () => {
    setCurrentSection(currentSection - 1);
    window.scrollTo(0, 0);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateSection(currentSection)) {
      // Calcular la calificación antes de enviar
      const calculatedRating = calculateRating(formData);
      
      // Enviar los datos del formulario junto con la calificación calculada
      onSubmit({ ...formData, calculatedRating });
    }
  };
  
  const renderRadioOption = (name, value, label, currentValue, error) => (
    <div key={`${name}-${value}`}>
      <div className="flex items-center space-x-2">
        <input
          type="radio"
          id={`${name}-${value}`}
          name={name}
          value={value}
          checked={currentValue === (value === 'true' ? true : value === 'false' ? false : value)}
          onChange={handleChange}
          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
        />
        <label htmlFor={`${name}-${value}`} className="text-gray-700">{label}</label>
      </div>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
  
  // Calcular el progreso del formulario
  const calculateProgress = () => {
    let totalQuestions = 0;
    let answeredQuestions = 0;
    
    // Sección 1
    if (currentSection >= 1) {
      totalQuestions += 5; // condiciones, contrato, pago, moneda, precio
      if (formData.condicionesSatisfactorias !== null) answeredQuestions++;
      if (formData.contratoOfrecido !== null) answeredQuestions++;
      if (formData.pagoElectronico !== null) answeredQuestions++;
      if (formData.monedaPago !== '') answeredQuestions++;
      if (formData.rentalPrice !== '' && !isNaN(formData.rentalPrice)) answeredQuestions++;
    }
    
    // Sección 2
    if (currentSection >= 2) {
      totalQuestions += 4; // fallas, niños, mascotas, ruido
      if (formData.atencionFallas !== null) answeredQuestions++;
      if (formData.aptoNinos !== null) answeredQuestions++;
      if (formData.admiteMascotas !== null) answeredQuestions++;
      if (formData.nivelRuido !== '') answeredQuestions++;
    }
    
    // Sección 3
    if (currentSection >= 3) {
      totalQuestions += 3; // transporte, recomendaria, probabilidad
      if (formData.transporteCercano !== null) answeredQuestions++;
      if (formData.recomendaria !== null) answeredQuestions++;
      if (formData.probabilidadRecomendacion > 0) answeredQuestions++; // Considerar respondida si es > 0
    }
    
    // Calcular porcentaje
    const progress = totalQuestions > 0 ? (answeredQuestions / totalQuestions) * 100 : 0;
    return Math.round(progress);
  };
  
  const progressPercentage = calculateProgress();

  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Cuestionario sobre la propiedad</h2>
      <p className="text-gray-600 mb-6">
        Por favor, responde las siguientes preguntas sobre tu experiencia con la propiedad.
        Tus respuestas ayudarán a otros inquilinos a tomar decisiones informadas.
      </p>
      
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <span className="text-sm font-medium text-gray-500">Sección {currentSection} de 3</span>
          <span className="text-sm font-medium text-gray-500">{progressPercentage}% completado</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit}>
        {/* Sección 1: Condiciones básicas */}
        {currentSection === 1 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">¿Consideras que las condiciones del inmueble fueron satisfactorias?</label>
              <div className="space-y-2">
                {renderRadioOption('condicionesSatisfactorias', 'true', 'Sí', formData.condicionesSatisfactorias, errors.condicionesSatisfactorias)}
                {renderRadioOption('condicionesSatisfactorias', 'false', 'No', formData.condicionesSatisfactorias, null)}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">¿El arrendador ofreció un contrato de alquiler?</label>
              <div className="space-y-2">
                {renderRadioOption('contratoOfrecido', 'true', 'Sí', formData.contratoOfrecido, errors.contratoOfrecido)}
                {renderRadioOption('contratoOfrecido', 'false', 'No', formData.contratoOfrecido, null)}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">¿Se puede pagar el alquiler con depósito o transferencia bancaria?</label>
              <div className="space-y-2">
                {renderRadioOption('pagoElectronico', 'true', 'Sí', formData.pagoElectronico, errors.pagoElectronico)}
                {renderRadioOption('pagoElectronico', 'false', 'No', formData.pagoElectronico, null)}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">Moneda aceptada para el pago del alquiler</label>
              <select
                name="monedaPago"
                value={formData.monedaPago}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.monedaPago ? 'border-red-500' : 'border-gray-300'}`}
              >
                <option value="">Selecciona una opción</option>
                <option value="Pesos argentinos">Pesos argentinos</option>
                <option value="Dólares americanos">Dólares americanos</option>
                <option value="Euros">Euros</option>
                <option value="Otros">Otros</option>
              </select>
              {errors.monedaPago && <p className="text-red-500 text-sm mt-1">{errors.monedaPago}</p>}
            </div>
            
            {/* Nuevo campo: Precio del alquiler */}
            <div>
              <label htmlFor="rentalPrice" className="block text-gray-700 font-medium mb-2">Precio del alquiler (en Pesos Argentinos)</label>
              <input
                type="number"
                id="rentalPrice"
                name="rentalPrice"
                value={formData.rentalPrice}
                onChange={handleChange}
                placeholder="Ej: 85000"
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.rentalPrice ? 'border-red-500' : 'border-gray-300'}`}
                required
              />
              {errors.rentalPrice && <p className="text-red-500 text-sm mt-1">{errors.rentalPrice}</p>}
            </div>
          </div>
        )}
        
        {/* Sección 2: Características y mantenimiento */}
        {currentSection === 2 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">¿El dueño atendió las fallas de la propiedad en tiempo y forma?</label>
              <div className="space-y-2">
                {renderRadioOption('atencionFallas', 'true', 'Sí', formData.atencionFallas, errors.atencionFallas)}
                {renderRadioOption('atencionFallas', 'false', 'No', formData.atencionFallas, null)}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">¿Consideras que el lugar es apto para niños?</label>
              <div className="space-y-2">
                {renderRadioOption('aptoNinos', 'true', 'Sí', formData.aptoNinos, errors.aptoNinos)}
                {renderRadioOption('aptoNinos', 'false', 'No', formData.aptoNinos, null)}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">¿Se admiten mascotas en la propiedad?</label>
              <div className="space-y-2">
                {renderRadioOption('admiteMascotas', 'true', 'Sí', formData.admiteMascotas, errors.admiteMascotas)}
                {renderRadioOption('admiteMascotas', 'false', 'No', formData.admiteMascotas, null)}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">¿Cómo calificarías las condiciones de ruido en la propiedad?</label>
              <div className="space-y-2">
                {renderRadioOption('nivelRuido', 'Buenas', 'Buenas', formData.nivelRuido, errors.nivelRuido)}
                {renderRadioOption('nivelRuido', 'Regulares', 'Regulares', formData.nivelRuido, null)}
                {renderRadioOption('nivelRuido', 'Malas', 'Malas', formData.nivelRuido, null)}
              </div>
            </div>
          </div>
        )}
        
        {/* Sección 3: Recomendación y comentarios */}
        {currentSection === 3 && (
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-medium mb-2">¿Hay medios de transporte cercanos, como buses o metro?</label>
              <div className="space-y-2">
                {renderRadioOption('transporteCercano', 'true', 'Sí', formData.transporteCercano, errors.transporteCercano)}
                {renderRadioOption('transporteCercano', 'false', 'No', formData.transporteCercano, null)}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">¿Recomendarías este lugar como un buen lugar para vivir?</label>
              <div className="space-y-2">
                {renderRadioOption('recomendaria', 'true', 'Sí', formData.recomendaria, errors.recomendaria)}
                {renderRadioOption('recomendaria', 'false', 'No', formData.recomendaria, null)}
              </div>
            </div>
            
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                En una escala del 1 al 10, ¿qué tan probable es que recomiendes esta propiedad a un familiar o conocido para alquilar?
              </label>
              <div className="mt-2">
                <input
                  type="range"
                  min="1"
                  max="10"
                  step="1"
                  value={formData.probabilidadRecomendacion}
                  onChange={handleSliderChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>1</span>
                  <span>2</span>
                  <span>3</span>
                  <span>4</span>
                  <span>5</span>
                  <span>6</span>
                  <span>7</span>
                  <span>8</span>
                  <span>9</span>
                  <span>10</span>
                </div>
                <div className="text-center mt-2 font-medium">
                  {formData.probabilidadRecomendacion} / 10
                </div>
              </div>
            </div>
            
            <div>
              <label htmlFor="comentarioAdicional" className="block text-gray-700 font-medium mb-2">
                ¿Hay algo más que quieras compartir sobre tu experiencia? (opcional)
              </label>
              <textarea
                id="comentarioAdicional"
                name="comentarioAdicional"
                value={formData.comentarioAdicional}
                onChange={handleChange}
                rows="4"
                placeholder="Comparte detalles adicionales que puedan ser útiles para otros inquilinos..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              ></textarea>
            </div>
            
            {/* Campos de Pros y Cons */}
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Aspectos positivos</label>
              {formData.pros.map((pro, index) => (
                <div key={`pro-${index}`} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={pro}
                    onChange={(e) => handleProChange(index, e.target.value)}
                    placeholder="Ej: Buena ubicación"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.pros.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removePro(index)}
                      className="ml-2 text-red-500 hover:text-red-800"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button"
                onClick={addPro}
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Agregar otro aspecto positivo
              </button>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Aspectos negativos</label>
              {formData.cons.map((con, index) => (
                <div key={`con-${index}`} className="flex items-center mb-2">
                  <input
                    type="text"
                    value={con}
                    onChange={(e) => handleConChange(index, e.target.value)}
                    placeholder="Ej: Problemas con la calefacción"
                    className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {formData.cons.length > 1 && (
                    <button 
                      type="button"
                      onClick={() => removeCon(index)}
                      className="ml-2 text-red-500 hover:text-red-800"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                      </svg>
                    </button>
                  )}
                </div>
              ))}
              <button 
                type="button"
                onClick={addCon}
                className="text-blue-600 hover:text-blue-800 font-semibold flex items-center"
              >
                <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
                </svg>
                Agregar otro aspecto negativo
              </button>
            </div>
            
            {/* Campo de Período de alquiler */}
            <div className="mb-6">
              <label htmlFor="rentalPeriod" className="block text-gray-700 font-medium mb-2">Período de alquiler</label>
              <select
                id="rentalPeriod"
                name="rentalPeriod"
                value={formData.rentalPeriod}
                onChange={handleChange}
                className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.rentalPeriod ? 'border-red-500' : 'border-gray-300'}`}
                required
              >
                <option value="">Selecciona un período</option>
                <option value="Menos de 3 meses">Menos de 3 meses</option>
                <option value="3-6 meses">3-6 meses</option>
                <option value="6-12 meses">6-12 meses</option>
                <option value="1-2 años">1-2 años</option>
                <option value="Más de 2 años">Más de 2 años</option>
              </select>
              {errors.rentalPeriod && <p className="text-red-500 text-sm mt-1">{errors.rentalPeriod}</p>}
            </div>
          </div>
        )}
        
        <div className="flex justify-between mt-8">
          {currentSection > 1 ? (
            <button
              type="button"
              onClick={handlePrevSection}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Anterior
            </button>
          ) : (
            <button
              type="button"
              onClick={onBack}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Volver
            </button>
          )}
          
          {currentSection < 3 ? (
            <button
              type="button"
              onClick={handleNextSection}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Siguiente
            </button>
          ) : (
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Enviar calificación
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default PropertyQuestionnaire;

// DONE