import React, { useState, useEffect } from "react";
import { getSettings, updateSettings } from "../../services/settingsService";
import "./Settings.css";

function Settings() {
  const [displayName, setDisplayName] = useState("");
  const [profilePicture, setProfilePicture] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [readReceipts, setReadReceipts] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [notificationAlerts, setNotificationAlerts] = useState(true);
  const [notificationSounds, setNotificationSounds] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const data = await getSettings();
        setDisplayName(data.displayName);
        setProfilePicture(data.profilePicture);
        setStatusMessage(data.statusMessage);
        setVisibility(data.visibility);
        setReadReceipts(data.readReceipts);
        setOnlineStatus(data.onlineStatus);
        setNotificationAlerts(data.notificationAlerts);
        setNotificationSounds(data.notificationSounds);
      } catch (error) {
        console.error("Error fetching settings:", error);
        setError("Failed to fetch settings. Please try again.");
      }
    };

    fetchSettings();
  }, []);

  const handleSaveSettings = async () => {
    try {
      const updatedSettings = {
        displayName,
        profilePicture,
        statusMessage,
        visibility,
        readReceipts,
        onlineStatus,
        notificationAlerts,
        notificationSounds,
      };
      await updateSettings(updatedSettings);
      setError(null);
      alert("Settings saved successfully!");
    } catch (error) {
      console.error("Error saving settings:", error);
      setError("Failed to save settings. Please try again.");
    }
  };

  return (
    <div className="settings">
      <h2>Settings</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="setting-section">
        <h3>Profile</h3>
        <div className="setting-item">
          <label htmlFor="displayName">Display Name:</label>
          <input
            type="text"
            id="displayName"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
          />
        </div>
        <div className="setting-item">
          <label htmlFor="profilePicture">Profile Picture:</label>
          <input
            type="text"
            id="profilePicture"
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </div>
        <div className="setting-item">
          <label htmlFor="statusMessage">Status Message:</label>
          <input
            type="text"
            id="statusMessage"
            value={statusMessage}
            onChange={(e) => setStatusMessage(e.target.value)}
          />
        </div>
      </div>
      <div className="setting-section">
        <h3>Privacy</h3>
        <div className="setting-item">
          <label htmlFor="visibility">Visibility:</label>
          <select
            id="visibility"
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="public">Public</option>
            <option value="private">Private</option>
          </select>
        </div>
        <div className="setting-item">
          <label htmlFor="readReceipts">Read Receipts:</label>
          <input
            type="checkbox"
            id="readReceipts"
            checked={readReceipts}
            onChange={(e) => setReadReceipts(e.target.checked)}
          />
        </div>
        <div className="setting-item">
          <label htmlFor="onlineStatus">Online Status:</label>
          <input
            type="checkbox"
            id="onlineStatus"
            checked={onlineStatus}
            onChange={(e) => setOnlineStatus(e.target.checked)}
          />
        </div>
      </div>
      <div className="setting-section">
        <h3>Notifications</h3>
        <div className="setting-item">
          <label htmlFor="notificationAlerts">Alerts:</label>
          <input
            type="checkbox"
            id="notificationAlerts"
            checked={notificationAlerts}
            onChange={(e) => setNotificationAlerts(e.target.checked)}
          />
        </div>
        <div className="setting-item">
          <label htmlFor="notificationSounds">Sounds:</label>
          <input
            type="checkbox"
            id="notificationSounds"
            checked={notificationSounds}
            onChange={(e) => setNotificationSounds(e.target.checked)}
          />
        </div>
      </div>
      <div className="setting-section">
        <h3>Security</h3>
        <div className="setting-item">
          <label>Encryption Keys:</label>
          <button>Manage Keys</button>
        </div>
        <div className="setting-item">
          <label>Session Management:</label>
          <button>Manage Sessions</button>
        </div>
        <div className="setting-item">
          <label>Account Deletion:</label>
          <button>Delete Account</button>
        </div>
      </div>
      <button className="save-button" onClick={handleSaveSettings}>
        Save Settings
      </button>
    </div>
  );
}

export default Settings;
