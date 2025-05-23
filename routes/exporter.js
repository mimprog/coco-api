const express = require("express");
const exporterController = require("../controllers/exporterController");
const authMiddleware = require('../middleware/auth');


const router = express.Router();

router.get('/exporters', authMiddleware, exporterController.all);
router.get('/exporters/:id', authMiddleware, exporterController.get);
router.post('/exporters', authMiddleware, exporterController.create);
router.put('/exporters/:id', authMiddleware, exporterController.update);
router.delete('/exporters/:id', authMiddleware, exporterController.delete);

module.exports = router;