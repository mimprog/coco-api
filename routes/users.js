const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/users', userController.all);
router.get('/users/:code', userController.get);
router.post('/users', authMiddleware, userController.create);
router.put('/users/:code', userController.update);
router.delete('/users/:code', userController.delete);
router.delete('/delete-account', userController.deleteAccount);

module.exports = router;