const { Model, INTEGER, VARCHAR, STRING } = require("sequelize");

const sequelize = require("../db_config/db_config");


class User extends Model{}

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

User.checkAndSaveUser = async (user) => {
    const data = await User.findByPk(user.id);
    if (!data) {
        // user does not exist, save it
        await User.create(user);
    }
}


module.exports = User;
