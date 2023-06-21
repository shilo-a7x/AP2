const { Chat } = require("../models/Chat");
const { User } = require("../models/User");
const { Message } = require("../models/Message");
const { decode, extractToken } = require("../tokens/JwtAuthenticator");

// scheme: { id, users: ['tom', 'jerry']}
// returns { id: string, user: User }
exports.createChat = async (req, res) => {
    const { username: contactUsername } = req.body;
    const token = extractToken(req);
    const decodedToken = decode(token);
    const { username } = decodedToken;
    if (username === contactUsername) {
        return res
            .status(400)
            .json({ message: "Cannot create chat with yourself." });
    }
    try {
        //  Check if Users exist
        const currentUser = await User.findOne({ username });
        const contactUser = await User.findOne({ username: contactUsername });
        if (!currentUser || !contactUser) {
            return res.status(404).json({ message: "User not found." });
        }

        const newChat = await Chat.create({
            users: [username, contactUsername],
        });
        if (!newChat) {
            return res
                .status(400)
                .json({ message: "Error while creating new chat." });
        }
        res.status(201).json({ id: newChat.id, user: contactUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getContacts = async (req, res) => {
    const token = extractToken(req);
    const decodedToken = decode(token);
    const { username } = decodedToken;

    try {
        const chats = await Chat.find({ users: { $in: [username] } }); // id: string, users: ['tom', 'test'],
        const finalChats = await Promise.all(
            chats.map(async (chat) => {
                const contactUser = chat.users.find(
                    (user) => user !== username
                );
                const user = await User.findOne({ username: contactUser });
                const lastMessage = await Message.findOne(
                    { chatId: chat.id },
                    { sender: 0 }
                ).sort({ created: -1 });
                return { id: chat.id, user, lastMessage };
            })
        );
        res.status(200).json(finalChats);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getChat = async (req, res) => {
    const chatId = req.params.id;

    try {
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found." });
        }

        const users = await User.find(
            { username: { $in: chat.users } },
            "username displayName profilePic"
        );
        const populatedChat = { id: chatId, users };

        const messages = await Message.find({ chatId }, { chatId: 0 });
        const populatedMessages = [];

        for (const message of messages) {
            const sender = users.find(
                (user) => user.username === message.sender.username
            );
            const formattedMessage = {
                id: message.id,
                created: message.created,
                sender,
                content: message.content,
            };
            populatedMessages.push(formattedMessage);
        }

        populatedChat.messages = populatedMessages;

        res.status(200).json(populatedChat);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.createMessage = async (req, res) => {
    const chatId = req.params.id;
    const msg = req.body.msg;
    const token = extractToken(req);
    const decodedToken = decode(token);
    const { username } = decodedToken;

    try {
        // Check is chat exist
        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: "Chat not found." });
        }
        // Create new message
        const newMessage = await Message.create({
            chatId,
            sender: { username },
            content: msg,
        });

        res.status(201).json(newMessage);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getMessages = async (req, res) => {
    const chatId = req.params.id;
    try {
        const messages = await Message.find(
            { chatId },
            { id: "$_id", _id: 0, content: 1, created: 1, sender: 1 }
        ).sort({ created: -1 });
        if (!messages) {
            return res.status(404).json({ message: "Messages not found." });
        }
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteChat = async (req, res) => {
    const chatId = req.params.id;

    try {
        // Delete the chat
        const response = await Chat.deleteOne({ _id: chatId });
        if (response.deletedCount === 0) {
            return res.status(404).json({ message: "Chat not found." });
        }
        res.status(200).json({ message: "Chat deleted." });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
