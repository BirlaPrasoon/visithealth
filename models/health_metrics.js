const { Model, INTEGER, BIGINT } = require("sequelize");
const User = require('./user');
const sequelize = require("../db_config/db_config");
class HealthMetric extends Model { }

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
            defaultValue: 0
        },
        calories: {
            type: INTEGER,
            field: "calories",
            unsigned: true,
            defaultValue: 0
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
    foreignKey: "user_id",
    targetKey: "id",
    as: "user",
});

HealthMetric.saveUserMetricInBulk = async (metrics) => {
   await HealthMetric.bulkCreate(metrics, { returning: true })
}

HealthMetric.findData = async () => {
    const query = 'SELECT user.id as id, user.name as name, health_metrics.date, health_metrics.steps, health_metrics.calories from user inner join health_metrics on user.id = health_metrics.user_id';
    const [data, metadata] = await sequelize.query(query);
    return data;
}

module.exports = HealthMetric;