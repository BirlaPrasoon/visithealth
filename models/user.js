const  { Model, INTEGER, VARCHAR, STRING } = require("sequelize");

const sequelize = require("../db_config/db_config");


class User extends Model {}

User.init(
    {
        id: {
            type: INTEGER,
            field: "id",
            primaryKey: true
        },
        name: {
            type: STRING,
            field: "name",
            allowNull: false
        }
    },
    {
        tableName: "user",
        sequelize,
        timestamps: false
    }
);


module.exports = User;
