import fs from 'fs'
import path from 'path'
import util from 'util'
import expressWs from 'express-ws'

const sliceSize = 100
const pi = fs.readFileSync(
  path.resolve(__dirname, '../data/pi-10million.txt'),
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

const getIndex = (ws: any): Promise<number> => {
  return new Promise((resolve, reject) => {
    ws.on('message', (data: string) => {
      resolve(parseInt(JSON.parse(data).index, 10) || 0)
    })
  })
}

const handleWs: expressWs.WebsocketRequestHandler = async (ws, req) => {
  let index = await getIndex(ws)
  const interval = setInterval(() => {
    ws.send(JSON.stringify({ value: piMap.get(index), index }))
    index++
    if (index >= piMap.size - 1) {
      ws.close()
    }
  }, 1000)
  ws.on('close', () => clearInterval(interval))
}

export default handleWs
