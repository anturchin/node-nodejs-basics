import { createWriteStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'fileToWrite.txt');

const write = async () => {

    const writeStream = createWriteStream(filePath);

    process.stdin.on('data', (chunk) => {
        const contents = chunk.toString().trim();
        writeStream.write(contents + '\n');
    })

};

await write();