const db = require('../db');
const { Exporter } = require('../models/models');

exports.all = async (req, res) => {
    try {
        const exporters = await Exporter.findAll({ order: [['name', 'ASC']] });
        res.status(200).json(exporters);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.get = async (req, res) => {
    const { id } = req.params;

    try {
        const exporter = await Exporter.findOne({ where: { 'id': id } });

        if(exporter == null)
        {
            return res.status(404).json("Cet exporteur n'existe pas");    
        }
        res.status(200).json(exporter);
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
        const exporter = await Exporter.create({ name });
        
        res.status(201).json({ message: "Exporteur créé avec succès", "exporter": exporter });
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
        const exporter = await Exporter.findOne({ where: { "id": id }});
        
        if(exporter != null)
        {
            if(name != null) exporter.name = name;

            exporter.save();
        
            res.status(200).json({ message: "Exporteur modifié avec succès", "exporter": exporter });
        } else {
            return res.status(404).json({ message: "Exporteur inexistant" });
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
        const deletedExporter = await Exporter.destroy({ where: { "id": id }});

        if(deletedExporter > 0)
        {
            res.status(200).json({ message: "Exporteur supprimé avec succès" });
        }
        else res.status(404).json({ message: "Exporteur inexistant" });
        
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}