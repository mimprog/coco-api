const express = require("express");
const userController = require("../controllers/userController");
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.get('/users', authMiddleware, userController.all);
router.get('/users/:code', authMiddleware, userController.get);
router.post('/users', authMiddleware, userController.create);
router.put('/users/:code', authMiddleware, userController.update);
router.delete('/users/:code', authMiddleware, userController.delete);
router.delete('/delete-account', authMiddleware, userController.deleteAccount);

module.exports = router;