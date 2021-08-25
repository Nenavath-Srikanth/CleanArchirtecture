const http = require('http')
const server = require('./src/frameworks_drivers/server/server')
const sequelize = require('./src/frameworks_drivers/database/sequelize')
 
const port = process.env.PORT || 3001


try {
    // connecting and syncing to the database
    sequelize.sync()
    console.log('Connected to the database successfully and syncing tables ...')

} catch (error) {
    console.log('Could not connect to the database')
}

try {
     // creating express server
     const myserver = http.createServer(server)

     myserver.listen(port)
} catch (error) {
    console.log('failed to start the server')
}

