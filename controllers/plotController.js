const db = require('../db');
const { Plot } = require('../models/models');

exports.all = async (req, res) => {
    try {
        const plots = await Plot.findAll();
        res.status(200).json(plots);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.get = async (req, res) => {
    const { code } = req.params;

    try {
        const plot = await Plot.findOne({ where: { 'code': code } });

        if(plot == null)
        {
            return res.status(404).json("Cette parcelle n'existe pas");    
        }
        res.status(200).json(plot);
    } catch (err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.create = async (req, res) => {
    const { code,
            region,
            dept,
            arr,
            village,
            area,
            location,
            xCoord,
            yCoord,
            plantingAge,
            plantsNumber,
            productionPerYear,
            chemistryIntrants,
            cIYearUseFrequency,
            fertilizer,
            fYearUseFrequency,
            difficulties,
        
            cooperativeId,
            userCode } = req.body;
    try {
        const plot = await Plot.create({ code,
            region,
            dept,
            arr,
            village,
            area,
            location,
            xCoord,
            yCoord,
            plantingAge,
            plantsNumber,
            productionPerYear,
            chemistryIntrants,
            cIYearUseFrequency,
            fertilizer,
            fYearUseFrequency,
            difficulties,
            cooperativeId,
            userCode });
        
        res.status(201).json({ message: "Parcelle créée avec succès", "plot": plot });
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}


exports.update = async (req, res) => {
    
    const { code } = req.params;
    const { region,
        dept,
        arr,
        village,
        area,
        location,
        xCoord,
        yCoord,
        plantingAge,
        plantsNumber,
        productionPerYear,
        chemistryIntrants,
        cIYearUseFrequency,
        fertilizer,
        fYearUseFrequency,
        difficulties,
    
        cooperativeId,
        userCode } = req.body;

    try {
        const plot = await Plot.findOne({ where: { "code": code }});
        
        if(plot != null)
        {
            if(region != null) plot.region = region;
            if(dept != null) plot.dept = dept;
            if(arr != null) plot.arr = arr;
            if(village != null) plot.village = village;
            if(area != null) plot.area = area;
            if(location != null) plot.location = location;
            if(xCoord != null) plot.xCoord = xCoord;
            if(yCoord != null) plot.yCoord = yCoord;
            if(plantingAge != null) plot.plantingAge = plantingAge;
            if(plantsNumber != null) plot.plantsNumber = plantsNumber;
            if(productionPerYear != null) plot.productionPerYear = productionPerYear;
            if(chemistryIntrants != null) plot.chemistryIntrants = chemistryIntrants;
            if(cIYearUseFrequency != null) plot.cIYearUseFrequency = cIYearUseFrequency;
            if(fertilizer != null) plot.fertilizer = fertilizer;
            if(fYearUseFrequency != null) plot.fYearUseFrequency = fYearUseFrequency;
            if(difficulties != null) plot.difficulties = difficulties;
            if(cooperativeId != null) plot.cooperativeId = cooperativeId;
            if(userCode != null) plot.userCode = userCode;            

            plot.save();
        
            res.status(200).json({ message: "Parcelle modifiée avec succès", "plot": plot });
        } else {
            return res.status(404).json({ message: "Parcelle inexistante" });
        }
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.updateCoords = async (req, res) => {
    
    const { code } = req.params;
    const { xCoord,
            yCoord,
            userCode } = req.body;

    try {
        const plot = await Plot.findOne({ where: { "code": code, "userCode": userCode }});
        
        if(plot != null)
        {
            if(xCoord != null) plot.xCoord = xCoord;
            if(yCoord != null) plot.yCoord = yCoord;

            plot.save();
        
            res.status(200).json({ message: "Coordonnées modifiées avec succès", "plot": plot });
        } else {
            return res.status(404).json({ message: "Parcelle inexistante" });
        }
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}

exports.delete = async (req, res) => {

    const { code } = req.params;

    try {
        const deletedPlot = await Plot.destroy({ where: { "code": code }});

        if(deletedPlot > 0)
        {
            res.status(200).json({ message: "Parcelle supprimée avec succès" });
        }
        else res.status(404).json({ message: "Parcelle inexistante" });
        
    } catch(err) {
        res.status(500).json({
            message : err.message
        });
    }
}