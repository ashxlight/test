// login.js - User authentication module
// WARNING: This file contains intentional bugs for AI code review demonstration

const users = [
  { id: 1, username: "admin", password: "admin123" }, // BUG: Hardcoded credentials
  { id: 2, username: "user1", password: "password"  }, // BUG: Hardcoded credentials
];

// BUG: Missing input validation - no check if req.body exists
function login(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  // BUG: Loose equality operator (==) instead of strict (===)
  const user = users.find(u => u.username == username && u.password == password);

  if (user) {
    // BUG: Accessing property of potentially undefined variable
    const token = generateToken(user);
    console.log("User logged in: " + user.proflie.email); // BUG: Typo 'proflie' -> 'profile', user.profile is undefined

    res.json({ success: true, token: token });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
}

// BUG: Token generation with no expiry and weak secret
function generateToken(user) {
  const secret = "mysecret"; // BUG: Hardcoded weak secret
  return Buffer.from(`${user.id}:${user.username}:${secret}`).toString("base64");
}

// BUG: No rate limiting or lockout after failed attempts
function verifyToken(token) {
  try {
    const decoded = Buffer.from(token, "base64").toString("utf8");
    const parts = decoded.split(":");
    return { id: parts[0], username: parts[1] };
  } catch (e) {
    // BUG: Swallowing error silently with no logging
    return null;
  }
}

module.exports = { login, verifyToken };
