function calculateMeanTurnaround(processes) {
    let greenCount = 0;
    let yellowCount = 0;
    let redCount = 0;
    let blackCount = 0;

    processes.forEach((process) => {
        process.bar.forEach((entry) => {
            switch (entry.color) {
                case 'green':
                    greenCount++;
                    break;
                case 'yellow':
                    yellowCount++;
                    break;
                case 'red':
                    redCount++;
                    break;
                case 'black':
                    blackCount++;
                    break;
                default:
                    break;
            }
        });
    });


    const totalBarCount = greenCount + yellowCount + redCount + blackCount;
    
    const meanTurnaround = totalBarCount / processes.length;

    return meanTurnaround;
}

function findLargestBar(processes) {
    let largest = 0;
    for (let p of processes) {
        if (p.bar.length > largest) {
            largest = p.bar.length;
        }
    }
    return largest;
}

function rangeTo(n) {
    return Array.from({ length: n + 1 }, (_, i) => i);
}

export {calculateMeanTurnaround, findLargestBar, rangeTo}