const express = require("express");
const purchaseController = require("../controllers/purchaseController");
const authMiddleware = require('../middleware/auth');


const router = express.Router();

router.get('/purchases', authMiddleware,purchaseController.all);
router.get('/purchases/:id', authMiddleware, purchaseController.get);
router.post('/purchases',authMiddleware, purchaseController.create);
router.put('/purchases/:id', authMiddleware, purchaseController.update);
router.delete('/purchases/:id', authMiddleware, purchaseController.delete);

module.exports = router;