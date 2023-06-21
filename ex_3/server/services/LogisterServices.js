const { User } = require("../models/User");

exports.createUser = async (req, res) => {
    const { username, password, displayName, profilePic } = req.body;

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res
                .status(409)
                .json({ message: "Username already exists." });
        }

        // Create new user
        const newUser = new User({
            username,
            password,
            displayName,
            profilePic,
        });
        await newUser.save();

        res.status(200).send();
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username, password });
        if (!user) {
            return null;
        }
        const data = { userId: user._id, username: user.username };
        return data;
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    const { username } = req.params;
    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }
        const { displayName, profilePic } = user;
        const filteredUser = { username, displayName, profilePic };
        res.status(200).json(filteredUser);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
