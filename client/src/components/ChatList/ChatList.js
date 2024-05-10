import React, { useState, useEffect, useContext } from "react";
import { getChats } from "../../services/chatService";
import { AuthContext } from "../../AuthContext";
import "./ChatList.css";

function ChatList({ onChatSelect }) {
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchChats = async () => {
      try {
        const data = await getChats(user.token);
        setChats(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching chats:", error);
        setError("Failed to fetch chats. Please try again.");
        setLoading(false);
      }
    };

    fetchChats();
  }, [user.token]);

  const handleChatClick = (chatId) => {
    onChatSelect(chatId);
  };

  if (loading) {
    return <div className="chat-list">Loading...</div>;
  }

  if (error) {
    return <div className="chat-list">{error}</div>;
  }

  return (
    <div className="chat-list">
      {chats.length === 0 ? (
        <div className="empty-state">No chats available.</div>
      ) : (
        chats.map((chat) => (
          <button
            key={chat._id}
            className="chat-item"
            onClick={() => handleChatClick(chat._id)}
          >
            <img
              src={chat.profilePicture}
              alt="Profile"
              className="profile-picture"
            />
            <div className="chat-info">
              <h3>{chat.name}</h3>
              <p>{chat.lastMessage}</p>
            </div>
            <div className="chat-meta">
              <span className="timestamp">{chat.lastMessageTimestamp}</span>
              {chat.unreadCount > 0 && (
                <span className="unread-count">{chat.unreadCount}</span>
              )}
            </div>
          </button>
        ))
      )}
    </div>
  );
}

export default ChatList;
