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
    const { contactId } = req.body;
    const contact = await Contact.findOne({ user: req.user._id, contactId });

    if (contact) {
      return res.status(400).json({ error: "Contact already exists" });
    }

    const newContact = new Contact({
      user: req.user._id,
      contactId,
      // Add other contact details as needed
    });

    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    console.error("Error adding contact:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};