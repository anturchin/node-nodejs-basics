import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { exists } from '../utils/index.js';

const filePath = path.join(__dirname, 'files', 'fileToRead.txt');

const read = async () => {

    if (!(await exists(filePath))) throw new Error(`FS operation failed`);

    try {
        const contents = await fs.readFile(filePath, { encoding: 'utf8' });
        console.log(contents);
    } catch (e) {
        console.error(e)
    }

};

await read();