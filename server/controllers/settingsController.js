const Settings = require("../models/Settings");

exports.getSettings = async (req, res) => {
  try {
    const settings = await Settings.findOne({ user: req.user._id });
    res.json(settings);
  } catch (error) {
    console.error("Error fetching settings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const updatedSettings = await Settings.findOneAndUpdate(
      { user: req.user._id },
      req.body,
      { new: true }
    );
    res.json(updatedSettings);
  } catch (error) {
    console.error("Error updating settings:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
