import React, { useState, useRef, useEffect } from 'react';
import './ChatWindow.css';

export interface Message {
  id: number;
  senderId: number | string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface ChatParticipant {
  id: number | string;
  name: string;
  avatar: string;
  isBot?: boolean;
  isRecruiter?: boolean;
}

interface ChatWindowProps {
  participant: ChatParticipant;
  messages: Message[];
  currentUserId: number | string;
  onClose: () => void;
  onSendMessage: (text: string) => void;
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  participant,
  messages,
  currentUserId,
  onClose,
  onSendMessage
}) => {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-window">
      <div className="chat-header">
        <div className="chat-participant">
          <div className="participant-avatar">
            {participant.isBot || participant.isRecruiter ? (
              <div className="default-avatar">
                {participant.name.charAt(0)}
              </div>
            ) : (
              <img 
                src={participant.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(participant.name)}&background=random`} 
                alt={participant.name} 
              />
            )}
          </div>
          <h3 className="participant-name">{participant.name}</h3>
        </div>
        <button className="close-button" onClick={onClose}>
          <span className="material-icons">close</span>
        </button>
      </div>
      
      <div className="chat-messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.senderId === currentUserId ? 'sent' : 'received'}`}
          >
            <div className="message-content">
              <p>{message.text}</p>
              <span className="message-time">{formatTime(message.timestamp)}</span>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      
      <form className="message-input" onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit" className="send-button">
          <span className="material-icons">send</span>
        </button>
      </form>
    </div>
  );
};

export default ChatWindow;