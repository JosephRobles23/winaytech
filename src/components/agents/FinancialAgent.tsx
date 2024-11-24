import { useState, useEffect, useRef } from 'react';
import { Send } from 'lucide-react';
import axios from 'axios';

export function FinancialAgent() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: '¡Hola! Soy Luna, tu Agente Financiero personal. Estoy aquí para ayudarte con tus consultas sobre finanzas, presupuestos, inversiones y estrategias para hacer crecer tu negocio. ¿En qué puedo ayudarte hoy?',
      isBot: true,
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);
  const [dots, setDots] = useState('');
  
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const handleSendMessage = async () => {
    if (inputText.trim() === '') return;

    const userMessage = { id: Date.now(), text: inputText, isBot: false };
    setMessages([...messages, userMessage]);
    setInputText('');
    setLoading(true);

    try {
      const response = await axios.post('https://e1e2-132-251-2-146.ngrok-free.app/financiamiento', {
        pregunta: inputText,
      });

      const botMessage = {
        id: Date.now() + 1,
        text: response.data.respuesta || `Hola. El panorama financiero para las microempresas es complejo, pero hay varias opciones disponibles para ellas.`,
        isBot: true,
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (loading) {
      intervalRef.current = setInterval(() => {
        setDots((prev) => (prev.length === 3 ? '' : prev + '.'));
      }, 500);
    } else {
      setDots('');
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [loading]);

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-3.5rem)] flex flex-col">
      <div className="bg-white p-4 border-b">
        <h1 className="text-xl font-semibold text-purple-600">Agente Financiero</h1>
        <p className="text-gray-600">Tu asistente para decisiones financieras inteligentes</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 h-3/4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg px-4 py-2 ${message.isBot ? 'bg-purple-50 text-purple-900' : 'bg-purple-600 text-white'}`}
            >
              <p>{message.text}</p>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-lg px-4 py-2 bg-purple-50 text-purple-900">
              <p>Consultando{dots}</p>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 border-t bg-white">
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Escribe tu mensaje..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-4 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
