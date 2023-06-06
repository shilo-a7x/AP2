const { createUser, authenticateUser, getUser } = require('../services/LogisterServices');
const { createChat, getContactList, getChat, createMessage, getMessages, deleteChat } = require('../services/ChatServices');
const {createChat} = require("../services/ChatServices");


exports.createUser = async (req, res) => {
    try {
        await createUser(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.authenticateUser = async (req, res) => {
    try {
        await authenticateUser(req, res);
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
        res.status(500).json({message: error.message});
    }
};

exports.getContactList = async (req, res) => {
    try {
        await getContactList(req, res);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getChat = async (req, res) => {
    try {
        await getChat(req, res);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.createMessage = async (req, res) => {
    try {
        await createMessage(req, res);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getMessages = async (req, res) => {
    try {
        await getMessages(req, res);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.deleteChat = async (req, res) => {
    try {
        await deleteChat(req, res);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};