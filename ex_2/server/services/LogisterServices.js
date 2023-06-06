const User = require("../models/User");

const register = async (user) => {
    try {
        const newUser = {
            username: user.username,
            password: user.password,
            displayName: user.displayName,
            profilePic: user.profilePic
        }
        const response = await new User(newUser).save();
        return response;
    }
    catch (error) {
        console.log(`Could not  ${error}`)
    }
}

module.exports = { register };

const {User} = require('../models/User');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
    const { username, password, displayName, profilePic } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' });
        }

        // Create new user
        const newUser = new User({ username, password, displayName, profilePic });
        await newUser.save();

        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.authenticateUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user || !user.comparePassword(password)) {
            return res.status(400).json({ message: 'Invalid username or password.' });
        }
        const token = jwt.sign({ userId: user._id }, 'hello', { expiresIn: '10000h' }); // Replace 'secret' with your actual secret
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    const { username } = req.params;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};