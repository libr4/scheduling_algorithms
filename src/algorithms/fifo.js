export default function run_fifo(processes) {
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);
    let currentTime = 0;

    for (let process of processes) {
        // Idle time until the process arrives
        while (process.arrivalTime > currentTime) {
            for (let process2 of processes) {
                process2.bar = [...process2.bar, { color: 'gray' }];
            }
            currentTime += 1;
        }

        // Run the current process
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
    }
    processes.sort((a, b) => {
        const numA = parseInt(a.code.substring(1));
        const numB = parseInt(b.code.substring(1));
        return numA - numB;
    });
    return processes;
}