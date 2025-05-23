const db = require('../db');
const { Sale } = require('../models/models');

exports.all = async (req, res) => {
    try {
        const sales = await Sale.findAll({ order: [['date', 'DESC']] });
        res.status(200).json(sales);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.get = async (req, res) => {
    const { id } = req.params;

    try {
        const sale = await Sale.findOne({ where: { 'id': id } });

        if(sale == null)
        {
            return res.status(404).json("Cette vente n'existe pas");    
        }
        res.status(200).json(sale);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.create = async (req, res) => {
    const { quantity, price, date, cooperativeId, exporterId } = req.body;
    try {
        //const userId = req.userData.userId;
        const sale = await Sale.create({ quantity, price, date, cooperativeId, exporterId });
        
        res.status(201).json({ message: "Vente créée avec succès", "sale": sale });
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}


exports.update = async (req, res) => {
    
    const { id } = req.params;
    const { quantity, price, date, cooperativeId, exporterId } = req.body;

    try {
        const sale = await Sale.findOne({ where: { "id": id }});
        
        if(sale != null)
        {
            if(quantity != null) sale.quantity = quantity;
            if(price != null) sale.price = price;
            if(date != null) sale.date = date;
            if(cooperativeId != null) sale.cooperativeId = cooperativeId;
            if(exporterId != null) sale.exporterId = exporterId;

            sale.save();
        
            res.status(200).json({ message: "Vente modifiée avec succès", "sale": sale });
        } else {
            return res.status(404).json({ message: "Vente inexistante" });
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
        const deletedSale = await Sale.destroy({ where: { "id": id }});

        if(deletedSale > 0)
        {
            res.status(200).json({ message: "Vente supprimée avec succès" });
        }
        else res.status(404).json({ message: "Vente inexistante" });
        
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}