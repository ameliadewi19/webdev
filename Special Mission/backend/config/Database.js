const Sequelize = require("sequelize");

const db = new Sequelize('elib','root','',{
    host: 'localhost',
    dialect: "mysql"
})

module.exports = db;