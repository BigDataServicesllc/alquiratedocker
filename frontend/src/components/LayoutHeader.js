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
    <header className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
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
                  className="w-9 h-9 rounded-full cursor-pointer border border-gray-300 hover:shadow-md transition"
                  onClick={toggleUserMenu}
                />
                <div
                  className={`absolute right-0 mt-2 w-60 bg-white border border-gray-200 rounded-xl shadow-lg text-sm z-50 transition-all duration-200 ${
                    showUserMenu ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="px-4 py-3 border-b text-gray-800">
                    <p className="font-medium truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setCurrentPage('myReviews');
                      setShowUserMenu(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    <span className="text-lg">📄</span> Ver mis calificaciones
                  </button>
                  <button
                    onClick={() => {
                      setCurrentPage('rankings');
                      setShowUserMenu(false);
                    }}
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-100 w-full text-left"
                  >
                    <span className="text-lg">🔍</span> Ver calificaciones
                  </button>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-gray-100 w-full text-left"
                  >
                    <span className="text-lg">🚪</span> Cerrar sesión
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

          <button onClick={toggleMenu} className="md:hidden text-gray-600 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isMenuOpen && (
          <>
            <div className="fixed inset-0 bg-black bg-opacity-30 z-40 md:hidden"></div>
            <div className="md:hidden mt-4 pb-4 border-t pt-4 relative z-50 bg-white rounded-b-xl">
              <nav className="flex flex-col gap-4 text-left px-4">
                <div className="space-y-2">
                  <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className={`block text-base ${currentPage === 'home' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>Inicio</button>
                  <button onClick={() => { setCurrentPage('rankings'); setIsMenuOpen(false); }} className={`block text-base ${currentPage === 'rankings' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>Rankings</button>
                  <button onClick={() => { setCurrentPage('addReview'); setIsMenuOpen(false); }} className={`block text-base ${currentPage === 'addReview' ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>Calificar</button>
                </div>

                {user && (
                  <div className="mt-6 border-t pt-4 space-y-3">
                    <div className="flex items-center gap-3">
                      <img src={avatarSrc} alt="avatar" className="w-10 h-10 rounded-full border" />
                      <p className="text-sm text-gray-800 truncate">{user.email}</p>
                    </div>
                    <button onClick={() => { setCurrentPage('myReviews'); setIsMenuOpen(false); }} className="text-gray-700 text-base flex items-center gap-2">
                      📄 Ver mis calificaciones
                    </button>
                    <button onClick={() => { setCurrentPage('rankings'); setIsMenuOpen(false); }} className="text-gray-700 text-base flex items-center gap-2">
                      🔍 Ver calificaciones
                    </button>
                    <button onClick={handleLogout} className="text-red-600 text-base flex items-center gap-2">
                      🚪 Cerrar sesión
                    </button>
                  </div>
                )}

                {!user && (
                  <button onClick={() => { setShowLoginModal(true); setIsMenuOpen(false); }} className="mt-6 bg-blue-600 text-white text-center font-medium px-4 py-2 rounded-lg shadow hover:bg-blue-700 hover:shadow-md transition">
                    Iniciar sesión
                  </button>
                )}
              </nav>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default LayoutHeader;