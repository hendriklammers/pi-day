import path from 'path'
import express from 'express'
import expressWs from 'express-ws'
import piController from './piController'

const { app } = expressWs(express())
const port = process.env.PORT || 3000

app
  .use(express.static(path.resolve(__dirname, '../public')))
  .use('/dist', express.static(path.resolve(__dirname, '../lib/client')))
  .get('/', (req, res, next) =>
    res.sendFile(path.resolve(__dirname, '../public/index.html'))
  )
  .ws('/pi', piController)
  .listen(port, () => console.log(`Server running on port ${port}`))
