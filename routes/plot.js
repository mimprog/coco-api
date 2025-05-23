const express = require("express");
const plotController = require("../controllers/plotController");
const authMiddleware = require('../middleware/auth');


const router = express.Router();

router.get('/plots', authMiddleware, plotController.all);
router.get('/plots/:code', authMiddleware, plotController.get);
router.post('/plots', authMiddleware, plotController.create);
router.put('/plots/:code', authMiddleware, plotController.update);
router.put('/update-coords/:code', authMiddleware, plotController.updateCoords);
router.delete('/plots/:code', authMiddleware, plotController.delete);

module.exports = router;