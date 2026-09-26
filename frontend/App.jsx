import { useState } from 'react';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e) => {
    e.preventDefault();
    
    if (!input.trim()) return;

    // Add user message to chat
    setMessages([...messages, { type: 'user', text: input }]);
    setInput('');
    setLoading(true);

    try {
      // Send to backend API
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input })
      });

      const data = await response.json();
      
      // Add bot response to chat
      setMessages(prev => [...prev, { type: 'bot', text: data.bot }]);
    } catch (error) {
      console.error('Error:', error);
      setMessages(prev => [...prev, { type: 'bot', text: 'Sorry, error connecting to server.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h1>🤖 esh chatbot</h1>
      </div>
      
      <div className="chatbot-messages">
        {messages.length === 0 && (
          <p className="welcome-message">Start chatting with me!</p>
        )}
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.type}`}>
          <p style={{ whiteSpace: 'pre-wrap' }}>
  {msg.text.replace(/###/g, '').replace(/\*\*/g, '')}
</p>
          </div>
        ))}
        {loading && <p className="loading">Bot is typing...</p>}
      </div>

      <form onSubmit={sendMessage} className="chatbot-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type your message..."
          disabled={loading}
        />
        <button type="submit" disabled={loading}>Send</button>
      </form>
    </div>
  );
}

export default App;
