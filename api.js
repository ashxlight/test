// api.js - External API integration module
// WARNING: This file contains intentional bugs for AI code review demonstration

const fetch = require("node-fetch");

const API_BASE_URL = "https://jsonplaceholder.typicode.com";

// BUG: Missing 'await' before fetch — returns a Promise object, not the response
async function getUserData(userId) {
  const response = fetch(`${API_BASE_URL}/users/${userId}`); // BUG: Missing await
  const data = response.json(); // BUG: Calling .json() on a Promise, not a Response
  return data;
}

// BUG: Incorrect promise handling — .then() result is not returned or awaited
async function getPosts(userId) {
  let posts;
  fetch(`${API_BASE_URL}/posts?userId=${userId}`)
    .then(res => res.json()) // BUG: Not awaiting or returning this chain
    .then(data => {
      posts = data;
    });
  // BUG: posts will be undefined when returned because the Promise hasn't resolved
  return posts;
}

// BUG: No error handling for network failures
async function createPost(title, body, userId) {
  const response = await fetch(`${API_BASE_URL}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body, userId }),
  });
  // BUG: No check for response.ok before parsing
  const result = await response.json();
  return result;
}

// BUG: Promise constructor anti-pattern (wrapping an already async function)
function deletePost(postId) {
  return new Promise((resolve, reject) => {
    fetch(`${API_BASE_URL}/posts/${postId}`, { method: "DELETE" })
      .then(res => {
        resolve(res.status); // BUG: Should check res.ok; status 404 would still resolve
      });
    // BUG: No .catch() — rejections are unhandled
  });
}

module.exports = { getUserData, getPosts, createPost, deletePost };
