const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        username: {
            type: String,
            nullable: true,
            required: true,
            index: true,
        },

        password: {
            type: String,
            nullable: true,
            required: true,
            select: false,
        },

        displayName: {
            type: String,
            nullable: true,
            required: true
        },

        profilePic: {
            type: String,
            nullable: true,
            required: true
        }
    }
)

module.exports = { User : mongoose.model("User", userSchema)};
