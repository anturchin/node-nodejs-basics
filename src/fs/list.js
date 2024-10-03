import { readdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { exists } from '../utils/index.js';

const folderPath = path.join(__dirname, 'files');

const list = async () => {

    if (!(await exists(folderPath))) throw new Error(`FS operation failed`);

    try {
        const files = await readdir(folderPath);
        console.dir(files);
    } catch (e) {
        console.error(e);
    }

};

await list();