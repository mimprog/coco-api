const db = require('../db');
const { Plot } = require('../models/models');

// Get all plots
exports.all = async (req, res) => {
    try {
        const plots = await Plot.findAll();
        res.status(200).json(plots);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get a single plot by ID
exports.get = async (req, res) => {
    const { id } = req.params;

    try {
        const plot = await Plot.findByPk(id);

        if (!plot) {
            return res.status(404).json({ message: "Cette parcelle n'existe pas" });
        }

        res.status(200).json(plot);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

//  Create a new plot
exports.create = async (req, res) => {
    const {
        id,
        statut,
        x,
        y,
        QR_URL,
        operateur,
        subdivision,
        landstatus,
        name,
        surname,
        matrimonia,
        residence,
        education,
        lieuedit,
        ageplantat,
        plantnumber,
        output,
        fertilizer,
        nbfertil,
        insecticid,
        nbinsect,
        problems,
        region,
        departement,
        village,
        surface,
        cooperative,
        sex,
        tel
    } = req.body;

    

    try {
        const newPlot = await Plot.create({
            statut,
            operateur,
            subdivision,
            landstatus,
            name,
            surname,
            matrimonia,
            residence,
            education,
            lieuedit,
            ageplantat,
            plantnumber,
            output,
            fertilizer,
            nbfertil,
            insecticid,
            nbinsect,
            problems,
            region,
            departement,
            village,
            surface,
            cooperative,
            sex,
            tel,
            x,
            y,
            QR_URL,
            id
        });

        console.log(newPlot);

        res.status(201).json({ message: "Parcelle créée avec succès", plot: newPlot });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.updateCoords = async (req, res) => {
    const { code } = req.params;
    const { xCoord, yCoord, userCode } = req.body;

    try {
        const plot = await Plot.findOne({ where: { code, userCode } });

        if (!plot) {
            return res.status(404).json({ message: "Parcelle inexistante" });
        }

        if (xCoord !== undefined) plot.xCoord = xCoord;
        if (yCoord !== undefined) plot.yCoord = yCoord;

        await plot.save();

        res.status(200).json({ message: "Coordonnées modifiées avec succès", plot });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Update plot by ID
exports.update = async (req, res) => {
    const { id } = req.params;

    try {
        const plot = await Plot.findByPk(id);

        if (!plot) {
            return res.status(404).json({ message: "Parcelle inexistante" });
        }

        const updatedFields = [
            "statut", "operateur", "subdivision", "landstatus", "name", "surname",
            "matrimonia", "residence", "education", "lieuedit", "ageplantat", "plantnumber",
            "output", "fertilizer", "nbfertil", "insecticid", "nbinsect", "problems",
            "region", "departement", "village", "surface", "cooperative", "sex", "tel"
        ];

        updatedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                plot[field] = req.body[field];
            }
        });

        await plot.save();
        res.status(200).json({ message: "Parcelle modifiée avec succès", plot });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ✅ Delete a plot by ID
exports.delete = async (req, res) => {
    const { id } = req.params;

    try {
        const deleted = await Plot.destroy({ where: { id } });

        if (deleted) {
            res.status(200).json({ message: "Parcelle supprimée avec succès" });
        } else {
            res.status(404).json({ message: "Parcelle inexistante" });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

