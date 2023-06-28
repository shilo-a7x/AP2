const express = require("express");
const logisterController = require("../controllers/LogisterController");
const chatController = require("../controllers/ChatController");

const router = express.Router();

router.post("/Chats", chatController.createChat);
router.get("/Chats", chatController.getContacts);
router.get("/Chats/:id", chatController.getChat);
router.post("/Chats/:id/Messages", chatController.sendMessage);
router.get("/Chats/:id/Messages", chatController.getAllMessages);
router.delete("/Chats/:id", chatController.deleteChat);
router.post("/Users", logisterController.createUser);
router.post("/Tokens", logisterController.verifyUser);
router.get("/Users/:username", logisterController.getUser);

module.exports = router;
