import path from 'node:path';
import fs from 'node:fs/promises';

import { fileExists } from '../utils/index.js';

const filePath = path.join('files', 'fresh.txt');
const content = 'I am fresh and young';

const create = async () => {
    const exists = await fileExists(filePath);
    if(exists) {
      throw new Error(`FS operation failed`);
    }
    await fs.writeFile(filePath, content);
};

await create();