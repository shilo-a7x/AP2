const jwt = require("jsonwebtoken");
const key =
    "165cca14a395ce950841f7d667235e2a53856f64aac78cac9f4087fc145c8e836f546271b6a9dba33de52389a04cdfc4";

exports.sign = (data) => {
    try {
        const token = jwt.sign(data, key, { expiresIn: "10000h" });
        return token;
    } catch (e) {
        return null;
    }
};

exports.verify = (token) => {
    try {
        const decodedToken = jwt.verify(token, key);
        return decodedToken;
    } catch (e) {
        return null;
    }
};

exports.decode = (token) => {
    return jwt.decode(token);
};

exports.extractToken = (req) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        return token;
    } catch (e) {
        return null;
    }
};
