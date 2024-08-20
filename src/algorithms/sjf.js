export default function run_sjf(processes) {
    
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    processes.forEach((p) => (p.status = 'NOT_READY'));


    let currentTime = 0;
    let completedProcesses = 0;
    const totalProcesses = processes.length;
    const readyQueue = [];
    console.log("proc", processes)


    while (completedProcesses < totalProcesses) {

        
        for (let process of processes) {
            if (process.arrivalTime <= currentTime && process.status == 'NOT_READY') {
                readyQueue.push(process);
                process.status = 'READY';
            }
        }
        console.log("readyqueru", readyQueue)


        if (readyQueue.length === 0) {
            processes.forEach((process) => {
                process.bar.push({ color: 'gray' });
            });
            currentTime += 1;
            continue;
        }

        readyQueue.sort((a, b) => a.remainingTime - b.remainingTime);

        const process = readyQueue.shift();
        process.status = 'RUNNING';

        while (process.remainingTime > 0) {
            for (let process2 of processes) {
                if (process.code === process2.code) {
                    process2.bar = [...process2.bar, { color: 'green' }];
                    process2.remainingTime -= 1;
                } else if (process2.arrivalTime > currentTime) {
                    process2.bar = [...process2.bar, { color: 'gray' }];
                } else if (process2.remainingTime === 0) {
                    process2.bar = [...process2.bar];
                } else {
                    process2.bar = [...process2.bar, { color: 'yellow' }];
                }
            }
            currentTime += 1;
        }

        process.status = 'COMPLETE';
        completedProcesses += 1;
    }

    processes.sort((a, b) => {
        const numA = parseInt(a.code.substring(1));
        const numB = parseInt(b.code.substring(1));
        return numA - numB;
    });

    return processes;
}