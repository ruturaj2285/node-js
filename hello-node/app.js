// app.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware to parse JSON body
app.use(express.json());

// Simple Bearer Token Authentication Middleware
const authenticate = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1]; // Extract token after 'Bearer'

  // Replace with your own token or logic (e.g., from env var or DB)
  const VALID_TOKEN = process.env.API_TOKEN || "mysecrettoken";

  if (!token) {
    return res.status(401).json({ error: "Missing Authorization header" });
  }

  if (token !== VALID_TOKEN) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }

  next(); // Authentication successful
};

// Root API
app.get("/", (req, res) => {
  res.send("Hello World from Node.js inside Docker!");
});

// New API 1: /hello
app.get("/hello", (req, res) => {
  res.json({ message: "Hello, this is the /hello endpoint!" });
});

// New API 2: /status
app.get("/status", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
  });
});

// 🔒 Authenticated API: /secure
app.get("/secure", authenticate, (req, res) => {
  res.json({
    message: "You have accessed a secure API!",
    user: "Authorized User",
    time: new Date().toISOString(),
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
