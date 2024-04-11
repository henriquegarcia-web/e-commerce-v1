const jsonServer = require('json-server')
const path = require('path')
const fs = require('fs')

const db = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json')))

const server = jsonServer.create()
const middlewares = jsonServer.defaults()
const router = jsonServer.router(db)

server.use(middlewares)
server.use(router)

server.listen(5000, () => {
  console.log('JSON Server rodando')
})

module.exports = server
