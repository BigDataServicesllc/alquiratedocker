import React, { useState } from 'react';
// No importamos currentUser ni lógica de login/perfil todavía

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
                {/* Quitamos el enlace a Propiedades */}
                {/* <li>
                  <button
                    onClick={() => setCurrentPage('listings')}
                    className={`text-gray-600 hover:text-blue-600 transition-colors ${currentPage === 'listings' ? 'font-semibold text-blue-600' : ''}`}
                  >
                    Propiedades
                  </button>
                </li> */}
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

          <div className="flex items-center">
            {/* Quitamos la búsqueda y el perfil por ahora */}
            {/* <div className="hidden md:block mr-4">
              <button
                onClick={() => setCurrentPage('search')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                </svg>
                Buscar
              </button>
            </div>
            
            <div className="relative">
              <button
                onClick={toggleProfile}
                className="flex items-center focus:outline-none"
              >
                <img
                  src={currentUser.profilePicture}
                  alt="Perfil"
                  className="w-8 h-8 rounded-full object-cover"
                />
                <span className="hidden md:block ml-2 text-gray-700">{currentUser.name}</span>
                <svg className="w-4 h-4 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-20">
                  <button
                    onClick={() => {
                      setCurrentPage('profile');
                      setIsProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Mi Perfil
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('myReviews');
                      setIsProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Mis Reseñas
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('favorites');
                      setIsProfileOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Favoritos
                  </button>
                  <hr className="my-1" />
                  <button
                    className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div> */}
            
            <button
              onClick={toggleMenu}
              className="ml-4 md:hidden text-gray-600 focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
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
                {/* Quitamos el enlace a Propiedades */}
                {/* <li>
                  <button
                    onClick={() => {
                      setCurrentPage('listings');
                      setIsMenuOpen(false);
                    }}
                    className={`block w-full text-left px-2 py-2 rounded-lg ${currentPage === 'listings' ? 'bg-blue-50 text-blue-600' : 'text-gray-600'}`}
                  >
                    Propiedades
                  </button>
                </li> */}
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
                {/* Quitamos búsqueda y perfil móvil por ahora */}
                {/* <li>
                  <button
                    onClick={() => {
                      setCurrentPage('search');
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-2 py-2 rounded-lg text-gray-600 flex items-center"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                    </svg>
                    Buscar
                  </button>
                </li>
                
                {!isLoggedIn && (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          setCurrentPage('login');
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-2 py-2 rounded-lg text-gray-600"
                      >
                        Iniciar sesión
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setCurrentPage('register');
                          setIsMenuOpen(false);
                        }}
                        className="block w-full text-left px-2 py-2 rounded-lg bg-blue-600 text-white"
                      >
                        Registrarse
                      </button>
                    </li>
                  </>
                )} */}
              </ul>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default LayoutHeader;

// DONE