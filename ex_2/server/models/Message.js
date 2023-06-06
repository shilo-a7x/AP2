const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = Schema(
    {
        content: {
            type: String,
            nullable: true
        },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        created: {
            type: Date,
            default: Date.now
        }
    }
)

module.exports = Message = mongoose.model("Message", messageSchema);

