import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';

export function MarketingAgent() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy Ana, tu Agente de Marketing. Estoy aquí para ayudarte a crear estrategias efectivas de marketing, mejorar tu presencia en redes sociales y aumentar la visibilidad de tu marca. ¿Qué proyecto tienes en mente?',
      isBot: true,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [dots, setDots] = useState('');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = { id: Date.now(), text: inputText, isBot: false };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await axios.post('https://e1e2-132-251-2-146.ngrok-free.app/marketing', {
        pregunta: inputText,
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.respuesta || 'Estoy aquí para ayudarte con tus consultas de marketing.',
        isBot: true,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error al consultar el bot:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Lo siento, hubo un error al procesar tu solicitud.',
        isBot: true,
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) {
      intervalRef.current = setInterval(() => {
        setDots((prev) => (prev.length === 3 ? '' : prev + '.'));
      }, 500);
    } else {
      setDots('');
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isLoading]);

  return (
    <div className="max-w-3xl mx-auto h-screen flex flex-col">
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold text-pink-600">Agente de Marketing</h1>
        <p className="text-gray-600">Tu estratega en marketing digital y branding</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${
                message.isBot ? 'bg-pink-50 text-pink-900' : 'bg-pink-600 text-white'
              }`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-pink-50 text-pink-900">
              <p>Consultado{dots}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-pink-500"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage();
            }}
            disabled={isLoading}
          />
          <button
            className="p-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 disabled:opacity-50"
            onClick={handleSendMessage}
            disabled={isLoading}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
