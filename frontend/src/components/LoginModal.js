// /frontend/src/components/EmailAuthForm.js
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { auth } from '../utils/firebase';
import CustomToast from './CustomToast';

const EmailAuthForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (password !== confirm) {
      setErrorMsg('Las contraseñas no coinciden.');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await sendEmailVerification(userCredential.user);
      setShowToast(true);
      setEmail('');
      setPassword('');
      setConfirm('');
    } catch (error) {
      console.error("Error al registrar:", error);
      setErrorMsg(error.message);
    }
  };

  return (
    <>
      <form className="flex flex-col gap-3" onSubmit={handleRegister}>
        <input
          type="email"
          value={email}
          placeholder="Correo electrónico"
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
          required
        />
        <input
          type="password"
          value={password}
          placeholder="Contraseña"
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
          required
        />
        <input
          type="password"
          value={confirm}
          placeholder="Confirmar contraseña"
          onChange={(e) => setConfirm(e.target.value)}
          className="border border-gray-300 rounded-xl px-4 py-2 focus:outline-none"
          required
        />

        {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}

        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold px-6 py-3 rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Registrarse
        </button>
      </form>

      <CustomToast
        show={showToast}
        onClose={() => setShowToast(false)}
        message={{
          title: 'Cuenta creada correctamente',
          body: 'Revisá tu correo para verificar tu cuenta.',
        }}
      />
    </>
  );
};

export default EmailAuthForm;
