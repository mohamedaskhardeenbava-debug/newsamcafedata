const fs = require('fs');
const db = JSON.parse(fs.readFileSync('db.json'));
const key = Object.keys(db).find(k => k.includes('schema'));
if (key) {
    delete db[key];
    fs.writeFileSync('db.json', JSON.stringify(db, null, 2));
    console.log('Deleted key:', key);
} else {
    console.log('No schema key found');
}