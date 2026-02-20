const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3001;
const USERS_FILE = path.join(__dirname, "users.json");

app.use(cors());
app.use(express.json());

function readUsers() {
  try {
    const data = fs.readFileSync(USERS_FILE, "utf8");
    return JSON.parse(data);
  } catch (e) {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2), "utf8");
}

// Register
app.post("/api/register", (req, res) => {
  const { username, login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ success: false, message: "Login and password required." });
  }
  const users = readUsers();
  if (users.some((u) => u.login === login)) {
    return res.status(400).json({ success: false, message: "A user with this login already exists." });
  }
  if (password.length < 8) {
    return res.status(400).json({ success: false, message: "Password must be at least 8 characters long." });
  }
  const newUser = { username: username || login, login, password };
  users.push(newUser);
  writeUsers(users);
  res.json({ success: true, message: "Registration successful!" });
});

// Login
app.post("/api/login", (req, res) => {
  const { login, password } = req.body;
  if (!login || !password) {
    return res.status(400).json({ success: false, message: "Login and password required." });
  }
  const users = readUsers();
  const user = users.find((u) => u.login === login && u.password === password);
  if (!user) {
    return res.status(401).json({ success: false, message: "Invalid login or password." });
  }
  const { password: _, ...userWithoutPassword } = user;
  res.json({ success: true, user: userWithoutPassword });
});

// Update user (for profile)
app.put("/api/users/:login", (req, res) => {
  const { login } = req.params;
  const { username, password } = req.body;
  const users = readUsers();
  const index = users.findIndex((u) => u.login === login);
  if (index === -1) {
    return res.status(404).json({ success: false, message: "User not found." });
  }
  if (username !== undefined) users[index].username = username;
  if (password !== undefined && password.length >= 8) users[index].password = password;
  writeUsers(users);
  const { password: _, ...updated } = users[index];
  res.json({ success: true, user: updated });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
