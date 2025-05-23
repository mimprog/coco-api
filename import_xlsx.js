const { faker } = require('@faker-js/faker');
const { User, Cooperative, Plot, Exporter } = require('./models/models');
const xlsx = require("xlsx");

exports.importDatas = async () => {
    try {
        const workbook = xlsx.readFile("resources/xlsx/data.xlsx");
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        console.log(data);

        // Create unique cooperatives
        const coopSet = new Set();
        data.forEach(row => {
            if (row["cooperative"]) coopSet.add(row["cooperative"]);
        });

        for (let coop of coopSet) {
            await Cooperative.findOrCreate({ where: { name: coop } });
        }

        for (const [i, row] of data.entries()) {
            const fn = faker.person.firstName();
            const ln = faker.person.lastName();

            const code = String(row["id"]) || `P-${i + 1}`;
            const username = faker.internet.userName({ firstName: fn, lastName: ln });
            const email = faker.internet.email({ firstName: fn, lastName: ln });
            const phone = row["tel"] || faker.phone.number('6########');
            const password = "12345678";

            // Create user
            const [user] = await User.findOrCreate({
                where: { code },
                defaults: { code, username, email, phone, password }
            });

            // Create plot
            const plotData = {
                statut: row["statut"],
                operateur: row["operateur"],
                subdivision: row["subdivision"],
                landstatus: row["landstatus"],
                name: row["name"],
                surname: row["surname"],
                matrimonia: row["matrimonia"],
                residence: row["residence"],
                education: row["education"],
                lieuedit: row["lieuedit"],
                ageplantat: row["ageplantat"],
                plantnumber: row["plantnumber"],
                output: row["output"],
                fertilizer: row["fertilizer"],
                nbfertil: row["nbfertil"],
                insecticid: row["insecticid"],
                nbinsect: row["nbinsect"],
                problems: row["problems"],
                id: code, // match user code
                region: row["region"],
                departement: row["departement"],
                village: row["village"],
                surface: row["surface"],
                cooperative: row["cooperative"],
                sex: row["sex"],
                tel: row["tel"],
                photo: row["photo"],
                x: row["x"],
                y: row["y"],
                QR_URL: row["QR_URL"],
                userCode: code // foreign key reference (if needed)
            };

            await Plot.create(plotData);
        }

        console.log("✅ Data import completed.");
    } catch (err) {
        console.error("❌ Import failed:", err.message);
    }
};

