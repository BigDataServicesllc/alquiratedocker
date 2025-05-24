import React, { useState, useEffect } from 'react';
import {
  auth,
  actionCodeSettings,
  sendSignInLinkToEmail,
  isSignInWithEmailLink,
  signInWithEmailLink,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '../utils/firebase';

const EmailLogin = ({ onSuccess }) => {
  const [email, setEmail] = useState('');

  const defaultPassword = 'alquirateDefault';

  const finishLogin = (user) => {
    localStorage.setItem("alquirateUser", JSON.stringify({
      uid: user.uid,
      email: user.email
    }));
    if (onSuccess) {
      onSuccess(); // cerrar modal y redirigir a home
    }
  };

  const handleLoginLink = async () => {
    try {
      await sendSignInLinkToEmail(auth, email, actionCodeSettings);
      window.localStorage.setItem('emailForSignIn', email);
      alert('Te enviamos un link a tu correo para iniciar sesión');
    } catch (error) {
      console.error('Error enviando link:', error);
    }
  };

  const handleLoginWithPassword = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, defaultPassword);
      console.log('Sesión iniciada');
      finishLogin(result.user);
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        try {
          const newUser = await createUserWithEmailAndPassword(auth, email, defaultPassword);
          console.log('Usuario creado y logueado');
          finishLogin(newUser.user);
        } catch (createErr) {
          console.error('Error creando usuario:', createErr);
        }
      } else {
        console.error('Error en login:', error);
      }
    }
  };

  useEffect(() => {
    if (isSignInWithEmailLink(auth, window.location.href)) {
      const savedEmail = window.localStorage.getItem('emailForSignIn') || window.prompt('Ingresá tu correo');
      signInWithEmailLink(auth, savedEmail, window.location.href)
        .then((result) => {
          console.log('Login por link exitoso');
          finishLogin(result.user);
        })
        .catch((error) => {
          console.error('Error en login por link:', error);
        });
    }
  }, []);

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="email"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleLoginWithPassword}
        className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2"
      >
        Ingresar con contraseña
      </button>

      <button
        onClick={handleLoginLink}
        className="w-full bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl"
      >
        Ingresar con link de acceso
      </button>
    </div>
  );
};

export default EmailLogin;
