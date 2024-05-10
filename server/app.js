const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/database");
const userRoutes = require("./routes/userRoutes");
const app = express();
const server = require("http").createServer(app);
const io = require("socket.io")(server);

// Connect to MongoDB
connectDB();

// Enable CORS for all routes
app.use(cors());

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Messaging Platform API!");
});

// Rest of the server setup code...
app.use("/api/user", userRoutes);
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/chats", require("./routes/chatRoutes")(io));
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/settings", require("./routes/settingsRoutes"));

const chatController = require("./controllers/chatController")(io);

app.use((err, req, res, next) => {
  console.error("Error:", err);
  res.status(500).json({ error: "Internal server error" });
});

const port = process.env.PORT || 5000;
server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
