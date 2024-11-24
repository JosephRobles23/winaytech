import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/80 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
        <div className="flex flex-col items-center space-y-6">
          <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
            <span className="text-4xl text-white font-bold">W</span>
          </div>
          
          <h1 className="text-3xl font-bold text-center bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
            WIMNAYA
          </h1>
          
          <div className="text-center space-y-2">
            <h2 className="text-xl font-semibold text-gray-800">
              Conectemos en una sola plataforma
            </h2>
            <p className="text-gray-600">
              Únete a nuestra comunidad y comienza a conectar con otros
            </p>
          </div>

          <button
            onClick={() => navigate('/auth/login')}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-6 rounded-xl font-semibold 
                     flex items-center justify-center space-x-2 hover:opacity-90 transition-opacity"
          >
            <span>Empezar</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}