import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = path.join(__dirname, 'src', 'pages');
const files = fs.readdirSync(dir);
files.forEach(f => {
  if (f.endsWith('.jsx')) {
    const p = path.join(dir, f);
    let c = fs.readFileSync(p, 'utf-8');
    c = c.replace(/'#ffffff'/g, 'C.wh');
    c = c.replace(/\"#ffffff\"/g, 'C.wh');
    c = c.replace(/'#fff'/g, 'C.wh');
    c = c.replace(/\"#fff\"/g, 'C.wh');
    fs.writeFileSync(p, c, 'utf-8');
  }
});
console.log('Done replacement!');
