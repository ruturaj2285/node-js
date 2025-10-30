// app.js
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

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

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
