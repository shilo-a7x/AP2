const express = require('express');
const controller = require('../Controllers/Controller');

const router = express.Router();

router.post('/Chats', controller.createChat);
router.get('/Chats', controller.getContactList);
router.get('/Chats/:id', controller.getChat);
router.post('/Chats/:id/Messages', controller.createMessage);
router.get('/Chats/:id/Messages', controller.getMessages);
router.delete('/Chats/:id',controller.deleteChat);
router.post('/Users', controller.createUser);
router.post('/Tokens', controller.authenticateUser);
router.get('/Users/:username', controller.getUser);

module.exports = router;