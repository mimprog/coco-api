const { faker } = require('@faker-js/faker');
const { User, Cooperative, Plot } = require('./models/models');
const xlsx = require("xlsx");

const nameCodeMap = new Map();
const prefixCounterMap = new Map();

exports.importDatas = async () => {
    try {
        const workbook = xlsx.readFile("resources/xlsx/data.xlsx");
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet);

        // Create unique cooperatives first
        const coopSet = new Set(data.map(row => row["cooperative"]).filter(Boolean));
        for (let coop of coopSet) {
            await Cooperative.findOrCreate({ where: { name: coop } });
        }

        for (const row of data) {
            // Generate consistent user code based on cleaned name
            const fullNameRaw = (row["name"] || "user").toUpperCase().replace(/\s+/g, '');
            const prefix = fullNameRaw.substring(0, 4).padEnd(4, 'X');

            let userCode;
            if (nameCodeMap.has(fullNameRaw)) {
                userCode = nameCodeMap.get(fullNameRaw);
            } else {
                const currentCount = prefixCounterMap.get(prefix) || 0;
                userCode = `${prefix}${String(currentCount).padStart(3, '0')}`;
                nameCodeMap.set(fullNameRaw, userCode);
                prefixCounterMap.set(prefix, currentCount + 1);
            }

            // Generate user info using faker
            const fn = faker.person.firstName();
            const ln = faker.person.lastName();
            const username = faker.internet.userName({ firstName: fn, lastName: ln });
            const email = faker.internet.email({ firstName: fn, lastName: ln });
            const phone = row["tel"] || faker.phone.number('6########');
            const password = "12345678";
            const role = "USER";

            // Create user if not exists
            const [user] = await User.findOrCreate({
                where: { code: userCode },
                defaults: { code: userCode, username, email, phone, password, role }
            });

            // Create plot
            await Plot.create({
                id: row["id"],
                userCode: userCode,
                name: row["name"],
                surname: row["surname"],
                sex: row["sex"],
                tel: row["tel"],
                region: row["region"],
                departement: row["departement"],
                village: row["village"],
                surface: row["surface"],
                statut: row["statut"],
                operateur: row["operateur"],
                subdivision: row["subdivision"],
                landstatus: row["landstatus"],
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
                cooperative: row["cooperative"],
                photo: row["photo"],
                x: row["x"],
                y: row["y"],
                QR_URL: row["QR_URL"],
            });
        }

        console.log("✅ Data import completed.");
    } catch (err) {
        console.error("❌ Import failed:", err.message);
    }
};


