const {
    createUser,
    verifyUser,
    getUser,
} = require("../services/LogisterServices");
const {
    sign,
    verify,
    decode,
    extractToken,
} = require("../tokens/JwtAuthenticator");

exports.createUser = async (req, res) => {
    let errors = [];
    // validate username
    if (!req.body.username || !/^[a-zA-Z0-9]{3,}$/.test(req.body.username)) {
        errors.push(
            "Invalid username. It should be at least 3 characters long and alphanumeric."
        );
    }
    // validate password
    if (
        !req.body.password ||
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/.test(
            req.body.password
        )
    ) {
        errors.push(
            "Invalid password. It should be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, one number and one special character."
        );
    }
    // validate display name
    if (
        !req.body.displayName ||
        !/^[a-zA-Z0-9\s\-',.]{3,}$/.test(
            req.body.displayName.trim().replace(/\s+/g, " ")
        )
    ) {
        errors.push(
            "Invalid display name. It should only contain letters, numbers, spaces, hyphens, apostrophes, periods, and commas."
        );
    }
    // validate profile picture
    if (
        !req.body.profilePic ||
        !/^data:image\/(jpeg|png|gif|bmp|svg\+xml);base64,([a-zA-Z0-9+/=])+$/.test(
            req.body.profilePic
        )
    ) {
        errors.push(
            "Invalid profile picture. It should be a valid image file encoded in base64."
        );
    }
    if (errors.length > 0) {
        return res.status(400).json({ message: errors.join("\n") });
    }
    try {
        await createUser(req, res);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.verifyUser = async (req, res) => {
    const data = await verifyUser(req, res);
    if (!data) {
        return res
            .status(400)
            .json({ message: "Invalid username or password" });
    }
    const token = sign(data);
    if (!token) {
        return res
            .status(500)
            .json({ message: "Internal server error. Cannot sign token" });
    }
    return res.status(200).send(token);
};

exports.getUser = async (req, res) => {
    const token = extractToken(req);
    if (!token) {
        return res.status(403).json({ message: "Token not provided" });
    }
    if (!verify(token)) {
        return res.status(401).json({ message: "Invalid token" });
    }
    return await getUser(req, res);
};
