import React, { useState, useEffect, useRef } from 'react';

const LayoutHeader = ({ currentPage, setCurrentPage, setShowLoginModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const menuRef = useRef(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("alquirateUser");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
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
              <img
                src={avatarSrc}
                alt="avatar"
                className="w-9 h-9 rounded-full cursor-pointer border border-gray-300"
              />
            ) : (
              <button
                onClick={() => setShowLoginModal(true)}
                className="bg-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition-all"
              >
                Iniciar sesión
              </button>
            )}
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && user && (
        <div className="fixed inset-0 bg-white/70 backdrop-blur-sm z-20 flex justify-center items-start pt-20 px-4">
          <div ref={menuRef} className="bg-white w-full max-w-xs mx-auto rounded-2xl shadow-xl p-6 text-center space-y-4">
            <img src={avatarSrc} alt="avatar" className="w-20 h-20 rounded-full mx-auto border border-gray-300" />
            <p className="text-gray-700 font-medium text-sm truncate">{user.email}</p>
            <div className="flex flex-col items-center space-y-2">
              <button onClick={() => { setCurrentPage('profile'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-blue-600">Mi perfil</button>
              <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-blue-600">Inicio</button>
              <button onClick={() => { setCurrentPage('rankings'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-blue-600">Rankings</button>
              <button onClick={() => { setCurrentPage('addReview'); setIsMenuOpen(false); }} className="text-gray-700 hover:text-blue-600">Calificar</button>
            </div>
            <hr className="my-2" />
            <div className="flex flex-col items-start space-y-2 px-4">
              <button onClick={() => { setCurrentPage('myReviews'); setIsMenuOpen(false); }} className="text-gray-700 text-left"><span className="mr-1">📄</span> Ver mis calificaciones</button>
              <button onClick={() => { setCurrentPage('rankings'); setIsMenuOpen(false); }} className="text-gray-700 text-left"><span className="mr-1">🔍</span> Ver calificaciones</button>
              <button onClick={handleLogout} className="text-red-600 text-left"><span className="mr-1">🚪</span> Cerrar sesión</button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default LayoutHeader;
