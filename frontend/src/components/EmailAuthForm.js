import React, { useState } from 'react';
import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from '../utils/firebase';

const EmailAuthForm = () => {
  const [mode, setMode] = useState('login'); // 'login' o 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async () => {
    setError(null);

    if (mode === 'register') {
      if (password !== confirmPassword) {
        setError('Las contraseñas no coinciden.');
        return;
      }
      try {
        await createUserWithEmailAndPassword(auth, email, password);
        alert('Cuenta creada correctamente.');
      } catch (err) {
        console.error(err);
        setError('Error al registrar usuario.');
      }
    } else {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        alert('Inicio de sesión exitoso.');
      } catch (err) {
        console.error(err);
        setError('Email o contraseña incorrectos.');
      }
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <input
        type="email"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="Correo electrónico"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        className="w-full p-3 border border-gray-300 rounded-lg mb-4"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      {mode === 'register' && (
        <input
          type="password"
          className="w-full p-3 border border-gray-300 rounded-lg mb-4"
          placeholder="Confirmar contraseña"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      )}

      {error && (
        <div className="text-red-600 mb-2 text-sm">{error}</div>
      )}

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl mb-2"
      >
        {mode === 'login' ? 'Iniciar sesión' : 'Registrarse'}
      </button>

      <p className="text-sm text-gray-600 mt-3">
        {mode === 'login' ? (
          <>
            ¿No tenés cuenta?{' '}
            <button
              onClick={() => setMode('register')}
              className="text-blue-600 underline"
            >
              Registrate
            </button>
          </>
        ) : (
          <>
            ¿Ya tenés cuenta?{' '}
            <button
              onClick={() => setMode('login')}
              className="text-blue-600 underline"
            >
              Iniciá sesión
            </button>
          </>
        )}
      </p>
    </div>
  );
};

export default EmailAuthForm;
