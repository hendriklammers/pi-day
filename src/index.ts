import fs from 'fs'
import util from 'util'
import path from 'path'

const main = async () => {
  const piString = await util.promisify(fs.readFile)(
    path.resolve(__dirname, '../data/pi-1million.txt'),
    'utf8'
  )
  const piArr = piString.split('')
}

main()
