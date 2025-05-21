import React, { useState } from 'react';

const LayoutHeader = ({ currentPage, setCurrentPage }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <h1 
              className="text-2xl font-bold text-blue-600 cursor-pointer"
              onClick={() => setCurrentPage('home')}
            >
              Alqui<span className="text-gray-800">Rate</span>
            </h1>
            <nav className="hidden md:block ml-10">
              <ul className="flex space-x-6">
                <li>
                  <button
                    onClick={() => setCurrentPage('home')}
                    className={`text-gray-600 hover:text-blue-600 transition-colors ${currentPage === 'home' ? 'font-semibold text-blue-600' : ''}`}
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('rankings')}
                    className={`text-gray-600 hover:text-blue-600 transition-colors ${currentPage === 'rankings' ? 'font-semibold text-blue-600' : ''}`}
                  >
                    Rankings
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentPage('addReview')}
                    className={`text-gray-600 hover:text-blue-600 transition-colors ${currentPage === 'addReview' ? 'font-semibold text-blue-600' : ''}`}
                  >
                    Calificar
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* BOTÓN INICIAR SESIÓN + ÍCONO MENÚ MOBILE */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setCurrentPage('login')}
              className="hidden md:inline-block bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
            >
              Iniciar sesión
            </button>

            <button
              onClick={toggleMenu}
              className="md:hidden text-gray-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* MENU MOBILE */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-2">
            <nav>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => {
                      setCurrentPage('home');
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-2 py-2 rounded-lg ${currentPage === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                  >
                    Inicio
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentPage('rankings');
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-2 py-2 rounded-lg ${currentPage === 'rankings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                  >
                    Rankings
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentPage('addReview');
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-2 py-2 rounded-lg ${currentPage === 'addReview' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                  >
                    Calificar
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      setCurrentPage('login');
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-blue-600 text-white text-center font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition-all duration-300 ease-in-out transform hover:-translate-y-0.5"
                  >
                    Iniciar sesión
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default LayoutHeader;
