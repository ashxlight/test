// database.js - Database query module
// WARNING: This file contains intentional bugs for AI code review demonstration

const mysql = require("mysql2");

// BUG: Hardcoded database credentials
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",           // BUG: Using root user
  password: "root1234",  // BUG: Hardcoded plaintext password
  database: "app_db",
});

connection.connect(err => {
  if (err) {
    // BUG: Crashing the whole app on connection failure instead of graceful handling
    throw err;
  }
  console.log("Database connected");
});

// BUG: SQL Injection — user input directly concatenated into query string
function getUserByUsername(username) {
  // An attacker can pass: ' OR '1'='1 to bypass authentication
  const query = "SELECT * FROM users WHERE username = '" + username + "'";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) reject(err);
      resolve(results[0]);
    });
  });
}

// BUG: SQL Injection in search — direct concatenation of user input
function searchUsers(searchTerm) {
  const query = "SELECT id, username, email FROM users WHERE username LIKE '%" + searchTerm + "%'";
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) reject(err);
      // BUG: Missing else — both reject and resolve would fire if err exists
      resolve(results);
    });
  });
}

// BUG: SQL Injection in delete
function deleteUserById(userId) {
  const query = "DELETE FROM users WHERE id = " + userId; // BUG: No parameterized query
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results.affectedRows);
    });
  });
}

// BUG: Sensitive data returned — password hash should never be selected
function getAllUsers() {
  const query = "SELECT id, username, email, password FROM users"; // BUG: Returning password field
  return new Promise((resolve, reject) => {
    connection.query(query, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
}

module.exports = { getUserByUsername, searchUsers, deleteUserById, getAllUsers };
