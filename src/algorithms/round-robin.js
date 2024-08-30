export default function runRoundRobin(processes, systemQuantum, systemOverhead) {
    
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let completedProcesses = 0;
    const totalProcesses = processes.length;
    const readyQueue = [];

    while (completedProcesses < totalProcesses) {
        
        for (let process of processes) {
            if (process.arrivalTime <= currentTime && process.status === 'NOT_READY') {
                readyQueue.push(process);
                process.status = 'READY';
            }
        }


        if (readyQueue.length === 0) {
            processes.forEach((process) => {
                process.bar.push({ color: 'gray' });
            });
            currentTime += 1;
            continue;
        }

        const process = readyQueue.shift();
        process.status = 'RUNNING';

        const execTime = Math.min(systemQuantum, process.remainingTime);

        for (let i = 0; i < execTime; i++) {
            process.remainingTime -= 1;
            processes.forEach((p) => {
                if (p.code === process.code) {
                    p.bar.push({ color: 'green' }); 
                } else if (p.remainingTime === 0) {
                    p.bar = [...p.bar];
                } else if (p.arrivalTime <= currentTime) {
                    p.bar.push({ color: 'yellow' });
                } else {
                    p.bar.push({ color: 'gray' });
                }
            });
            currentTime += 1;


            for (let p of processes) {
                if (p.arrivalTime <= currentTime && p.status === 'NOT_READY') {
                    readyQueue.push(p);
                    p.status = 'READY';
                }
            }
        }

        if (process.remainingTime === 0) {
            process.status = 'COMPLETE';
            completedProcesses++;
            continue;
        }

        for (let i = 0; i < systemOverhead; i++) {
            processes.forEach((p) => {
                if (p.code === process.code) {
                    p.bar.push({ color: 'red' });
                } else if (p.arrivalTime > currentTime) {
                    p.bar.push({ color: 'gray' });
                }
                else if (p.remainingTime <= 0) {
                    p.bar = [...p.bar]
                } else {
                    p.bar.push({ color: 'yellow' });
                }
            });
            currentTime += 1;
            for (let p of processes) {
                if (p.arrivalTime <= currentTime && p.status === 'NOT_READY') {
                    readyQueue.push(p);
                    p.status = 'READY';
                }
            }
        }


        readyQueue.push(process);
    }
    processes.sort((a, b) => {
        const numA = parseInt(a.code.substring(1));
        const numB = parseInt(b.code.substring(1));
        return numA - numB;
    });

    return processes;
}