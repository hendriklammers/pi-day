import fs from 'fs'
import path from 'path'
import expressWs from 'express-ws'

const sliceSize = 100
const pi = fs.readFileSync(
  path.resolve(__dirname, '../data/pi-1million.txt'),
  'utf8'
)

const strToMap = (str: string): Map<number, string> => {
  let index = 0
  let key = 0
  const map = new Map()
  while (index < pi.length - 1) {
    map.set(key, pi.slice(index, index + sliceSize))
    key++
    index += sliceSize
  }
  return map
}

const piMap = strToMap(pi)

const handleWs: expressWs.WebsocketRequestHandler = (ws, req) => {
  let index = 0
  const interval = setInterval(() => {
    ws.send(JSON.stringify({ value: piMap.get(index), index }))
    index++
    if (index >= 3) {
      ws.close()
      console.log('ws connection closed')
    }
  }, 1000)

  ws.on('close', () => clearInterval(interval))
}

export default handleWs
