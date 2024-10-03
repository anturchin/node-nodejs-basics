import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { rename as fsRename } from 'node:fs/promises';

import { exists } from "../utils/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const oldFilePath = path.join(__dirname, 'files', 'wrongFilename.txt');
const newFilePath = path.join(__dirname, 'files', 'properFilename.md');

const rename = async () => {

    if (!(await exists(oldFilePath))) throw new Error(`FS operation failed`);
    if (await exists(newFilePath)) throw new Error(`FS operation failed`);

    try {
        await fsRename(oldFilePath, newFilePath);
    } catch (err) {
        console.error(err.message);
    }

};

await rename();