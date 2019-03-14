import fs from 'fs'
import util from 'util'
import path from 'path'
import express from 'express'
import expressWs from 'express-ws'

const { app } = expressWs(express())
const port = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, '../public')))
app.use('/dist', express.static(path.resolve(__dirname, '../lib/client')))

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'))
})

const main = async () => {
  const pi = await util.promisify(fs.readFile)(
    path.resolve(__dirname, '../data/pi-1million.txt'),
    'utf8'
  )

  app.ws('/pi', (ws, req) => {
    const ip = req.connection.remoteAddress
    let index = 0
    const interval = setInterval(() => {
      ws.send(JSON.stringify({ value: pi.split('')[index], index }))
      index++
    }, 100)

    ws.on('close', () => clearInterval(interval))
  })

  app.listen(port, () => console.log(`Server running on port ${port}`))
}

main()
