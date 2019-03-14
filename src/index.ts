import fs from 'fs'
import util from 'util'
import path from 'path'
import express from 'express'
import expressWs from 'express-ws'

const { app } = expressWs(express())
const port = process.env.PORT || 3000

app.use(express.static(path.resolve(__dirname, '../lib/client')))

app.get('/', (req, res, next) => {
  res.sendFile(path.resolve(__dirname, '../public/index.html'))
})

app.ws('/pi', (ws, req) => {
  ws.on('message', msg => {
    console.log(msg)
  })
})

app.listen(port, () => console.log(`Server running on port: ${port}`))

// const main = async () => {
//   const piString = await util.promisify(fs.readFile)(
//     path.resolve(__dirname, '../data/pi-1million.txt'),
//     'utf8'
//   )
//   const piArr = piString.split('')
// }
//
// main()
