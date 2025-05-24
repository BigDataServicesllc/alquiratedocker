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

  // Avatar dinámico por email o photoURL
  const avatarUrl = user?.photoURL
    ? user.photoURL
    : user?.email
      ? `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.email)}`
      : 'https://ui-avatars.com/api/?name=User';

  return (
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-10">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo + navegación */}
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
                  <button onClick={() => setCurrentPage('home')} className={`text-gray-600 hover:text-blue-600 transition-colors ${currentPage === 'home' ? 'font-semibold text-blue-600' : ''}`}>Inicio</button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('rankings')} className={`text-gray-600 hover:text-blue-600 transition-colors ${currentPage === 'rankings' ? 'font-semibold text-blue-600' : ''}`}>Rankings</button>
                </li>
                <li>
                  <button onClick={() => setCurrentPage('addReview')} className={`text-gray-600 hover:text-blue-600 transition-colors ${currentPage === 'addReview' ? 'font-semibold text-blue-600' : ''}`}>Calificar</button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Login / Avatar */}
          <div className="flex items-center gap-4 relative">
            {user ? (
              <div className="relative" ref={menuRef}>
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-9 h-9 rounded-full cursor-pointer border border-gray-300 bg-white"
                  onClick={toggleUserMenu}
                />
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded-xl shadow-lg text-sm text-gray-700 z-50">
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
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="hidden md:inline-block bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition-all"
              >
                Iniciar sesión
              </button>
            )}

            {/* Menú móvil */}
            <button onClick={toggleMenu} className="md:hidden text-gray-600 focus:outline-none">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
