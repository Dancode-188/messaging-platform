import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

function Dashboard() {
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("chats");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const response = await fetch("/api/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);
        } else {
          navigate("/login");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const renderSection = () => {
    switch (activeSection) {
      case "contacts":
        return <ContactsSection />;
      case "chats":
        return <ChatsSection />;
      case "settings":
        return <SettingsSection />;
      default:
        return null;
    }
  };

  if (!user) {
    return <div className="dashboard-container">Loading...</div>;
  }

  if (error) {
    return <div className="dashboard-container">{error}</div>;
  }

  return (
    <div className="dashboard-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <h2>Welcome, {user.username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
        <div className="sidebar-menu">
          <button
            className={activeSection === "contacts" ? "active" : ""}
            onClick={() => setActiveSection("contacts")}
            aria-label="Contacts"
          >
            Contacts
          </button>
          <button
            className={activeSection === "chats" ? "active" : ""}
            onClick={() => setActiveSection("chats")}
            aria-label="Chats"
          >
            Chats
          </button>
          <button
            className={activeSection === "settings" ? "active" : ""}
            onClick={() => setActiveSection("settings")}
            aria-label="Settings"
          >
            Settings
          </button>
          <button aria-label="New Chat">New Chat</button>
        </div>
      </div>
      <div className="main-content">{renderSection()}</div>
    </div>
  );
}

function ContactsSection() {
  // Implement contacts section
  return <div>Contacts Section</div>;
}

function ChatsSection() {
  // Implement chats section
  return <div>Chats Section</div>;
}

function SettingsSection() {
  // Implement settings section
  return <div>Settings Section</div>;
}

export default Dashboard;
