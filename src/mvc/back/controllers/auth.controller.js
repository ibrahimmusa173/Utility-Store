const User = require("../models/user.model.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

// IMPORTANT: Store this in an environment variable (.env file) in a real app
const JWT_SECRET = "your_super_secret_key_12345"; 

exports.register = (req, res) => {
    const { name, username, email, password } = req.body;
    if (!name || !email || !password || !username) {
        return res.status(400).send({ message: "Please provide all required fields." });
    }

    const user = new User({ name, username, email, password });

    User.create(user, (err, data) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).send({ message: "Email or username already exists." });
            }
            return res.status(500).send({ message: err.message || "Error registering user." });
        }
        res.status(201).send({ message: "User registered successfully!", user: data });
    });
};

exports.login = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).send({ message: "Email and password are required." });
    }

    User.findByEmail(email, (err, user) => {
        if (err) {
            if (err.kind === "not_found") {
                return res.status(401).send({ message: "Invalid email or password." });
            }
            return res.status(500).send({ message: "Error retrieving user." });
        }

        const passwordIsValid = bcrypt.compareSync(password, user.password);

        if (!passwordIsValid) {
            return res.status(401).send({ message: "Invalid email or password." });
        }

        const token = jwt.sign({ id: user.id }, JWT_SECRET, {
            expiresIn: 86400 // 24 hours
        });

        res.status(200).send({
            message: "Login successful!",
            token,
            user: { id: user.id, name: user.name, email: user.email, username: user.username }
        });
    });
};

// --- PASSWORD RESET FUNCTIONS ---

exports.forgotPassword = (req, res) => {
    const { email } = req.body;
    User.findByEmail(email, (err, user) => {
        if (err || !user) {
            return res.status(200).send({ message: "If an account with that email exists, a password reset link has been sent." });
        }
        
        const resetToken = crypto.randomBytes(20).toString('hex');
        const hashedToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const expireDate = new Date(Date.now() + 15 * 60 * 1000); 

        // FIX 1: Removed the unused second parameter from the callback.
        User.saveResetToken(user.email, hashedToken, expireDate, (err) => {
            if(err) {
                console.error("Error saving reset token:", err);
                return res.status(200).send({ message: "If an account with that email exists, a password reset link has been sent." });
            }

            const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;
            console.log("Password Reset URL (for testing):", resetUrl);
            
            res.status(200).send({ 
                message: "If an account with that email exists, a password reset link has been sent.",
                _testing_resetUrl: resetUrl 
            });
        });
    });
};

exports.resetPassword = (req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
        return res.status(400).send({ message: "Password is required and must be at least 6 characters long." });
    }

    const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

    User.findByResetToken(hashedToken, (err, user) => {
        if (err || !user) {
            return res.status(400).send({ message: "Password reset token is invalid or has expired." });
        }

        // FIX 2: Removed the unused second parameter from the callback.
        User.updatePassword(user.id, password, (err) => {
            if (err) {
                return res.status(500).send({ message: "Error updating password." });
            }
            res.send({ message: "Password has been reset successfully." });
        });
    });
};