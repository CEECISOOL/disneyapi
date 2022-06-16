const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('movie', {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        createdDate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        score: {
            type: DataTypes.INTEGER
        },
        image: {
            type: DataTypes.TEXT,
        }
    });
};
