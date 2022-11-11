const fs = require('fs')
const fsPromises = fs.promises


export function updateSession(loc, updates) {
  // read the file
  const filePath = path.join(process.cwd(), loc);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      console.log(`Error reading file from disk: ${err}`)
    } else {
      // parse JSON string to JSON object
      const databases = JSON.parse(data)

      // add a new record
      Object.keys(updates).map(key => {databases[key] = updates[key]})
      console.log('updateSession: ', updates)

      // write new data back to the file
      fs.writeFile(filePath, JSON.stringify(databases, null, 4), err => {
        if (err) {
          console.log(`Error writing file: ${err}`)
        }
      })
    }
  })
}

// import fsPromises from 'fs/promises'
import path from 'path'

export async function getJsonObj(loc) {
  const filePath = path.join(process.cwd(), loc);
  const jsonData = await fsPromises.readFile(filePath);
  const objectData = JSON.parse(jsonData);
  return objectData
}
