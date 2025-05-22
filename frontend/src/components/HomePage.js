import React from 'react';
import { motion } from 'framer-motion';

const HomePage = ({ setCurrentPage }) => {
  return (
    <div className="pt-16">
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="text-center max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Tu aliado al alquilar.
          </h1>
          <p className="text-xl md:text-2xl mb-8">
            Calificá propiedades, consultá precios y decidí con datos reales.
          </p>
          <button 
            onClick={() => setCurrentPage('addReview')}
            className="bg-white text-blue-700 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg"
          >
            Calificar una propiedad
          </button>
        </motion.div>
      </section>

      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">¿Cómo funciona AlquiRate?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                iconPath: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z",
                title: "Calificá tu propiedad",
                description:
                  "Contanos cómo fue tu experiencia como inquilino. Valorá al propietario, al inmueble y ayudá a otros a tomar mejores decisiones.",
              },
              {
                iconPath: "M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z",
                title: "Consultá el ranking por zona",
                description:
                  "Mirá qué barrios tienen los mejores precios y calificaciones. Accedé a información real, basada en experiencias reales.",
              },
              {
                iconPath: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z",
                title: "Decidí informado",
                description:
                  "Usá AlquiRate como guía. Leé comentarios, compará zonas y elegí tu próximo alquiler con confianza.",
              },
            ].map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md text-center transition-transform hover:scale-[1.03] duration-300"
              >
                <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={card.iconPath}
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-3">{card.title}</h3>
                <p className="text-gray-600">{card.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-3xl font-bold text-center mb-12">Lo que dicen nuestros usuarios</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://i.pravatar.cc/100?img=12" 
                  alt="Usuario 1" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Laura Fernández</h4>
                  <p className="text-gray-500 text-sm">Buenos Aires</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Gracias a AlquiRate evité alquilar una propiedad con problemas de humedad y logré conseguir un sitio mejor."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="bg-gray-50 p-6 rounded-xl shadow-md"
            >
              <div className="flex items-center mb-4">
                <img 
                  src="https://i.pravatar.cc/100?img=32" 
                  alt="Usuario 2" 
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h4 className="font-semibold">Martín Rodríguez</h4>
                  <p className="text-gray-500 text-sm">Córdoba</p>
                </div>
              </div>
              <p className="text-gray-700 italic">
                "Como estudiante con poco presupuesto, agradezco los comentarios de otros usuarios. Logré conseguir una propiedad que se ajusta a mis necesidades."
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="py-16 px-4 bg-blue-600 text-white"
      >
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="text-3xl font-bold mb-6">¿Has alquilado recientemente?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Compartí tu experiencia y ayudá a otros inquilinos a tomar mejores decisiones.
          </p>
          <button 
            onClick={() => setCurrentPage('addReview')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 rounded-lg text-lg font-semibold transition-colors shadow-lg"
          >
            Calificar una propiedad
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default HomePage;
