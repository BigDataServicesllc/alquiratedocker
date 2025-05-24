import React, { useEffect, useState } from 'react';

const ProfilePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('alquirateUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600">
        Cargando información del perfil...
      </div>
    );
  }

  const avatarSrc = user.photoURL || `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(user.email)}`;

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-2xl">
      <div className="flex flex-col items-center">
        <img
          src={avatarSrc}
          alt="avatar"
          className="w-24 h-24 rounded-full border mb-3"
        />
        <button className="text-sm text-blue-600 hover:underline mb-4">Cambiar foto</button>

        <p className="text-gray-800 font-medium text-lg">{user.email}</p>

        <div className="mt-6 w-full">
          <button
            className="w-full bg-blue-600 text-white py-2 rounded-lg shadow hover:bg-blue-700 transition"
            onClick={() => window.location.href = '/mis-calificaciones'}
          >
            Ver mis calificaciones
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
