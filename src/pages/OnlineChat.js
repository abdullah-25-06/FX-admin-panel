import { useState } from "react";
import {  Send } from "lucide-react";

const OnlineChat = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      user: "User1",
      message: "Hello, I have a question",
      time: "10:30 AM",
    },
    {
      id: 2,
      user: "Support",
      message: "How can I help you?",
      time: "10:31 AM",
    },
    {
      id: 3,
      user: "User2",
      message: "My withdrawal is pending",
      time: "10:35 AM",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const [activeChat, setActiveChat] = useState("User1");

  const handleSendMessage = () => {
    if (newMessage.trim() === "") return;

    const newMsg = {
      id: messages.length + 1,
      user: "Support",
      message: newMessage,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setMessages([...messages, newMsg]);
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div className='content'>
      <h1 className='page-title'>Online Chat</h1>

      <div className='card'>
        <h2>Active Chats</h2>
        <div className='chat-container'>
          <div className='chat-list'>
            <div
              className={`chat-item ${activeChat === "User1" ? "active" : ""}`}
              onClick={() => setActiveChat("User1")}
            >
              <div className='chat-avatar'>U1</div>
              <div className='chat-info'>
                <div className='chat-name'>User1</div>
                <div className='chat-preview'>Hello, I have a question</div>
              </div>
              <div className='chat-time'>10:30 AM</div>
            </div>
            <div
              className={`chat-item ${activeChat === "User2" ? "active" : ""}`}
              onClick={() => setActiveChat("User2")}
            >
              <div className='chat-avatar'>U2</div>
              <div className='chat-info'>
                <div className='chat-name'>User2</div>
                <div className='chat-preview'>My withdrawal is pending</div>
              </div>
              <div className='chat-time'>10:35 AM</div>
            </div>
          </div>

          <div className='chat-window'>
            <div className='chat-header'>
              <div className='chat-avatar'>
                {activeChat === "User1" ? "U1" : "U2"}
              </div>
              <div className='chat-name'>{activeChat}</div>
            </div>

            <div className='chat-messages'>
              {messages
                .filter(
                  (msg) => msg.user === activeChat || msg.user === "Support"
                )
                .map((msg) => (
                  <div
                    key={msg.id}
                    className={`message ${
                      msg.user === "Support" ? "support" : ""
                    }`}
                  >
                    <div className='message-content'>{msg.message}</div>
                    <div className='message-time'>{msg.time}</div>
                  </div>
                ))}
            </div>

            <div className='chat-input'>
              <input
                type='text'
                placeholder='Type a message...'
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
              />
              <button className='btn btn-primary' onClick={handleSendMessage}>
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OnlineChat;
