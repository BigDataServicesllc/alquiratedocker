import React, { useState, useEffect, useRef } from 'react';

const LayoutHeader = ({ currentPage, setCurrentPage, setShowLoginModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const menuRef = useRef(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

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
          <h1
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            Alqui<span className="text-gray-800">Rate</span>
          </h1>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => setCurrentPage('home')} className={`text-gray-600 hover:text-blue-600 ${currentPage === 'home' ? 'font-semibold text-blue-600' : ''}`}>Inicio</button>
            <button onClick={() => setCurrentPage('rankings')} className={`text-gray-600 hover:text-blue-600 ${currentPage === 'rankings' ? 'font-semibold text-blue-600' : ''}`}>Rankings</button>
            <button onClick={() => setCurrentPage('addReview')} className={`text-gray-600 hover:text-blue-600 ${currentPage === 'addReview' ? 'font-semibold text-blue-600' : ''}`}>Calificar</button>

            {user ? (
              <div className="relative" ref={menuRef}>
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-9 h-9 rounded-full cursor-pointer border border-gray-300"
                  onClick={() => setShowUserMenu(!showUserMenu)}
                />
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-60 bg-white border rounded-xl shadow-lg text-sm text-gray-700 z-50 p-4">
                    <div className="font-medium truncate mb-2 text-sm text-gray-900">{user.email}</div>
                    <button onClick={() => setCurrentPage('myReviews')} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">📄 Ver mis calificaciones</button>
                    <button onClick={() => setCurrentPage('rankings')} className="block px-4 py-2 hover:bg-gray-100 w-full text-left">🔍 Ver calificaciones</button>
                    <button onClick={handleLogout} className="block px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left">🚪 Cerrar sesión</button>
                  </div>
                )}
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

          <button onClick={toggleMenu} className="md:hidden text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {/* Menú Mobile tipo tarjeta */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-40 flex justify-center items-center md:hidden">
            <div className="bg-white w-11/12 max-w-sm rounded-2xl shadow-2xl p-6 space-y-4">
              {user && (
                <div className="flex flex-col items-center text-center">
                  <img
                    src={avatarSrc}
                    alt="avatar"
                    className="w-16 h-16 rounded-full border border-gray-300 mb-2"
                  />
                  <p className="text-sm font-medium text-gray-700 truncate">{user.email}</p>
                </div>
              )}
              <div className="flex flex-col space-y-2 mt-4">
                <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-blue-600">Inicio</button>
                <button onClick={() => { setCurrentPage('rankings'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-blue-600">Rankings</button>
                <button onClick={() => { setCurrentPage('addReview'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-blue-600">Calificar</button>
              </div>
              <div className="border-t pt-4 space-y-2">
                <button onClick={() => { setCurrentPage('myReviews'); setIsMenuOpen(false); }} className="text-sm text-gray-700 hover:text-blue-600">📄 Ver mis calificaciones</button>
                <button onClick={() => { setCurrentPage('rankings'); setIsMenuOpen(false); }} className="text-sm text-gray-700 hover:text-blue-600">🔍 Ver calificaciones</button>
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-sm text-red-600 hover:text-red-800">🚪 Cerrar sesión</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LayoutHeader;