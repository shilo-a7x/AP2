const jwt = require('jsonwebtoken');
const Chat = require('../models/Chat');
const User = require('../models/User');
const Message = require('../models/Message');

exports.createChat = async (req, res) => {
    const {username} = req.body;
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token).token;
    const decodedToken = jwt.verify(parsedToken, 'hello'); // Replace 'secret' with your actual secret
    const userId = decodedToken.userId;

    try {
        //  Check if Users exist
        const currentUser = await User.findById(userId);
        const recivingUser = await User.findOne({username});
        if (!currentUser || !recivingUser) {
            return res.status(404).json({message: 'User not found.'});
        }
        //  Check if Chat exist
        const existingChat = await Chat.findOne({users: [currentUser, recivingUser]});
        if (existingChat) {
            return res.status(400).json({message: 'Chat already exists.'});
        }

        const newChat = new Chat({users: [currentUser, recivingUser]});
        await newChat.save();

        res.status(201).json(newChat);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getContactList = async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token).token;
    const decodedToken = jwt.verify(parsedToken, 'hello'); // Replace 'secret' with your actual secret
    const userId = decodedToken.userId;

    try {
        let result = [];
        const chats = await Chat.find({users: userId})
            .populate('users', 'username displayName profilePic')
            .populate({
                path: 'messages',
                populate: {
                    path: 'sender',
                    select: 'username displayName profilePic'
                }
            });

        for (let chat of chats) {
            let otherUser = chat.users.find(user => user._id.toString() !== userId.toString());
            let lastMessage = null;
            if (chat.messages && chat.messages.length > 0) {
                lastMessage = chat.messages.sort((a, b) => b.created - a.created)[0];
            }
            result.push({
                id: chat.id,
                user: otherUser,
                lastMessage: lastMessage
            });
        }
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getChat = async (req, res) => {
    const chatId = req.params.id;

    try {
        const chat = await Chat.findById(chatId)
            .populate('users', 'username displayName profilePic')
            .populate({
                path: 'messages',
                populate: {
                    path: 'sender',
                    select: 'username displayName profilePic'
                }
            });
        if (!chat) {
            return res.status(404).json({message: 'Chat not found.'});
        }
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.createMessage = async (req, res) => {
    const chatId = req.params.id;
    const msg = req.body.msg;
    const token = req.headers.authorization.split(' ')[1];
    const parsedToken = JSON.parse(token).token;
    const decodedToken = jwt.verify(parsedToken, 'hello'); // Replace 'secret' with your actual secret
    const userId = decodedToken.userId;

    try {
        // Check is chat exist
        const chat = await Chat.findById(chatId).populate('users', 'username displayName profilePic');
        if (!chat) {
            return res.status(404).json({message: 'Chat not found.'});
        }
        // Create new message
        const newMessage = new Message({sender: userId, content: msg});
        await newMessage.save();
        const populatedMessage = await Message.findById(newMessage._id).populate('sender', 'username displayName profilePic');

        // Update the Chat with the new message
        const updatedChat = await Chat.findOneAndUpdate(
            {_id: chatId},
            {$push: {messages: newMessage._id}},
            {new: true}  // return updated document
        );
        res.status(201).json(populatedMessage);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.getMessages = async (req, res) => {
    const chatId = req.params.id;

    try {
        const chat = await Chat.findById(chatId)
            .populate({
                path: 'messages',
                populate: {
                    path: 'sender',
                    select: 'username'
                }
            });
        if (!chat) {
            return res.status(404).json({message: 'Chat not found.'});
        }
        res.status(200).json(chat.messages);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.deleteChat = async (req, res) => {
    const chatId = req.params.id;

    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found.' });
        }

        // Delete the chat
        await Chat.deleteOne({ id: chatId });
        res.status(200).json({ message: 'Chat deleted.' });
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};