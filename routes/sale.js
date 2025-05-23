const express = require("express");
const saleController = require("../controllers/saleController");
const authMiddleware = require('../middleware/auth');


const router = express.Router();

router.get('/sales', authMiddleware, saleController.all);
router.get('/sales/:id', authMiddleware, saleController.get);
router.post('/sales', authMiddleware, saleController.create);
router.put('/sales/:id', authMiddleware, saleController.update);
router.delete('/sales/:id', authMiddleware, saleController.delete);

module.exports = router;