const fs = require('fs');
const path = require('path');
const filePath = path.join(__dirname, '../src/i18n/ar.json');
const content = fs.readFileSync(filePath, 'utf8');
const parsed = JSON.parse(content);
// Stringify with indentation
const formatted = JSON.stringify(parsed, null, 2);
fs.writeFileSync(filePath, formatted, 'utf8');
console.log('Successfully decoded ar.json to UTF-8 Arabic!');
