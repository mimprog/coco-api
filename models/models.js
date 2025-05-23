const { DataTypes } = require("sequelize");
const sequelize = require("../sequelize");
const bcrypt = require("bcrypt");

/** ---------- MODELS ---------- **/

// User Model
const User = sequelize.define("user", {
    code: { type: DataTypes.STRING, allowNull: false, primaryKey: true },
    username: { type: DataTypes.STRING, allowNull: false, unique: true },
    email: { type: DataTypes.STRING, allowNull: false, unique: true, validate: { isEmail: true } },
    phone: { type: DataTypes.STRING, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false }
}, {
    hooks: {
        beforeCreate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        },
        beforeUpdate: async (user) => {
            if (user.password) {
                const salt = await bcrypt.genSalt(10);
                user.password = await bcrypt.hash(user.password, salt);
            }
        }
    }
});

// Cooperative Model
const Cooperative = sequelize.define("cooperative", {
    name: { type: DataTypes.STRING, allowNull: false }
});

// Exporter Model
const Exporter = sequelize.define("exporter", {
    name: { type: DataTypes.STRING, allowNull: false }
});

// Purchase Model
const Purchase = sequelize.define("purchase", {
    quantity: { type: DataTypes.INTEGER, allowNull: true },
    price: { type: DataTypes.DECIMAL, allowNull: true },
    date: { type: DataTypes.DATEONLY, allowNull: true }
});

// Sale Model
const Sale = sequelize.define("sale", {
    quantity: { type: DataTypes.INTEGER, allowNull: true },
    price: { type: DataTypes.DECIMAL, allowNull: true },
    date: { type: DataTypes.DATEONLY, allowNull: true }
});

// Plot Model
const Plot = sequelize.define("plot", {
    statut: DataTypes.STRING,
    operateur: DataTypes.STRING,
    subdivision: DataTypes.STRING,
    landstatus: DataTypes.STRING,
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    matrimonia: DataTypes.STRING,
    residence: DataTypes.STRING,
    education: DataTypes.STRING,
    lieuedit: DataTypes.STRING,
    ageplantat: DataTypes.STRING,
    plantnumber: DataTypes.STRING,
    output: DataTypes.STRING,
    fertilizer: DataTypes.STRING,
    nbfertil: DataTypes.STRING,
    insecticid: DataTypes.STRING,
    nbinsect: DataTypes.STRING,
    problems: DataTypes.TEXT,
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    region: DataTypes.STRING,
    departement: DataTypes.STRING,
    village: DataTypes.STRING,
    surface: DataTypes.STRING,
    cooperativeName: DataTypes.STRING,
    sex: DataTypes.STRING,
    tel: DataTypes.STRING,
    photo: DataTypes.STRING,
    x: DataTypes.DECIMAL,
    y: DataTypes.DECIMAL,
    QR_URL: DataTypes.STRING
});

/** ---------- RELATIONS ---------- **/

User.hasMany(Plot, { foreignKey: 'userCode' });
Plot.belongsTo(User, { foreignKey: 'userCode' });

User.hasMany(Purchase, { foreignKey: 'userCode' });
Purchase.belongsTo(User, { foreignKey: 'userCode' });

Cooperative.hasMany(Purchase, { foreignKey: 'cooperativeId' });
Purchase.belongsTo(Cooperative, { foreignKey: 'cooperativeId' });

Cooperative.hasMany(Sale, { foreignKey: 'cooperativeId' });
Sale.belongsTo(Cooperative, { foreignKey: 'cooperativeId' });

Exporter.hasMany(Sale, { foreignKey: 'exporterId' });
Sale.belongsTo(Exporter, { foreignKey: 'exporterId' });

Cooperative.hasMany(Plot, { foreignKey: { name: 'cooperativeId', allowNull: true }, onDelete: "SET NULL", onUpdate: "CASCADE" });
Plot.belongsTo(Cooperative, { foreignKey: { name: 'cooperativeId', allowNull: true } });

/** ---------- OPERATIONS ---------- **/

User.prototype.validPassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}

module.exports = {
    User,
    Cooperative,
    Exporter,
    Purchase,
    Sale,
    Plot
};
