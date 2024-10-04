import { Transform } from 'node:stream';
import { pipeline } from 'node:stream/promises';

const transform = async () => {

    const transformer = new Transform({
        transform(chunk, encoding, callback) {
            const content = chunk.toString().trim();
            const reversContent = content.split('').reverse().join('');
            callback(null, reversContent + '\n');
        }
    });

    await pipeline(
        process.stdin,
        transformer,
        process.stdout,
    );

};

await transform();