// router.js - Updated to match your existing API structure
const express = require('express');
const router = express.Router();

// Sample user data (replace with your database)
let users = [
  { id: 1, name: "John Doe", username: "johndoe", email: "john@example.com" },
  { id: 2, name: "Jane Smith", username: "janesmith", email: "jane@example.com" }
];

// GET all users - matches your existing endpoint
router.get('/api/user', (req, res) => {
  try {
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
});

// GET single user by ID
router.get('/api/user/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const user = users.find(u => u.id === userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
});

// POST create user - matches your original form1 endpoint
router.post('/form1', (req, res) => {
  try {
    const { name, username, email } = req.body;
    
    if (!name || !username || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if username or email already exists
    const existingUser = users.find(u => u.username === username || u.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    
    const newUser = {
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
      name,
      username,
      email
    };
    
    users.push(newUser);
    res.status(200).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// PUT update user
router.put('/api/user/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const { name, username, email } = req.body;
    
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (!name || !username || !email) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    
    // Check if username or email already exists for other users
    const existingUser = users.find(u => u.id !== userId && (u.username === username || u.email === email));
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }
    
    users[userIndex] = { ...users[userIndex], name, username, email };
    res.status(200).json({ message: 'User updated successfully', user: users[userIndex] });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
});

// DELETE user
router.delete('/api/user/:id', (req, res) => {
  try {
    const userId = parseInt(req.params.id);
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const deletedUser = users.splice(userIndex, 1)[0];
    res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
});

module.exports = router;