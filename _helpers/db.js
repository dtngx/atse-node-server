const config = require('config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    // create database if it does not exist, use config.json
    const { host, port, user, password, database } = config.database;
    const jobdb = config.jobdb;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${jobdb}\`;`)

    // connect to the database
    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });
    const jobsequel = new Sequelize(jobdb, user, password, { dialect: "mysql" });

    // init models and add them to the exported database object
    db.User = require('../users/user.model')(sequelize);
    db.Job = require('../jobs/job.model')(jobsequel);

    // sync all models with database
    await sequelize.sync();
    await jobsequel.sync();
}