const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('character', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        weight: {
            type: DataTypes.FLOAT,
            allowNull: false
        },
        history: {
            type: DataTypes.TEXT
        },
        image: {
            type: DataTypes.TEXT,
        }
    });
};
