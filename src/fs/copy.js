import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { readdir, mkdir, copyFile } from 'node:fs/promises';

import { exists } from "../utils/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const folderPath = path.join(__dirname, 'files');
const destPath = path.join(__dirname, 'files_copy');

const copy = async () => {

    if (!(await exists(folderPath))) throw new Error(`FS operation failed`);
    if (await exists(destPath)) throw new Error(`FS operation failed`);

    try {
        await mkdir(destPath);
        const files = await readdir(folderPath);
        for (const file of files) {
            const srcFilePath = path.join(folderPath, file);
            const destFilePath = path.join(destPath, file);

            await copyFile(srcFilePath, destFilePath);
        }
    } catch (err) {
        console.error(err);
    }

};

await copy();
