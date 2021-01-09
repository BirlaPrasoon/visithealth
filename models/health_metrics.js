const  { Model, INTEGER, BIGINT } = require("sequelize");
const User = require('./user');
const sequelize = require("../db_config/db_config");
class HealthMetric extends Model {}

HealthMetric.init(
    {
        metricId: {
            type: INTEGER,
            field: "metric_id",
            primaryKey: true,
            autoIncrement: true
        },
        userId: {
            type: INTEGER,
            field: "user_id",
            allowNull: false
        },
        date: {
            type: BIGINT,
            field: "date",
            allowNull: false
        },
        steps: {
            type: INTEGER,
            field: "steps",
            unsigned: true,
            defaultValue : 0
        },
        calories: {
            type: INTEGER,
            field: "calories",
            unsigned: true,
            defaultValue : 0
        },
    },
    {
        tableName: "health_metrics",
        sequelize,
        timestamps: false,
        initialAutoIncrement: 1000
    }
);

HealthMetric.belongsTo(User, {
    foreignKey: "userID",
    targetKey: "id",
    as: "healthData"
});

module.exports = HealthMetric;