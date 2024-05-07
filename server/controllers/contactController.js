const Contact = require("../models/Contact");

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getRecentContacts = async (req, res) => {
  try {
    const recentContacts = await Contact.find({ user: req.user._id })
      .sort({ lastInteraction: -1 })
      .limit(5);
    res.json(recentContacts);
  } catch (error) {
    console.error("Error fetching recent contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addContact = async (req, res) => {
  try {
    const { name, profilePicture, status } = req.body;
    const userId = req.user._id;

    if (!name) {
      return res.status(400).json({ error: "Name field is required" });
    }

    const newContact = new Contact({
      user: userId,
      name,
      profilePicture,
      status,
    });

    const savedContact = await newContact.save();

    res.status(201).json(savedContact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteContact = async (req, res) => {
  try {
    const { contactId } = req.params;
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      return res.status(404).json({ error: "Contact not found" });
    }

    res.json({ message: "Contact deleted successfully" });
  } catch (error) {
    console.error("Error deleting contact:", error);
    if (error.name === "CastError" && error.kind === "ObjectId") {
      // Handle invalid ObjectId format
      res.status(400).json({ error: "Invalid contact ID" });
    } else {
      // Handle other errors
      res.status(500).json({ error: "Internal server error" });
    }
  }
};