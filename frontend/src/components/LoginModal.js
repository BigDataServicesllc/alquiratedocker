// /frontend/src/components/LoginModal.js
import React from 'react';
import { auth, googleProvider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import EmailAuthForm from './EmailAuthForm';

const LoginModal = ({ onClose }) => {
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;

        localStorage.setItem("alquirateUser", JSON.stringify({
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        }));

        onClose();
        window.location.reload();
      })
      .catch((error) => {
        console.error("❌ Error al iniciar sesión con Google:", error);
      });
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-lg max-w-md w-full px-6 py-8 relative text-center">
        <button
          onClick={onClose}
          className="absolute top-3 left-4 text-gray-600 text-sm hover:text-gray-800"
        >
          ← Atrás
        </button>

        <h2 className="text-3xl font-bold text-blue-600 mb-4">
          Alqui<span className="text-gray-800">Rate</span>
        </h2>
        <p className="text-lg text-gray-800 mb-2 font-semibold">¡Hola!</p>
        <p className="text-gray-600 mb-6 leading-relaxed">
          Ingresá a tu cuenta y compartí tu experiencia como inquilino y revisá las calificaciones de otros usuarios.
        </p>

        <EmailAuthForm />

        <div className="my-6 flex items-center justify-center text-sm text-gray-500">
          <hr className="flex-grow border-t border-gray-300 mx-2" />
          o ingresá con
          <hr className="flex-grow border-t border-gray-300 mx-2" />
        </div>

        <div className="flex justify-center gap-6">
          <img
            src="/icons/google.svg"
            alt="Google"
            className="w-8 h-8 cursor-pointer hover:scale-105 transition"
            onClick={handleGoogleLogin}
          />
          <img
            src="/icons/facebook.svg"
            alt="Facebook"
            className="w-8 h-8 cursor-pointer hover:scale-105 transition opacity-50 cursor-not-allowed"
            title="Próximamente"
          />
          <img
            src="/icons/apple.svg"
            alt="Apple"
            className="w-8 h-8 cursor-pointer hover:scale-105 transition opacity-50 cursor-not-allowed"
            title="Próximamente"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
