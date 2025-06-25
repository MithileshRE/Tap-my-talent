import React, { useState } from 'react';
import './Messages.css';
import ChatWindow, { Message, ChatParticipant } from './ChatWindow';

interface ScreenProps {
  userType: 'student' | 'organization' | 'admin';
}

// Mock data for conversations
interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  lastMessageTime: string;
  unread: boolean;
  isBot?: boolean;
  isRecruiter?: boolean;
  messages: Message[];
}

// Current user ID for the chat (this would normally come from authentication)
const CURRENT_USER_ID = 1000;

const mockConversations: Conversation[] = [
  {
    id: 1,
    name: 'Bot',
    avatar: '',
    lastMessage: 'How can I Help You?',
    lastMessageTime: '10:30 AM',
    unread: false,
    isBot: true,
    messages: [
      {
        id: 101,
        senderId: 1,
        text: 'Hello! I am the TapMyTalent assistant. How can I help you today?',
        timestamp: '2025-04-29T10:15:00',
        isRead: true
      },
      {
        id: 102,
        senderId: CURRENT_USER_ID,
        text: 'I need help with my resume',
        timestamp: '2025-04-29T10:20:00',
        isRead: true
      },
      {
        id: 103,
        senderId: 1,
        text: 'I can definitely help with that! Would you like to use our resume builder or get feedback on your existing resume?',
        timestamp: '2025-04-29T10:30:00',
        isRead: true
      }
    ]
  },
  {
    id: 2,
    name: 'Recruiter',
    avatar: '',
    lastMessage: 'How can I Help You?',
    lastMessageTime: '9:45 AM',
    unread: true,
    isRecruiter: true,
    messages: [
      {
        id: 201,
        senderId: 2,
        text: 'Hello! I am a recruiter from TapMyTalent. I can help you find job opportunities that match your skills and experience.',
        timestamp: '2025-04-29T09:30:00',
        isRead: true
      },
      {
        id: 202,
        senderId: 2,
        text: 'How can I help you with your job search today?',
        timestamp: '2025-04-29T09:45:00',
        isRead: false
      }
    ]
  },
  {
    id: 3,
    name: 'John Smith',
    avatar: '',
    lastMessage: 'Thanks for your application. We would like to schedule an interview.',
    lastMessageTime: 'Yesterday',
    unread: false,
    messages: [
      {
        id: 301,
        senderId: CURRENT_USER_ID,
        text: 'Hello, I am interested in the Frontend Developer position at your company.',
        timestamp: '2025-04-28T14:30:00',
        isRead: true
      },
      {
        id: 302,
        senderId: 3,
        text: 'Thanks for your application. We would like to schedule an interview.',
        timestamp: '2025-04-28T16:45:00',
        isRead: true
      }
    ]
  },
  {
    id: 4,
    name: 'Tech Solutions HR',
    avatar: '',
    lastMessage: 'Your resume has been received. We will get back to you soon.',
    lastMessageTime: '2 days ago',
    unread: false,
    messages: [
      {
        id: 401,
        senderId: CURRENT_USER_ID,
        text: 'I have submitted my application for the UX Designer position.',
        timestamp: '2025-04-27T09:15:00',
        isRead: true
      },
      {
        id: 402,
        senderId: 4,
        text: 'Your resume has been received. We will get back to you soon.',
        timestamp: '2025-04-27T11:30:00',
        isRead: true
      }
    ]
  }
];

const Messages: React.FC<ScreenProps> = ({ userType: _ }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>(mockConversations);
  const [activeConversation, setActiveConversation] = useState<Conversation | null>(null);
  
  // Filter conversations based on search query
  const filteredConversations = conversations.filter(conversation => 
    conversation.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conversation.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };
  
  // Handle conversation click
  const handleConversationClick = (conversation: Conversation) => {
    // Mark conversation as read when opened
    if (conversation.unread) {
      const updatedConversations = conversations.map(conv => 
        conv.id === conversation.id ? { ...conv, unread: false } : conv
      );
      setConversations(updatedConversations);
    }
    setActiveConversation(conversation);
  };
  
  // Handle close chat window
  const handleCloseChat = () => {
    setActiveConversation(null);
  };
  
  // Handle send message
  const handleSendMessage = (text: string) => {
    if (!activeConversation) return;
    
    // Create new message
    const newMessage: Message = {
      id: Date.now(), // Use timestamp as ID (this would be handled by backend in real app)
      senderId: CURRENT_USER_ID,
      text,
      timestamp: new Date().toISOString(),
      isRead: false
    };
    
    // Add message to conversation
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeConversation.id) {
        const updatedConv = { 
          ...conv, 
          messages: [...conv.messages, newMessage],
          lastMessage: text,
          lastMessageTime: 'Just now'
        };
        setActiveConversation(updatedConv);
        return updatedConv;
      }
      return conv;
    });
    
    setConversations(updatedConversations);
  };
  
  // Convert conversation to ChatParticipant format for ChatWindow
  const getParticipantFromConversation = (conversation: Conversation): ChatParticipant => {
    return {
      id: conversation.id,
      name: conversation.name,
      avatar: conversation.avatar,
      isBot: conversation.isBot,
      isRecruiter: conversation.isRecruiter
    };
  };
  
  return (
    <div className="messages-screen">
      {!activeConversation ? (
        // Conversations list view
        <>
          <div className="messages-search-container">
            <div className="messages-search">
              <span className="material-icons search-icon">search</span>
              <input 
                type="text" 
                placeholder="Search" 
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          
          <div className="conversations-list">
            {filteredConversations.map(conversation => (
              <div 
                key={conversation.id} 
                className={`conversation-item ${conversation.unread ? 'unread' : ''}`}
                onClick={() => handleConversationClick(conversation)}
              >
                <div className="conversation-avatar">
                  {conversation.isBot || conversation.isRecruiter ? (
                    <div className="default-avatar">
                      {conversation.name.charAt(0)}
                    </div>
                  ) : (
                    <img 
                      src={conversation.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(conversation.name)}&background=random`} 
                      alt={conversation.name} 
                    />
                  )}
                </div>
                <div className="conversation-content">
                  <div className="conversation-header">
                    <h3 className="conversation-name">{conversation.name}</h3>
                    <span className="conversation-time">{conversation.lastMessageTime}</span>
                  </div>
                  <p className="conversation-message">{conversation.lastMessage}</p>
                </div>
              </div>
            ))}
            
            {filteredConversations.length === 0 && (
              <div className="no-conversations">
                <p>No conversations found matching "{searchQuery}"</p>
              </div>
            )}
          </div>
        </>
      ) : (
        // Chat window view
        <ChatWindow 
          participant={getParticipantFromConversation(activeConversation)}
          messages={activeConversation.messages}
          currentUserId={CURRENT_USER_ID}
          onClose={handleCloseChat}
          onSendMessage={handleSendMessage}
        />
      )}
    </div>
  );
};

export default Messages;
