import React, { useState, useEffect, useContext } from "react";
import {
  getContacts,
  getRecentContacts,
  addContact,
} from "../../services/contactService";
import "./ContactList.css";
import { AuthContext } from "../../AuthContext";

function ContactList({ onContactSelect }) {
  const [contacts, setContacts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [recentContacts, setRecentContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchContacts = async () => {
      try {
        const data = await getContacts(user.token);
        setContacts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching contacts:", error);
        setError("Failed to fetch contacts. Please try again.");
        setLoading(false);
      }
    };

    const fetchRecentContacts = async () => {
      try {
        const data = await getRecentContacts(user.token);
        setRecentContacts(data);
      } catch (error) {
        console.error("Error fetching recent contacts:", error);
        setError("Failed to fetch recent contacts. Please try again.");
      }
    };

    fetchContacts();
    fetchRecentContacts();
  }, [user.token]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleQRCodeScan = async () => {
    try {
      // Implement QR code scanning logic here
      const scannedContactId = "scanned_contact_id";
      const newContact = await addContact(scannedContactId);
      setContacts([...contacts, newContact]);
    } catch (error) {
      console.error("Error scanning QR code:", error);
      setError("Failed to scan QR code. Please try again.");
    }
  };

  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="contact-list">Loading...</div>;
  }

  if (error) {
    return <div className="contact-list">{error}</div>;
  }

  return (
    <div className="contact-list">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search contacts..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleQRCodeScan}>Scan QR Code</button>
      </div>
      <div className="recent-contacts">
        <h3>Recent Contacts</h3>
        {recentContacts.length === 0 ? (
          <div className="empty-state">No recent contacts available.</div>
        ) : (
          recentContacts.map((contact) => (
            <button
              key={contact._id}
              className="contact-item"
              onClick={() => onContactSelect(contact._id)}
            >
              <img
                src={contact.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
              <div className="contact-info">
                <h4>{contact.name}</h4>
                <p>{contact.status}</p>
              </div>
            </button>
          ))
        )}
      </div>
      <div className="contact-list-items">
        <h3>All Contacts</h3>
        {filteredContacts.length === 0 ? (
          <div className="empty-state">No contacts available.</div>
        ) : (
          filteredContacts.map((contact) => (
            <button
              key={contact._id}
              className="contact-item"
              onClick={() => onContactSelect(contact._id)}
            >
              <img
                src={contact.profilePicture}
                alt="Profile"
                className="profile-picture"
              />
              <div className="contact-info">
                <h4>{contact.name}</h4>
                <p>{contact.status}</p>
              </div>
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default ContactList;
