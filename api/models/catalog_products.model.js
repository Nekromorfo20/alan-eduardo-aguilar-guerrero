const { DataTypes } = require('sequelize')
const { sequelize } = require('../connection')

const CatalogProductsModel = sequelize.define('catalog_products', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    height: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    length: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    width: {
        type: DataTypes.FLOAT,
        allowNull: true
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
    tableName: 'catalog_products',
    timestamps: false
})

module.exports = {
    CatalogProductsModel
}