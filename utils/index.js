const fs = require('fs');

// Utility function: Generates a unique id
const uuid = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

const readFile = (filename) => {
  const data = fs.readFileSync(filename, 'utf8');
  const notes = data.length ? JSON.parse(data) : [];
  return notes;
}

const writeFile = (filename, info) => {
  fs.writeFile(filename, info, (err) =>
    err
      ? console.error(err)
      : console.log(`Note has been written to JSON file`)
  );
}

module.exports = { readFile, uuid, writeFile };