const { DataTypes } = require('sequelize')
const { sequelize } = require('../connection')
const { UsersModel } = require('./users.model')

const AccessTokensModel = sequelize.define('access_tokens', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        }
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at: {
        type: DataTypes.STRING,
        allowNull: true
    },
    updated_at: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'access_tokens',
    timestamps: false
})

UsersModel.hasMany(AccessTokensModel, { as: 'access_tokens', foreignKey: 'user_id' });
AccessTokensModel.belongsTo(UsersModel, { foreignKey: "user_id" })

module.exports = {
    AccessTokensModel
}