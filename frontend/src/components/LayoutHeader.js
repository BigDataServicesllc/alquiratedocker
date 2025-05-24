import React, { useState, useEffect, useRef } from 'react';

const LayoutHeader = ({ currentPage, setCurrentPage, setShowLoginModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setShowUserMenu(!showUserMenu);

  useEffect(() => {
    const storedUser = localStorage.getItem("alquirateUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("alquirateUser");
    window.location.reload();
  };

  const avatarSrc = user?.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user?.email || 'user')}`;

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <h1
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            Alqui<span className="text-gray-800">Rate</span>
          </h1>

          {/* Navegación + Avatar */}
          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => setCurrentPage('home')} className={`text-gray-600 hover:text-blue-600 transition-colors ${currentPage === 'home' ? 'font-semibold text-blue-600' : ''}`}>Inicio</button>
            <button onClick={() => setCurrentPage('rankings')} className={`text-gray-600 hover:text-blue-600 transition-colors ${currentPage === 'rankings' ? 'font-semibold text-blue-600' : ''}`}>Rankings</button>
            <button onClick={() => setCurrentPage('addReview')} className={`text-gray-600 hover:text-blue-600 transition-colors ${currentPage === 'addReview' ? 'font-semibold text-blue-600' : ''}`}>Calificar</button>

            {user ? (
              <div
                className="relative group"
                ref={menuRef}
                onMouseEnter={() => setShowUserMenu(true)}
                onMouseLeave={() => setShowUserMenu(false)}
              >
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-9 h-9 rounded-full cursor-pointer border border-gray-300 transition hover:scale-105"
                  onClick={toggleUserMenu}
                />
                <div
                  className={`absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg text-sm text-gray-700 z-50 transition-all duration-200 ${
                    showUserMenu ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <button
                    onClick={() => {
                      setCurrentPage('myReviews');
                      setShowUserMenu(false);
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    📄 Ver mis calificaciones
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('rankings');
                      setShowUserMenu(false);
                    }}
                    className="block px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    🔍 Ver calificaciones
                  </button>
                  <button
                    onClick={handleLogout}
                    className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    🚪 Cerrar sesión
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition-all"
              >
                Iniciar sesión
              </button>
            )}
          </div>

          {/* Botón hamburguesa mobile */}
          <button onClick={toggleMenu} className="md:hidden text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menú mobile */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            <nav className="flex flex-col space-y-3 text-center">
              <button
                onClick={() => {
                  setCurrentPage('home');
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 rounded ${currentPage === 'home' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
              >
                Inicio
              </button>
              <button
                onClick={() => {
                  setCurrentPage('rankings');
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 rounded ${currentPage === 'rankings' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
              >
                Rankings
              </button>
              <button
                onClick={() => {
                  setCurrentPage('addReview');
                  setIsMenuOpen(false);
                }}
                className={`px-4 py-2 rounded ${currentPage === 'addReview' ? 'bg-blue-50 text-blue-600' : 'text-gray-700'}`}
              >
                Calificar
              </button>

              {user ? (
                <>
                  <div className="mt-4 text-sm text-gray-500">{user.email}</div>
                  <button
                    onClick={() => {
                      setCurrentPage('myReviews');
                      setIsMenuOpen(false);
                    }}
                    className="text-sm text-gray-700 hover:underline"
                  >
                    📄 Ver mis calificaciones
                  </button>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 text-sm mt-2 hover:underline"
                  >
                    🚪 Cerrar sesión
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setShowLoginModal(true);
                    setIsMenuOpen(false);
                  }}
                  className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Iniciar sesión
                </button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default LayoutHeader;
