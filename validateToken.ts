import fs from 'fs'
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export function validateToke(){
    const filePath = path.join(__dirname, 'token.json');
    const raw = fs.readFileSync(filePath, 'utf-8');
}