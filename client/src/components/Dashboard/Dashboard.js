import React, { useEffect, useState, useContext, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthContext";
import "./Dashboard.css";
import ChatList from "../ChatList/ChatList";
import ChatWindow from "../ChatWindow/ChatWindow";
import ContactList from "../ContactList/ContactList";
import Settings from "../Settings/Settings";
import axios from "axios";

function Dashboard() {
  const [activeComponent, setActiveComponent] = useState("chats");
  const [selectedChat, setSelectedChat] = useState(null);
  const [contacts, setContacts] = useState([]);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useContext(AuthContext);

   const fetchContacts = useCallback(async () => {
     try {
       const response = await axios.get("/api/contacts", {
         headers: { Authorization: `Bearer ${user.token}` },
       });
       setContacts(response.data);
     } catch (error) {
       console.error("Error fetching contacts:", error);
     }
   }, [user.token]);

  const fetchChats = useCallback(async () => {
    try {
      const response = await axios.get("/api/chats", {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setChats(response.data);
    } catch (error) {
      console.error("Error fetching chats:", error);
    }
  }, [user.token]);

  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      fetchContacts();
      fetchChats();
    }
  }, [isLoggedIn, navigate, fetchContacts, fetchChats]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChatSelect = (chatId) => {
    setSelectedChat(chatId);
  };

  const handleContactSelect = (contactId) => {
    console.log("Selected contact:", contactId);
  };

  const renderActiveComponent = () => {
    switch (activeComponent) {
      case "chats":
        return (
          <>
            <div className="section">
              <h2>Recent Chats</h2>
              <ChatList onChatSelect={handleChatSelect} chats = {chats}/>
            </div>
            <div className="section">
              <h2>Chat Window</h2>
              {selectedChat ? (
                <ChatWindow chatId={selectedChat} />
              ) : (
                <div className="empty-state">No chat selected.</div>
              )}
            </div>
          </>
        );
      case "contacts":
        return (
          <div className="section">
            <h2>Contacts</h2>
            <ContactList onContactSelect={handleContactSelect} contacts={contacts} />
          </div>
        );
      case "settings":
        return <Settings />;
      default:
        return null;
    }
  };


  if (!user) {
    return <div className="dashboard-container">Loading...</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Welcome, {user.username}!</h2>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
        <div className="sidebar-menu">
          <button
            className={`menu-item ${
              activeComponent === "contacts" ? "active" : ""
            }`}
            onClick={() => setActiveComponent("contacts")}
            aria-label="Contacts"
          >
            <i className="fas fa-user-friends"></i>
            <span>Contacts</span>
          </button>
          <button
            className={`menu-item ${activeComponent === "chats" ? "active" : ""}`}
            onClick={() => setActiveComponent("chats")}
            aria-label="Chats"
          >
            <i className="fas fa-comments"></i>
            <span>Chats</span>
          </button>
          <button
            className={`menu-item ${
              activeComponent === "settings" ? "active" : ""
            }`}
            onClick={() => setActiveComponent("settings")}
            aria-label="Settings"
          >
            <i className="fas fa-cog"></i>
            <span>Settings</span>
          </button>
          <button
            className="new-chat-btn"
            aria-label="New Chat"
            onClick={() => navigate("/new-chat")}
          >
            <i className="fas fa-plus"></i>
            <span>New Chat</span>
          </button>
        </div>
      </div>
      <div className="main-content">
        <div className="header">
          <h1>Dashboard</h1>
          <div className="search-bar">
            <input type="text" placeholder="Search..." />
            <button className="search-btn">
              <i className="fas fa-search"></i>
            </button>
          </div>
        </div>
        <div className="content">{renderActiveComponent()}</div>
      </div>
    </div>
  );
}


export default Dashboard;
