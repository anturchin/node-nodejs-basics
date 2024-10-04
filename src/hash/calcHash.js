import { createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { createHash } from 'node:crypto';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'fileToCalculateHashFor.txt');

const calculateHash = async () => {

    const hash = createHash('sha256');
    const readStream = createReadStream(filePath);

    readStream.on('data', (chunk) => {
        hash.update(chunk);
    })

    readStream.on('end', () => {
        console.log(hash.digest('hex'));
    })

};

await calculateHash();