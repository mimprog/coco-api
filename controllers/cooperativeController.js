const db = require('../db');
const { Cooperative } = require('../models/models');

exports.all = async (req, res) => {
    try {
        const cooperatives = await Cooperative.findAll({ order: [['name', 'ASC']] });
        res.status(200).json(cooperatives);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.get = async (req, res) => {
    const {id} = req.params;

    try {
        const cooperative = await Cooperative.findOne({ where: {'id': id} });

        if(cooperative == null)
        {
            return res.status(404).json("Cette coopérative n'existe pas");    
        }
        res.status(200).json(cooperative);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.create = async (req, res) => {
    const { name } = req.body;
    try {
        //const userId = req.userData.userId;
        const cooperative = await Cooperative.create({ name });
        
        res.status(201).json({ message: "Coopérative créée avec succès", "cooperative": cooperative });
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}


exports.update = async (req, res) => {
    
    const { id } = req.params;
    const { name } = req.body;

    try {
        const cooperative = await Cooperative.findOne({ where: { "id": id }});
        
        if(cooperative != null)
        {
            if(name != null) cooperative.name = name;

            cooperative.save();
        
            res.status(200).json({ message: "Coopérative modifiée avec succès", "cooperative": cooperative });
        } else {
            return res.status(404).json({ message: "Coopérative inexistante" });
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
        const deletedCooperative = await Cooperative.destroy({ where: { "id": id }});

        if(deletedCooperative > 0)
        {
            res.status(200).json({ message: "Coopérative supprimée avec succès" });
        }
        else res.status(404).json({ message: "Coopérative inexistante" });
        
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}