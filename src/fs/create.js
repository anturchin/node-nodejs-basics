import fs from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

import { exists } from '../utils/index.js';

const filePath = path.join(__dirname, 'files', 'fresh.txt');
const content = 'I am fresh and young';

const create = async () => {
    if (await exists(filePath)) throw new Error(`FS operation failed`);
    await fs.writeFile(filePath, content);
};

await create();