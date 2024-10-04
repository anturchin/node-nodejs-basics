import os from 'node:os';
import { fileURLToPath } from "node:url";
import { Worker, threadId } from "node:worker_threads";

const __filename = fileURLToPath(import.meta.url);

const performCalculations = async () => {

    const numWorkers = os.cpus().length;
    const workers = [];
    const results = [];

    const createWorker = (data) => {
        const worker = new Worker(__filename.replace(/main\.js$/, "worker.js"), {
            workerData: data,
        });

        worker.on("message", (result) => {
            results.push(result);

            if (results.length === numWorkers) {
                console.log(results);
            }
        });

        worker.on("error", (error) => {
            results.push({ status: "error", data: null });

            if (results.length === numWorkers) {
                console.log(results);
            }
        });

        worker.on("exit", (code) => {
            if (code !== 0) {
                console.error(`Worker ${threadId} stopped with exit code ${code}`);
            }
        });

        return worker;
    };

    for (let i = 0; i < numWorkers; i++) {
        const dataToSend = 10 + i;
        const worker = createWorker(dataToSend);
        workers.push(worker);
    }

};

await performCalculations();