// // router.js - Updated to match your existing API structure
// const express = require('express');
// const router = express.Router();

// // Sample user data (replace with your database)
// let users = [
//   { id: 1, name: "John Doe", username: "johndoe", email: "john@example.com" },
//   { id: 2, name: "Jane Smith", username: "janesmith", email: "jane@example.com" }
// ];

// // GET all users - matches your existing endpoint
// router.get('/api/user', (req, res) => {
//   try {
//     res.status(200).json(users);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching users', error: error.message });
//   }
// });

// // GET single user by ID
// router.get('/api/user/:id', (req, res) => {
//   try {
//     const userId = parseInt(req.params.id);
//     const user = users.find(u => u.id === userId);
    
//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     res.status(200).json(user);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching user', error: error.message });
//   }
// });

// // POST create user - matches your original form1 endpoint
// router.post('/form1', (req, res) => {
//   try {
//     const { name, username, email } = req.body;
    
//     if (!name || !username || !email) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
    
//     // Check if username or email already exists
//     const existingUser = users.find(u => u.username === username || u.email === email);
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username or email already exists' });
//     }
    
//     const newUser = {
//       id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1,
//       name,
//       username,
//       email
//     };
    
//     users.push(newUser);
//     res.status(200).json({ message: 'User created successfully', user: newUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Error creating user', error: error.message });
//   }
// });

// // PUT update user
// router.put('/api/user/:id', (req, res) => {
//   try {
//     const userId = parseInt(req.params.id);
//     const { name, username, email } = req.body;
    
//     const userIndex = users.findIndex(u => u.id === userId);
    
//     if (userIndex === -1) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     if (!name || !username || !email) {
//       return res.status(400).json({ message: 'All fields are required' });
//     }
    
//     // Check if username or email already exists for other users
//     const existingUser = users.find(u => u.id !== userId && (u.username === username || u.email === email));
//     if (existingUser) {
//       return res.status(400).json({ message: 'Username or email already exists' });
//     }
    
//     users[userIndex] = { ...users[userIndex], name, username, email };
//     res.status(200).json({ message: 'User updated successfully', user: users[userIndex] });
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating user', error: error.message });
//   }
// });

// // DELETE user
// router.delete('/api/user/:id', (req, res) => {
//   try {
//     const userId = parseInt(req.params.id);
//     const userIndex = users.findIndex(u => u.id === userId);
    
//     if (userIndex === -1) {
//       return res.status(404).json({ message: 'User not found' });
//     }
    
//     const deletedUser = users.splice(userIndex, 1)[0];
//     res.status(200).json({ message: 'User deleted successfully', user: deletedUser });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting user', error: error.message });
//   }
// });

// module.exports = router;









// const express = require("express");

// const sqlDbconnect= require("./dbconnect");

// const Router = express.Router();
 
// Router.get("/",(req, res)=>{
//   const userData=[{name:"Johnxyz",email:"john@gmail.com", age:34},
//                    {name:"John12345",email:"john111@gmail.com", age:341}
                 
//   ];
//                     res.send(userData);

// });

// Router.get("/api/user", (req,res)=>{
//   sqlDbconnect.query("select * from form1",(err, rows)=>{
//     if(!err)
//     {
//       res.send(rows);
//     } else{
//       console.log(err);
//   }

//   });
//   });



// Router.post("/api/adduser", (req, res) => {
//   const { name, username, email } = req.body;

//   const sql = `INSERT INTO form1 (name, username, email) VALUES (?, ?, ?)`;

//   sqlDbconnect.query(sql, [name, username, email], (err, result) => {
//     if (!err) {
//       console.log("Insert ID:", result.insertId);
//       res.status(200).json("User registration inserted successfully");
//     } else {
//       console.log(err);
//       res.status(500).json("Database error");
//     }
//   });
// });


// module.exports= Router;






// router.js (Corrected)

const express = require("express");
const sqlDbconnect = require("./dbconnect");
const Router = express.Router();

// This route is not used by your main app, but is fine to keep for testing
Router.get("/", (req, res) => {
  const userData = [
    { name: "Johnxyz", email: "john@gmail.com", age: 34 },
    { name: "John12345", email: "john111@gmail.com", age: 341 },
  ];
  res.send(userData);
});

// --- FIX IS HERE ---
// The route is now '/user' because '/api' is handled by server.js
// The final URL is: GET /api/user
Router.get("/user", (req, res) => {
  sqlDbconnect.query("SELECT * FROM form1", (err, rows) => {
    if (!err) {
      res.send(rows);
    } else {
      console.log(err);
      res.status(500).send("Error fetching users from database.");
    }
  });
});

Router.post("/adduser", (req, res) => {
  console.log("Received request to add user:", req.body); // ✅ Add this for debugging

  const { name, username, email } = req.body;

  if (!name || !username || !email) {
    return res.status(400).json("All fields (name, username, email) are required.");
  }

  const sql = `INSERT INTO form1 (name, username, email) VALUES (?, ?, ?)`;
  sqlDbconnect.query(sql, [name, username, email], (err, result) => {
    if (!err) {
      console.log("Insert success:", result);
      res.status(201).json("User registered successfully");
    } else {
      console.error("Insert failed:", err);
      res.status(500).json("Database error");
    }
  });
});


module.exports = Router;