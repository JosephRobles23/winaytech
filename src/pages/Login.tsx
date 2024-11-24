import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth } from '../lib/firebase';
import { AuthLayout } from '../components/AuthLayout';
import { AuthInput } from '../components/AuthInput';
import axios from 'axios';
import  useStore  from '../components/store/login.store';

export const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      navigate('/'); // Updated to redirect to WINAYA
    } catch (error) {
      setError('Credenciales inválidas. Por favor, intenta de nuevo.');
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result: any = await signInWithPopup(auth, provider);
      const urlBack = import.meta.env.VITE_BASE_URL;
      const { data } = await axios.post(`${urlBack}api/auth/social-login`, {
        fullName: result.user.displayName,
        email: result.user.email,
      });

      localStorage.setItem('token', data.token);
      const updateProfile = useStore.getState().updateProfile;
      updateProfile({
        fullName: data.user.fullName || '',
        profilePicture: data.user.profilePicture ||  '',
        email: data.user.email || '',
        bio: data.user.bio || '',
        id: data.user.id || '',
      });

      navigate('/'); // Updated to redirect to WINAYA
    } catch (error) {
      setError('Error al iniciar sesión con Google. Por favor, intenta de nuevo.');
    }
  };

  return (
    <AuthLayout
      title="Iniciar Sesión"
      subtitle="¡Bienvenido de vuelta!"
    >
      <form onSubmit={handleEmailLogin}>
        <AuthInput
          type="email"
          name="email"
          placeholder="tu@email.com"
          value={formData.email}
          onChange={handleChange}
        />
        <AuthInput
          type="password"
          name="password"
          placeholder="Tu contraseña"
          value={formData.password}
          onChange={handleChange}
        />
        
        {error && (
          <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-lg text-white font-medium auth-gradient mb-4"
        >
          Iniciar Sesión
        </button>
      </form>

      <p className="text-center text-gray-600 mb-4">
        ¿No tienes una cuenta?{' '}
        <Link to="/auth/register" className="text-purple-600 font-medium">
          Regístrate
        </Link>
      </p>

      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 h-px bg-gray-200"></div>
        <span className="text-gray-500">O continúa con</span>
        <div className="flex-1 h-px bg-gray-200"></div>
      </div>

      <button
        onClick={handleGoogleLogin}
        className="w-full py-3 px-4 border border-gray-200 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
      >
        <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
        <span className="text-gray-700">Google</span>
      </button>
    </AuthLayout>
  );
};