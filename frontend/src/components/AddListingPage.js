import React, { useState } from 'react';

const AddListingPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para guardar el nuevo anuncio
    console.log('Nuevo anuncio:', formData);
    // Reset form or navigate
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h2 className="text-3xl font-bold text-gray-800 mb-8">Publicar Nuevo Anuncio</h2>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md">
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700 font-semibold mb-2">Título</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-semibold mb-2">Descripción</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            rows="4"
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black resize-none"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-semibold mb-2">Precio</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="location" className="block text-gray-700 font-semibold mb-2">Ubicación</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors"
        >
          Publicar Anuncio
        </button>
      </form>
    </div>
  );
};

export default AddListingPage;