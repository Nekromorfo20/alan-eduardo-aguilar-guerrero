const express = require('express')
require('dotenv').config()
const cors = require("cors")
const { sequelize } = require('./connection')

// Create server
const app = express()
const ENV = process.env
const port = Number(ENV.API_PORT) || 8081
const corsOptions = {
    origin: ENV.API_CORS_ORIGIN,
    credentials: ENV.API_CORS_CREDENTIALS
}

// Enable cors, express-json and urlencoded
app.use(cors(corsOptions))
app.use(express.json({ extended: true }))
app.use(express.urlencoded({ extended: true }))

// Initialize sequelize, set server port and a handle application errors
sequelize.authenticate()
  .then(() => {
      console.log('¡Successful connection!')
      return sequelize.sync()
  })
  .then(() => {
      console.log('¡Synchronized models!')
      app.listen(port, () => {
          console.log(`Server deploy in http://localhost:${port}`)
      })
  })
.catch((error) => {
    console.error('¡Failed connection!', error)
    process.exit(1)
})

// Import routes and set prefix /api
app.use('/api', require('./routes/catalog_products.route'))
app.use('/api', require('./routes/session_token.route'))