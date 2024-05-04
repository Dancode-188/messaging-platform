const express = require("express");
require("dotenv").config();
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Connect to MongoDB
connectDB();

// Rest of the server setup code...

app.use("/api/user", userRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chats", require("./routes/chatRoutes"));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
