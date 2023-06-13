const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const chatSchema = Schema({
    id: {
        type: String,
    },
    users: [
        {
            type: String,
            ref: "User.username",
            index: true,
            nullable: true,
        },
    ],
});

module.exports = { Chat: mongoose.model("Chat", chatSchema) };
