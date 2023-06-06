const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema(
    {
        username: {
            type: String,
            nullable: true,
            required: true
        },

        password: {
            type: String,
            nullable: true,
            required: true
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

module.exports = UserPassName = mongoose.model("User", userSchema);