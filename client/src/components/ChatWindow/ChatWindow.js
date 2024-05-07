import React, { useState, useEffect, useRef } from "react";
import { getChatMessages, sendMessage } from "../../services/chatService";
import "./ChatWindow.css";
import io from "socket.io-client";

function ChatWindow({ contact }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chatWindowRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io();

    socketRef.current.on("new_message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      socketRef.current.emit("message_delivered", message._id);
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  useEffect(() => {
    const fetchChatHistory = async () => {
      try {
        const data = await getChatMessages(contact.id);
        setMessages(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chat history:", error);
        setError("Failed to fetch chat history. Please try again.");
        setLoading(false);
      }
    };

    fetchChatHistory();
  }, [contact.id]);

  useEffect(() => {
    chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim() !== "") {
      try {
        const newMessage = await sendMessage(contact.id, inputMessage);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setInputMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
        setError("Failed to send message. Please try again.");
      }
    }
  };

  if (loading) {
    return <div className="chat-window">Loading...</div>;
  }

  if (error) {
    return <div className="chat-window">{error}</div>;
  }

  return (
    <div className="chat-window">
      <div className="top-bar">
        <img
          src={contact.profilePicture}
          alt="Profile"
          className="profile-picture"
        />
        <div className="contact-info">
          <h3>{contact.name}</h3>
          <p>{contact.onlineStatus ? "Online" : "Offline"}</p>
        </div>
      </div>
      <div className="message-list" ref={chatWindowRef}>
        {messages.length === 0 ? (
          <div className="empty-state">No messages available.</div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`message ${
                message.sender === contact.id ? "received" : "sent"
              }`}
            >
              <p>{message.content}</p>
              <span className="timestamp">{message.timestamp}</span>
              {message.encrypted && (
                <span className="encryption-status">Encrypted</span>
              )}
              {message.delivered && (
                <span className="delivery-status">Delivered</span>
              )}
            </div>
          ))
        )}
      </div>
      <div className="bottom-bar">
        <input
          type="text"
          placeholder="Type your message..."
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }}
        />
        <button className="attachment-button" aria-label="Attach file">
          <i className="fas fa-paperclip"></i>
        </button>
        <button
          className="send-button"
          onClick={handleSendMessage}
          aria-label="Send message"
        >
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
      <div className="call-options">
        <button className="voice-call-button" aria-label="Start voice call">
          <i className="fas fa-phone"></i>
        </button>
        <button className="video-call-button" aria-label="Start video call">
          <i className="fas fa-video"></i>
        </button>
      </div>
    </div>
  );
}

export default ChatWindow;
