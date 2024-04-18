const { sequelize } = require('../connection')
const { CatalogProductsModel } = require('../models')
const { responseUtil } = require('../utils')

class CatalogProductsController {

    /**
    * @author Alan Aguilar
    * @description Function to get all products or one product by id
    * @date 18-04-2024
    * @return {Object}
    * @memberof CatalogProductsController
    */
    async getProducts (req, res) {
        try {
            const id = req.query?.id
            let result = []

            if (id) {
                let product = await CatalogProductsModel.findOne({ where: { id: id } })
                if (!product) return res.status(404).json(responseUtil(404, '¡Cannot find the product with the id provided!', {}))

                result.push({
                    id: product.id,
                    name: product.name,
                    description: product.description,
                    height: product.height,
                    length: product.length,
                    width: product.width,
                    created_at: product.created_at,
                    updated_at: product.updated_at
                })

            } else {
                let products = await CatalogProductsModel.findAll({
                    order: [['id','DESC']]
                })

                for (let i = 0; i < products.length; i++) {
                    result.push({
                        id: products[i].id,
                        name: products[i].name,
                        description: products[i].description,
                        height: products[i].height,
                        length: products[i].length,
                        width: products[i].width,
                        created_at: products[i].created_at,
                        updated_at: products[i].updated_at
                    })
                }
            }

            return res.status(200).json(responseUtil(200, '¡OK!', result))
        } catch (error) {
            console.log(error)
            return res.status(500).json(responseUtil(500, '¡Server error!', {}))
        }
    }

    /**
    * @author Alan Aguilar
    * @description Function to create a new product
    * @date 18-04-2024
    * @return {Object}
    * @memberof CatalogProductsController
    */
    async createProduct (req, res) {
        const trans = await sequelize.transaction()

        try {
            const { name, description, height, length, width } = req.body
            let result = {}

            if (!name || !description || !height || !length|| !width) return res.status(400).json({ message: '¡All fields are required!' })
            
            const newProduct = await CatalogProductsModel.create({
                name: name,
                description: description,
                height: height,
                length: length,
                width: width,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }, { transaction: trans })

            result = {
                id: newProduct.id,
                name: newProduct.name,
                description: newProduct.description,
                height: newProduct.height,
                length: newProduct.length,
                width: newProduct.width
            }

            await trans.commit()
            return res.status(200).json(responseUtil(200, '¡OK!', result))
        } catch (error) {
            console.log(error)
            await trans.rollback()
            return res.status(500).json(responseUtil(500, '¡Server error!', {}))
        }
    }

    /**
    * @author Alan Aguilar
    * @description Function for update a product by id
    * @date 18-04-2024
    * @return {Object}
    * @memberof CatalogProductsController
    */
    async updatedProduct (req, res) {
        const trans = await sequelize.transaction()

        try {
            const { id, name, description, height, length, width } = req.body
            let result = {}

            if (!id || !name || !description || !height || !length|| !width) return res.status(400).json({ message: '¡All fields are required!' })

            const product = await CatalogProductsModel.findOne({ where: { id: id } })
            if (!product) return res.status(404).json(responseUtil(404, '¡Cannot find the product with the id provided!', {}))

            await CatalogProductsModel.update({
                name: (name || product.name),
                description: (description || product.description),
                height: (height || product.height),
                length: (length || product.length),
                width: (width || product.width),
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
            }, { where: { id: product.id  }, transaction: trans })

            result = {
                id: product.id,
                name: name,
                description: description,
                height: height,
                length: length,
                width: width
            }

            await trans.commit()
            return res.status(200).json(responseUtil(200, '¡OK!', result))
        } catch (error) {
            console.log(error)
            await trans.rollback()
            return res.status(500).json(responseUtil(500, '¡Server error!', {}))
        }
    }

    /**
    * @author Alan Aguilar
    * @description Function for delete a product by id
    * @date 18-04-2024
    * @return {Object}
    * @memberof CatalogProductsController
    */
    async deleteProduct (req, res) {
        const trans = await sequelize.transaction()

        try {
            const { id } = req.body
            
            if (!id) return res.status(400).json(responseUtil(400, '¡The product id is required', {}))

            const product = await CatalogProductsModel.findOne({ where: { id: id } })
            if (!product) return res.status(404).json(responseUtil(404, '¡Cannot find the product with the id provided!', {}))

            await CatalogProductsModel.destroy({ where: { id: id }, transaction: trans })
        
            await trans.commit()
            return res.status(200).json(responseUtil(200, '!Product deleted successfully!', {}))
        } catch (error) {
            console.log(error)
            await trans.rollback()
            return res.status(500).json(responseUtil(500, '¡Server error!', {}))
        }
    }
}

module.exports = CatalogProductsController