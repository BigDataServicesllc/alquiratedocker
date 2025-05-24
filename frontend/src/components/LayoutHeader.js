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
          <h1
            className="text-2xl font-bold text-blue-600 cursor-pointer"
            onClick={() => setCurrentPage('home')}
          >
            Alqui<span className="text-gray-800">Rate</span>
          </h1>

          <div className="hidden md:flex items-center space-x-6">
            <button onClick={() => setCurrentPage('home')} className={`text-gray-600 hover:text-blue-600 transition-colors ${currentPage === 'home' ? 'font-semibold text-blue-600' : ''}`}>Inicio</button>
            <button onClick={() => setCurrentPage('rankings')} className={`text-gray-600 hover:text-blue-600 transition-colors ${currentPage === 'rankings' ? 'font-semibold text-blue-600' : ''}`}>Rankings</button>
            <button onClick={() => setCurrentPage('addReview')} className={`text-gray-600 hover:text-blue-600 transition-colors ${currentPage === 'addReview' ? 'font-semibold text-blue-600' : ''}`}>Calificar</button>
            {user ? (
              <div className="relative" ref={menuRef}>
                <img
                  src={avatarSrc}
                  alt="avatar"
                  className="w-9 h-9 rounded-full cursor-pointer border border-gray-300"
                  onClick={toggleUserMenu}
                />
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-xl shadow-lg text-sm text-gray-700 z-50 p-4 space-y-2">
                    <div className="text-xs text-gray-500">{user.email}</div>
                    <button onClick={() => setCurrentPage('profile')} className="block w-full text-left text-sm text-blue-600 hover:underline">Mi perfil</button>
                    <hr />
                    <button onClick={() => setCurrentPage('home')} className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded">Inicio</button>
                    <button onClick={() => setCurrentPage('rankings')} className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded">Rankings</button>
                    <button onClick={() => setCurrentPage('addReview')} className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded">Calificar</button>
                    <hr />
                    <button onClick={() => setCurrentPage('myReviews')} className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded">📄 Ver mis calificaciones</button>
                    <button onClick={() => setCurrentPage('rankings')} className="block w-full text-left hover:bg-gray-100 px-2 py-1 rounded">🔍 Ver calificaciones</button>
                    <button onClick={handleLogout} className="block w-full text-left text-red-600 hover:bg-gray-100 px-2 py-1 rounded">🚪 Cerrar sesión</button>
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

        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 bg-white bg-opacity-70 backdrop-blur-sm z-40 flex justify-center pt-20">
            <div className="bg-white shadow-xl rounded-2xl p-6 w-[90%] max-w-sm text-center space-y-3">
              {user && (
                <>
                  <img src={avatarSrc} alt="avatar" className="w-16 h-16 rounded-full mx-auto border" />
                  <p className="text-sm text-gray-700">{user.email}</p>
                  <button onClick={() => { setCurrentPage('profile'); setIsMenuOpen(false); }} className="text-blue-600 text-sm hover:underline">Mi perfil</button>
                </>
              )}
              <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className={`block w-full ${currentPage === 'home' ? 'text-blue-600 font-semibold' : 'text-gray-700'} py-1`}>Inicio</button>
              <button onClick={() => { setCurrentPage('rankings'); setIsMenuOpen(false); }} className={`block w-full ${currentPage === 'rankings' ? 'text-blue-600 font-semibold' : 'text-gray-700'} py-1`}>Rankings</button>
              <button onClick={() => { setCurrentPage('addReview'); setIsMenuOpen(false); }} className={`block w-full ${currentPage === 'addReview' ? 'text-blue-600 font-semibold' : 'text-gray-700'} py-1`}>Calificar</button>
              <hr />
              {user && (
                <>
                  <button onClick={() => { setCurrentPage('myReviews'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-700 px-2 py-1 text-sm">📄 Ver mis calificaciones</button>
                  <button onClick={() => { setCurrentPage('rankings'); setIsMenuOpen(false); }} className="block w-full text-left text-gray-700 px-2 py-1 text-sm">🔍 Ver calificaciones</button>
                  <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="block w-full text-left text-red-600 px-2 py-1 text-sm">🚪 Cerrar sesión</button>
                </>
              )}
              {!user && (
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
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default LayoutHeader;