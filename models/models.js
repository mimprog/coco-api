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
    statut: {
        type: DataTypes.STRING,
        allowNull: true
    },
    operateur: {
        type: DataTypes.STRING,
        allowNull: true
    },
    subdivision: {
        type: DataTypes.STRING,
        allowNull: true
    },
    landstatus: {
        type: DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: true
    },
    matrimonia: {
        type: DataTypes.STRING,
        allowNull: true
    },
    residence: {
        type: DataTypes.STRING,
        allowNull: true
    },
    education: {
        type: DataTypes.STRING,
        allowNull: true
    },
    lieuedit: {
        type: DataTypes.STRING,
        allowNull: true
    },
    ageplantat: {
        type: DataTypes.STRING,
        allowNull: true
    },
    plantnumber: {
        type: DataTypes.STRING,
        allowNull: true
    },
    output: {
        type: DataTypes.STRING,
        allowNull: true
    },
    fertilizer: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nbfertil: {
        type: DataTypes.STRING,
        allowNull: true
    },
    insecticid: {
        type: DataTypes.STRING,
        allowNull: true
    },
    nbinsect: {
        type: DataTypes.STRING,
        allowNull: true
    },
    problems: {
        type: DataTypes.STRING,
        allowNull: true
    },
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    region:{
        type: DataTypes.STRING,
        allowNull: true
    },
    departement:{
        type: DataTypes.STRING,
        allowNull: true
    },
    village:{
        type: DataTypes.STRING,
        allowNull: true
    },
    surface:{
        type: DataTypes.STRING,
        allowNull: true
    },
    cooperativeName:{
        type: DataTypes.STRING,
        allowNull: true
    },
    sex:{
        type: DataTypes.STRING,
        allowNull: true
    },
    tel:{
        type: DataTypes.STRING,
        allowNull: true
    },
    photo:{
        type: DataTypes.STRING,
        allowNull: true
    },
    x:{
        type: DataTypes.STRING,
        allowNull: true
    },
    y:{
        type: DataTypes.STRING,
        allowNull: true
    },
    QR_URL:{
        type: DataTypes.STRING,
        allowNull: true
    }
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
