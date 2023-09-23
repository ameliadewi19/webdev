const { Sequelize, DataTypes } = require('sequelize');
const db = require('../config/Database.js');

const Book = db.define('book', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    bookname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    author: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    desc: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: { 
        type: DataTypes.FLOAT, 
        allowNull: false,
    },
}, {
    freezeTableName: true
});

(async () => {
    await db.sync();
})();

module.exports = Book;
