import { useEffect, useState } from 'react';
import { Paperclip, Send, ArrowLeft } from 'lucide-react';
import useStore from './store/login.store';
import axios from 'axios';
import { useShallow } from 'zustand/react/shallow';

interface User {
  id: string;
  fullName: string;
  email: string;
  profilePicture: string;
  bio: string | null;
  role?: string | null;
  location?: string | null;
  createdAt?: string;
}

interface Message {
  id: string;
  text: string;
  time: string;
  isUserMessage: boolean;
}

export function Chat() {
  const urlBase = import.meta.env.VITE_BASE_URL;
  const { id } = useStore(useShallow((state) => ({ id: state.id })));

  const [users, setUsers] = useState<User[]>([]);
  const [receiverUser, setReceiverUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const { data } = await axios.get(`${urlBase}api/user`);
        setUsers(data);
      } catch (error) {
        console.error("Error al cargar los usuarios:", error);
      }
    };

    fetchUsers();
  }, [urlBase]);

  const handleChatSelect = async (user: User) => {
    console.log(user, 'user');
    setReceiverUser(user);
    try {
      const { data } = await axios.get(`${urlBase}api/chat/messages`, {
        params: { senderId: id, receiverId: user.id },
      });

      console.log(data, 'messages');
      setMessages(
        data.map((msg: any) => ({
          id: msg.id,
          text: msg.content,
          time: new Date(msg.timestamp).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
          isUserMessage: msg.sender.id === id,
        }))
      );
    } catch (error) {
      console.error("Error al cargar los mensajes:", error);
    }
  };

  const handleBack = () => {
    setReceiverUser(null);
    setMessages([]);
  };

  const handleSendMessage = async () => {
    if (inputMessage.trim() && receiverUser) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isUserMessage: true,
      };

      const chatData = {
        senderId: id,
        receiverId: receiverUser.id,
        content: inputMessage,
      };

      try {
        await axios.post(`${urlBase}api/chat`, chatData);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage("");
      } catch (error) {
        console.error("Error al enviar el mensaje:", error);
      }
    }
  };

  return (
    <div className="flex h-[calc(100vh-3.5rem)]">
      {/* Lista de chats */}
      <div className={`lg:w-1/3 border-r ${receiverUser ? 'hidden lg:block' : 'block'}`}>
        <div className="p-4">
          <h2 className="text-xl font-semibold text-purple-600 mb-4">Chats</h2>
          <div className="space-y-4">
            {users.map((user) => (
              <div
                key={user.id}
                onClick={() => handleChatSelect(user)}
                className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg cursor-pointer"
              >
                <img
                  src={user.profilePicture}
                  alt={user.fullName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium truncate">{user.fullName}</h3>
                    {user.createdAt && (
                      <span className="text-sm text-gray-500">
                        {new Date(user.createdAt).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 truncate">{user.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Ventana de mensajes */}
      <div className={`flex-1 flex flex-col ${receiverUser ? 'block' : 'hidden lg:flex'}`}>
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            {receiverUser && (
              <button onClick={handleBack} className="lg:hidden p-2">
                <ArrowLeft className="w-5 h-5 text-gray-600" />
              </button>
            )}
            <img
              src={receiverUser?.profilePicture || ''}
              alt={receiverUser?.fullName || 'Chat'}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <h3 className="font-medium">{receiverUser?.fullName || 'Chat'}</h3>
              <p className="text-sm text-gray-600">@{receiverUser?.fullName?.split(" ")[0]}</p>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUserMessage ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.isUserMessage ? 'bg-purple-600 text-white' : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p>{message.text}</p>
                <span className="text-xs opacity-75 mt-1 block">{message.time}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="p-4 border-t">
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Paperclip className="w-5 h-5 text-gray-500" />
            </button>
            <input
              type="text"
              placeholder="Mensaje..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              className="flex-1 px-4 py-2 rounded-full border focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
