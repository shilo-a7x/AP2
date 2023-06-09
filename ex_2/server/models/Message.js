const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const messageSchema = Schema(
    {
        chatId: {
            type: String
        },
        content: {
            type: String,
            nullable: true
        },
        sender: {
            username: String
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = { Message : mongoose.model("Message", messageSchema)};

