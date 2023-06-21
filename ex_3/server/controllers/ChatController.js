const {
    createChat,
    getContacts,
    getChat,
    createMessage,
    getMessages,
    deleteChat,
} = require("../services/ChatServices");

const { extractToken, verify } = require("../tokens/JwtAuthenticator");

exports.createChat = async (req, res) => {
    const token = extractToken(req);
    if (!token) {
        return res.status(403).json({ message: "Token not provided" });
    }
    if (!verify(token)) {
        return res.status(401).json({ message: "Invalid token" });
    }
    try {
        await createChat(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getContacts = async (req, res) => {
    const token = extractToken(req);
    if (!token) {
        return res.status(403).json({ message: "Token not provided" });
    }
    if (!verify(token)) {
        return res.status(401).json({ message: "Invalid token" });
    }
    try {
        await getContacts(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getChat = async (req, res) => {
    const token = extractToken(req);
    if (!token) {
        return res.status(403).json({ message: "Token not provided" });
    }
    if (!verify(token)) {
        return res.status(401).json({ message: "Invalid token" });
    }
    try {
        await getChat(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    const token = extractToken(req);
    if (!token) {
        return res.status(403).json({ message: "Token not provided" });
    }
    if (!verify(token)) {
        return res.status(401).json({ message: "Invalid token" });
    }
    try {
        await createMessage(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllMessages = async (req, res) => {
    const token = extractToken(req);
    if (!token) {
        return res.status(403).json({ message: "Token not provided" });
    }
    if (!verify(token)) {
        return res.status(401).json({ message: "Invalid token" });
    }
    try {
        await getMessages(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteChat = async (req, res) => {
    const token = extractToken(req);
    if (!token) {
        return res.status(403).json({ message: "Token not provided" });
    }
    if (!verify(token)) {
        return res.status(401).json({ message: "Invalid token" });
    }
    try {
        await deleteChat(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
