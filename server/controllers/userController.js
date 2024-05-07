const User = require("../models/User");
const Contact = require("../models/Contact");
const Chat = require("../models/Chat");
const Settings = require("../models/Settings");

exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });
    res.json(contacts);
  } catch (error) {
    console.error("Error fetching contacts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getChats = async (req, res) => {
  try {
    const chats = await Chat.find({ participants: req.user._id })
      .populate("participants", "username")
      .sort("-updatedAt");
    res.json(chats);
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne({ user: req.user._id });
    if (!settings) {
      // If settings don't exist, create default settings
      const newSettings = new Settings({
        user: req.user._id,
        displayName: req.user.username,
        profilePicture: "",
        statusMessage: "",
        visibility: "public",
        readReceipts: true,
        onlineStatus: true,
        notificationAlerts: true,
        notificationSounds: true,
      });
      await newSettings.save();
      return res.json(newSettings);
    }
    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const {
      displayName,
      profilePicture,
      statusMessage,
      visibility,
      readReceipts,
      onlineStatus,
      notificationAlerts,
      notificationSounds,
    } = req.body;

    const updatedSettings = await Settings.findOneAndUpdate(
      { user: req.user._id },
      {
        displayName,
        profilePicture,
        statusMessage,
        visibility,
        readReceipts,
        onlineStatus,
        notificationAlerts,
        notificationSounds,
      },
      { new: true }
    );

    res.json(updatedSettings);
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const { name, email } = req.body;
    const userId = req.user._id;

    // Find the user by ID and update the profile fields
    const user = await User.findByIdAndUpdate(
      userId,
      { name, email },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error updating user profile:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};