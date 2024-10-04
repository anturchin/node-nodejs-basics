import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filePath = path.join(__dirname, 'files', 'fileToCompress.txt');
const compressedFilePath = path.join(__dirname, 'files', 'archive.gz');

const compress = async () => {

    const readStream = createReadStream(filePath);
    const gzip = createGzip()
    const writeStream = createWriteStream(compressedFilePath);

    await pipeline (
        readStream,
        gzip,
        writeStream,
    );

};

await compress();