const { createUser, verifyUser, getUser } = require('../services/LogisterServices');
const { createChat, getContacts, getChat, sendMessage, getAllMessages, deleteChat } = require('../services/ChatServices');


exports.createUser = async (req, res) => {
    try {
        await createUser(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyUser = async (req, res) => {
    try {
        await verifyUser(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getUser = async (req, res) => {
    try {
        await getUser(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createChat = async (req, res) => {
    try {
        //  Call the service function
        await createChat(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getContacts = async (req, res) => {
    try {
        await getContacts(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getChat = async (req, res) => {
    try {
        await getChat(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.sendMessage = async (req, res) => {
    try {
        await sendMessage(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getAllMessages = async (req, res) => {
    try {
        await getAllMessages(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteChat = async (req, res) => {
    try {
        await deleteChat(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};