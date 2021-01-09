const { Sequelize } = require("sequelize");

const dotenv = require("dotenv");
dotenv.config();

const mysqlHost = process.env.MYSQL_HOST || "localhost";
const mysqlDatabase =  process.env.MYSQL_DATABASE || "visit";
const mysqlUsername = process.env.MYSQL_USER || "root";
const mysqlPassword = process.env.MYSQL_PASSWORD || "visithealth";

const sequelize = new Sequelize({
    host: mysqlHost,
    database: mysqlDatabase,
    username: mysqlUsername,
    password: mysqlPassword,
    dialect: "mysql"
});

module.exports = sequelize;