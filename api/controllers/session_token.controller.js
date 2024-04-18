const jwt = require('jsonwebtoken')
const { sequelize } = require('../connection')
const { UsersModel, AccessTokensModel } = require('../models')
const { responseUtil  } = require('../utils')

class SessionTokenController {

    /**
    * @author Alan Aguilar
    * @description Function to create a new session token an set in the DB
    * @date 18-04-2024
    * @return {Object}
    * @memberof SessionTokenController
    */
    async generateSessionToken(req, res) {
        const trans = await sequelize.transaction()

        try {
            const { name } = req.body
            const ENV = process.env
            let result = {}
            let token = {}
    
            if (!name) return res.status(400).json(responseUtil(400, '¡You must provided the name of user!', {}))
    
            const user = await UsersModel.findOne({ where: { name } })
            if (!user) return res.status(400).json(responseUtil(400, '¡The name of user does not find!', {}))

            const payload = {
                user: {
                    id: user.id,
                    name: user.name
                }
            }

            token = jwt.sign(payload, ENV.API_TOKEN_SECRET, {
                expiresIn: Number(ENV.API_TOKEN_EXPIRATION), // 1 hour
                algorithm: `${ENV.API_TOKEN_ALGORITHM}`
            })

            await AccessTokensModel.update({
                token: token,
                updated_at: new Date().toISOString()
            }, { where: { user_id: user.id  }, transaction: trans })

            result = {
                name: user.name,
                token: token
            }

            await trans.commit()
            return res.status(200).json(responseUtil(200, '¡OK!', result))
        } catch (error) {
            console.log( error)
            await trans.rollback()
            return res.status(400).json(responseUtil(500, '¡Server error!', {}))
        }
    }
}

module.exports = SessionTokenController