const express = require("express");
const cooperativeController = require("../controllers/cooperativeController");
const authMiddleware = require('../middleware/auth');


const router = express.Router();

router.get('/cooperatives', authMiddleware, cooperativeController.all);
router.get('/cooperatives/:id', authMiddleware, cooperativeController.get);
router.post('/cooperatives', authMiddleware, cooperativeController.create);
router.put('/cooperatives/:id', authMiddleware, cooperativeController.update);
router.delete('/cooperatives/:id', authMiddleware, cooperativeController.delete);

module.exports = router;