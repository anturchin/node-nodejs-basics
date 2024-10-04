import { spawn } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path, { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const spawnChildProcess = async (args) => {

    const pathFile = path.join(__dirname, 'files', 'script.js');
    const childProcess = spawn('node', [pathFile, ...args], {
        stdio: ['pipe', 'pipe', 'inherit'],
    });

    process.stdin.pipe(childProcess.stdin);

    childProcess.stdout.on('data', (data) => {
        process.stdout.write(data);
    });

    childProcess.on('error', (error) => {
        console.error(`Error in child process: ${error.message}`);
    });

    childProcess.on('exit', (code) => {
        process.stdin.unpipe(childProcess.stdin);
    });

    process.stdin.on('data', (data) => {
        childProcess.stdin.write(data);
    });

    process.stdin.on('end', () => {
        childProcess.stdin.end();
    });

};

spawnChildProcess( ['someArgument1', 'someArgument2']);
