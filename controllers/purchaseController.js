const db = require('../db');
const { Purchase } = require('../models/models');

exports.all = async (req, res) => {
    try {
        const purchases = await Purchase.findAll({ order: [['date', 'DESC']] });
        res.status(200).json(purchases);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.get = async (req, res) => {
    const { id } = req.params;

    try {
        const purchase = await Purchase.findOne({ where: { 'id': id } });

        if(purchase == null)
        {
            return res.status(404).json("Cet achat n'existe pas");    
        }
        res.status(200).json(purchase);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

/**
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * quantity (kg)
 * price (XAF) 
 */
exports.create = async (req, res) => {
    const { quantity, price, date, userCode, cooperativeId } = req.body;
    try {
        //const userId = req.userData.userId;
        const purchase = await Purchase.create({ quantity, price, date, userCode, cooperativeId });
        
        res.status(201).json({ message: "Achat créé avec succès", "purchase": purchase });
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}


exports.update = async (req, res) => {
    
    const { id } = req.params;
    const { quantity, price, date, userCode, cooperativeId } = req.body;

    try {
        const purchase = await Purchase.findOne({ where: { "id": id }});
        
        if(purchase != null)
        {
            if(quantity != null) purchase.quantity = quantity;
            if(price != null) purchase.price = price;
            if(date != null) purchase.date = date;
            if(userCode != null) purchase.userCode = userCode;
            if(cooperativeId != null) purchase.cooperativeId = cooperativeId;

            purchase.save();
        
            res.status(200).json({ message: "Achat modifié avec succès", "purchase": purchase });
        } else {
            return res.status(404).json({ message: "Achat inexistant" });
        }
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.delete = async (req, res) => {

    const { id } = req.params;

    try {
        const deletedPurchase = await Purchase.destroy({ where: { "id": id }});

        if(deletedPurchase > 0)
        {
            res.status(200).json({ message: "Achat supprimé avec succès" });
        }
        else res.status(404).json({ message: "Achat inexistant" });
        
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}