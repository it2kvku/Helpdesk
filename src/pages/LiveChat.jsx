import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/useAuth';
import './LiveChat.css';

const LiveChat = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  
  // Thêm một tin nhắn chào mừng khi trang được tải
  useEffect(() => {
    setMessages([
      {
        id: 'welcome',
        text: 'Xin chào! Tôi là trợ lý ảo IT Helpdesk. Tôi có thể giúp gì cho bạn hôm nay? Bạn có thể hỏi tôi về các vấn đề kỹ thuật phổ biến hoặc cách sử dụng hệ thống.',
        sender: 'bot',
        timestamp: new Date()
      }
    ]);
  }, []);

  // Cuộn xuống tin nhắn mới nhất
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Gửi tin nhắn tới Gemini API
  const sendToGemini = async (prompt) => {
    try {
      setIsLoading(true);
      
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': import.meta.env.VITE_GEMINI_API_KEY
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [
                { 
                  text: `Bạn là trợ lý ảo của IT Helpdesk, hỗ trợ người dùng với các vấn đề kỹ thuật. 
                  Hãy giúp đỡ với câu hỏi sau đây, giữ câu trả lời ngắn gọn, rõ ràng và thân thiện.
                  Sử dụng tiếng Việt trong câu trả lời.
                  Nếu bạn không biết câu trả lời, hãy gợi ý người dùng tạo phiếu hỗ trợ mới.
                  
                  Câu hỏi: ${prompt}`
                }
              ]
            }
          ]
        })
      });
      
      const data = await response.json();
      
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        return data.candidates[0].content.parts[0].text;
      } else if (data.error) {
        console.error('Lỗi từ Gemini API:', data.error);
        return `Xin lỗi, tôi đang gặp vấn đề kỹ thuật: ${data.error.message || 'Lỗi không xác định'}. Vui lòng thử lại sau.`;
      } else if (data.contents && data.contents[0]?.parts[0]?.text) {
        // Format mới của Gemini API V1
        return data.contents[0].parts[0].text;
      } else {
        console.error('Lỗi định dạng phản hồi từ Gemini:', data);
        return 'Xin lỗi, tôi đang gặp vấn đề kỹ thuật. Vui lòng thử lại sau.';
      }
    } catch (error) {
      console.error('Lỗi khi gọi Gemini API:', error);
      return 'Đã xảy ra lỗi khi xử lý yêu cầu của bạn. Vui lòng thử lại sau.';
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý gửi tin nhắn
  const handleSend = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;
    
    // Thêm tin nhắn của người dùng
    const userMessage = {
      id: Date.now().toString(),
      text: input,
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, userMessage]);
    setInput('');
    
    // Hiển thị trạng thái "đang nhập"
    setIsLoading(true);
    
    // Gọi Gemini API
    const response = await sendToGemini(input);
    
    // Thêm phản hồi từ bot
    const botMessage = {
      id: (Date.now() + 1).toString(),
      text: response,
      sender: 'bot',
      timestamp: new Date()
    };
    
    setMessages(prevMessages => [...prevMessages, botMessage]);
  };

  // Format thời gian
  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h1>Trò chuyện trực tiếp</h1>
        <p>Trợ lý AI sẽ giúp giải đáp các thắc mắc của bạn</p>
      </div>
      
      <div className="chat-messages">
        {messages.map(message => (
          <div 
            key={message.id} 
            className={`message ${message.sender === 'user' ? 'user-message' : 'bot-message'}`}
          >
            <div className="message-content">
              <div className="message-avatar">
                {message.sender === 'user' 
                  ? user?.user_metadata?.full_name?.charAt(0) || user?.email?.charAt(0) || 'U'
                  : 'A'}
              </div>
              <div className="message-bubble">
                <div className="message-text">{message.text}</div>
                <div className="message-time">{formatTime(message.timestamp)}</div>
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="message bot-message">
            <div className="message-content">
              <div className="message-avatar">A</div>
              <div className="message-bubble">
                <div className="typing-indicator">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form className="chat-input" onSubmit={handleSend}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Nhập câu hỏi của bạn..."
          disabled={isLoading}
        />
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isLoading || !input.trim()}
        >
          <span className="btn-icon">📤</span>
          Gửi
        </button>
      </form>
      
      <div className="chat-footer">
        <p>Không tìm thấy câu trả lời bạn cần? <a href="/create-ticket">Tạo phiếu hỗ trợ</a></p>
      </div>
    </div>
  );
};

export default LiveChat;
