const UserPassName = require("../models/UserPassName");

const register = async (user) => {
    try {
        const newUser = {
            username: user.username,
            password: user.password,
            displayName: user.displayName,
            profilePic: user.profilePic
        }
        const response = await new UserPassName(newUser).save();
        return response;
    }
    catch (error) {
        console.log(`Could not  ${error}`)
    }
}

module.exports = { register };