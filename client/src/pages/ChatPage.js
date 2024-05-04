import React, { useState } from "react";
import ChatList from "../components/ChatList/ChatList";
import ChatWindow from "../components/ChatWindow/ChatWindow";
import "./ChatPage.css";

function ChatPage() {
  const [selectedChatId, setSelectedChatId] = useState(null);

  const handleChatSelect = (chatId) => {
    setSelectedChatId(chatId);
  };

  return (
    <div className="chat-page">
      <div className="chat-list-container">
        <ChatList onChatSelect={handleChatSelect} />
      </div>
      <div className="chat-window-container">
        {selectedChatId && <ChatWindow chatId={selectedChatId} />}
      </div>
    </div>
  );
}

export default ChatPage;
