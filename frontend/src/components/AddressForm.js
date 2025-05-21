import React, { useState, useEffect } from 'react';

const AddressForm = ({ addressData, onSubmit, onBack }) => {
  const [formData, setFormData] = useState(addressData);
  const [errors, setErrors] = useState({});
  
  // Datos de ejemplo para los selectores (ampliados)
  const provincias = ["Ciudad Autónoma de Buenos Aires", "Buenos Aires", "Córdoba", "Santa Fe", "Mendoza"];
  
  const departamentos = {
    "Ciudad Autónoma de Buenos Aires": ["Comuna 1", "Comuna 2", "Comuna 3", "Comuna 4", "Comuna 5", "Comuna 6", "Comuna 7", "Comuna 8", "Comuna 9", "Comuna 10", "Comuna 11", "Comuna 12", "Comuna 13", "Comuna 14", "Comuna 15"],
    "Buenos Aires": ["La Plata", "Mar del Plata", "Bahía Blanca", "Quilmes", "Lanús", "Tigre", "San Isidro", "Vicente López", "Lomas de Zamora", "Morón"],
    "Córdoba": ["Capital", "Río Cuarto", "Villa María", "San Francisco", "Jesús María", "Carlos Paz", "Alta Gracia"],
    "Santa Fe": ["Rosario", "Santa Fe", "Rafaela", "Venado Tuerto", "Reconquista", "Santo Tomé", "Esperanza"],
    "Mendoza": ["Capital", "Godoy Cruz", "Guaymallén", "Las Heras", "Luján de Cuyo", "Maipú", "San Rafael"]
  };
  
  const municipios = {
    "Comuna 1": ["Comuna 1"], "Comuna 2": ["Comuna 2"], "Comuna 3": ["Comuna 3"], "Comuna 4": ["Comuna 4"], "Comuna 5": ["Comuna 5"], "Comuna 6": ["Comuna 6"], "Comuna 7": ["Comuna 7"], "Comuna 8": ["Comuna 8"], "Comuna 9": ["Comuna 9"], "Comuna 10": ["Comuna 10"], "Comuna 11": ["Comuna 11"], "Comuna 12": ["Comuna 12"], "Comuna 13": ["Comuna 13"], "Comuna 14": ["Comuna 14"], "Comuna 15": ["Comuna 15"],
    "La Plata": ["La Plata"], "Mar del Plata": ["General Pueyrredón"], "Bahía Blanca": ["Bahía Blanca"], "Quilmes": ["Quilmes"], "Lanús": ["Lanús"], "Tigre": ["Tigre"], "San Isidro": ["San Isidro"], "Vicente López": ["Vicente López"], "Lomas de Zamora": ["Lomas de Zamora"], "Morón": ["Morón"],
    "Capital": ["Córdoba"], "Río Cuarto": ["Río Cuarto"], "Villa María": ["Villa María"], "San Francisco": ["San Francisco"], "Jesús María": ["Jesús María"], "Carlos Paz": ["San Antonio de Arredondo"], "Alta Gracia": ["Alta Gracia"],
    "Rosario": ["Rosario"], "Santa Fe": ["Santa Fe"], "Rafaela": ["Rafaela"], "Venado Tuerto": ["Venado Tuerto"], "Reconquista": ["Reconquista"], "Santo Tomé": ["Santo Tomé"], "Esperanza": ["Esperanza"],
    "Capital": ["Mendoza"], "Godoy Cruz": ["Godoy Cruz"], "Guaymallén": ["Guaymallén"], "Las Heras": ["Las Heras"], "Luján de Cuyo": ["Luján de Cuyo"], "Maipú": ["Maipú"], "San Rafael": ["San Rafael"]
  };
  
  const barrios = {
    "Comuna 1": ["Retiro", "San Nicolás", "Puerto Madero", "San Telmo", "Montserrat", "Constitución"],
    "Comuna 2": ["Recoleta"],
    "Comuna 3": ["Balvanera", "San Cristóbal"],
    "Comuna 4": ["La Boca", "Barracas", "Parque Patricios", "Nueva Pompeya"],
    "Comuna 5": ["Almagro", "Boedo"],
    "Comuna 6": ["Caballito"],
    "Comuna 7": ["Flores", "Parque Chacabuco"],
    "Comuna 8": ["Villa Soldati", "Villa Lugano", "Villa Riachuelo"],
    "Comuna 9": ["Parque Avellaneda", "Liniers", "Mataderos"],
    "Comuna 10": ["Villa Real", "Monte Castro", "Versalles", "Floresta", "Vélez Sarsfield", "Devoto"], // Agregado Devoto aquí
    "Comuna 11": ["Villa Devoto", "Villa del Parque", "Villa Santa Rita", "Villa General Mitre"], // Mantenemos Devoto aquí también por si acaso
    "Comuna 12": ["Coghlan", "Saavedra", "Villa Urquiza", "Villa Pueyrredón"],
    "Comuna 13": ["Núñez", "Belgrano", "Colegiales"],
    "Comuna 14": ["Palermo"],
    "Comuna 15": ["Chacarita", "Villa Crespo", "Paternal", "Villa Ortúzar", "Agronomía", "Parque Chas"],
    "La Plata": ["Centro", "La Loma", "Los Hornos", "Tolosa", "City Bell", "Gonnet", "Villa Elisa"],
    "Córdoba": ["Centro", "Alberdi", "Alta Córdoba", "Güemes", "Nueva Córdoba", "Cerro de las Rosas", "General Paz"],
    "Rosario": ["Centro", "Pichincha", "Fisherton", "Arroyito", "Echesortu", "Abasto"],
    "Mendoza": ["Centro", "Quinta Sección", "Sexta Sección", "Bombal", "Chacras de Coria", "Dorrego"],
    // Agrega más barrios para otros municipios/departamentos si es necesario
  };
  
  // Efecto para actualizar los selectores dependientes
  useEffect(() => {
    // Si cambia la provincia, resetear departamento, municipio y barrio
    if (!provincias.includes(formData.provincia)) {
      setFormData(prev => ({ ...prev, departamento: '', municipio: '', nombre: '' }));
    } else if (formData.provincia && !departamentos[formData.provincia]?.includes(formData.departamento)) {
       setFormData(prev => ({ ...prev, departamento: '', municipio: '', nombre: '' }));
    } else if (formData.departamento && !municipios[formData.departamento]?.includes(formData.municipio)) {
       setFormData(prev => ({ ...prev, municipio: '', nombre: '' }));
    } else if (formData.municipio && !barrios[formData.municipio]?.includes(formData.nombre)) {
       setFormData(prev => ({ ...prev, nombre: '' }));
    }
  }, [formData.provincia, formData.departamento, formData.municipio]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Limpiar error cuando el usuario comienza a escribir
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.provincia) newErrors.provincia = "Selecciona una provincia";
    if (!formData.departamento) newErrors.departamento = "Selecciona un departamento";
    if (!formData.municipio) newErrors.municipio = "Selecciona un municipio";
    if (!formData.nombre) newErrors.nombre = "Selecciona un barrio";
    if (!formData.calle.trim()) newErrors.calle = "Ingresa el nombre de la calle";
    if (!formData.altura.trim()) newErrors.altura = "Ingresa la altura";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };
  
  // Obtener opciones de departamento, municipio y barrio basadas en selecciones previas
  const departamentoOptions = formData.provincia ? departamentos[formData.provincia] || [] : [];
  const municipioOptions = formData.departamento ? municipios[formData.departamento] || [] : [];
  const barrioOptions = formData.municipio ? barrios[formData.municipio] || [] : [];

  
  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Ingresa la dirección de la propiedad</h2>
      <p className="text-gray-600 mb-6">
        Por favor, completa todos los campos para identificar correctamente la propiedad que deseas calificar.
      </p>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="provincia" className="block text-gray-700 font-medium mb-2">Provincia</label>
            <select
              id="provincia"
              name="provincia"
              value={formData.provincia}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.provincia ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Selecciona una provincia</option>
              {provincias.map(provincia => (
                <option key={provincia} value={provincia}>{provincia}</option>
              ))}
            </select>
            {errors.provincia && <p className="text-red-500 text-sm mt-1">{errors.provincia}</p>}
          </div>
          
          <div>
            <label htmlFor="departamento" className="block text-gray-700 font-medium mb-2">Departamento/Partido</label>
            <select
              id="departamento"
              name="departamento"
              value={formData.departamento}
              onChange={handleChange}
              disabled={!formData.provincia}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.departamento ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Selecciona un departamento/partido</option>
              {departamentoOptions.map(depto => (
                <option key={depto} value={depto}>{depto}</option>
              ))}
            </select>
            {errors.departamento && <p className="text-red-500 text-sm mt-1">{errors.departamento}</p>}
          </div>
          
          <div>
            <label htmlFor="municipio" className="block text-gray-700 font-medium mb-2">Municipio</label>
            <select
              id="municipio"
              name="municipio"
              value={formData.municipio}
              onChange={handleChange}
              disabled={!formData.departamento}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.municipio ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Selecciona un municipio</option>
              {municipioOptions.map(muni => (
                <option key={muni} value={muni}>{muni}</option>
              ))}
            </select>
            {errors.municipio && <p className="text-red-500 text-sm mt-1">{errors.municipio}</p>}
          </div>
          
          <div>
            <label htmlFor="nombre" className="block text-gray-700 font-medium mb-2">Barrio</label>
            <select
              id="nombre"
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              disabled={!formData.municipio}
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Selecciona un barrio</option>
              {barrioOptions.map(barrio => (
                <option key={barrio} value={barrio}>{barrio}</option>
              ))}
            </select>
            {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
          </div>
          
          <div>
            <label htmlFor="calle" className="block text-gray-700 font-medium mb-2">Calle</label>
            <input
              type="text"
              id="calle"
              name="calle"
              value={formData.calle}
              onChange={handleChange}
              placeholder="Ej: Av. General Mosconi"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.calle ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.calle && <p className="text-red-500 text-sm mt-1">{errors.calle}</p>}
          </div>
          
          <div>
            <label htmlFor="altura" className="block text-gray-700 font-medium mb-2">Altura</label>
            <input
              type="text"
              id="altura"
              name="altura"
              value={formData.altura}
              onChange={handleChange}
              placeholder="Ej: 3644"
              className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${errors.altura ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.altura && <p className="text-red-500 text-sm mt-1">{errors.altura}</p>}
          </div>
          
          <div>
            <label htmlFor="numeroPiso" className="block text-gray-700 font-medium mb-2">Número/Piso (opcional)</label>
            <input
              type="text"
              id="numeroPiso"
              name="numeroPiso" // Cambiado el nombre del campo
              value={formData.numeroPiso}
              onChange={handleChange}
              placeholder="Ej: 1-A"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
        
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={onBack}
            className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Volver
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Continuar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddressForm;