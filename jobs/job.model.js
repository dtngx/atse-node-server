const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        jobName: { type: DataTypes.STRING, allowNull: false },
        jobDescription: { type: DataTypes.STRING, allowNull: false },
        jobLocation: { type: DataTypes.STRING, allowNull: false },
        jobDate: { type: DataTypes.STRING, allowNull: false }
    };

    return sequelize.define('Job', attributes);
}