const fs = require('fs')
const fsPromises = fs.promises


// export function updateSessionFile(loc:string, updates:object) {
//   // read the file
//   const filePath = path.join(process.cwd(), loc);
//   fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//       console.log(`Error reading file from disk: ${err}`)
//     } else {
//       // parse JSON string to JSON object
//       const databases = JSON.parse(data)

//       // add a new record
//       Object.keys(updates).map(key => {databases[key] = updates[key]})
//       console.log('updateSession: ', updates)

//       // write new data back to the file
//       fs.writeFile(filePath, JSON.stringify(databases, null, 4), err => {
//         if (err) {
//           console.log(`Error writing file: ${err}`)
//         }
//       })
//     }
//   })
// }


import { HomeProps } from '@/types/VotingTypes';
const path = require('path');

export async function getPlay(): Promise<HomeProps> {
  // Load scenarios from file and convert to ScenariosType object
  const filePath = path.join(process.cwd(), 'src/data/play.json');
  const fileContents = await fsPromises.readFile(filePath, 'utf8');
  const play: HomeProps = JSON.parse(fileContents);
  return play;
}