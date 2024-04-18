const express = require('express')
const router = express.Router()
const { SessionTokenController } = require('../controllers')

// Generate instance "SessionTokenController"
const sessionTokenController = new SessionTokenController()

// Endpoint for generate a session token and save it in DB
router.post('/session-token', sessionTokenController.generateSessionToken)

module.exports = router