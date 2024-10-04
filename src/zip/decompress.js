import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';
import { createReadStream, createWriteStream } from 'node:fs';
import { createGunzip } from 'node:zlib';
import { pipeline } from 'node:stream/promises';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compressedFilePath = path.join(__dirname, 'files', 'archive.gz');
const decompressedFilePath = path.join(__dirname, 'files', 'fileToCompress.txt');

const decompress = async () => {

    const readStream = createReadStream(compressedFilePath);
    const gunzip = createGunzip()
    const writeStream = createWriteStream(decompressedFilePath);

    await pipeline (
        readStream,
        gunzip,
        writeStream,
    );

};

await decompress();