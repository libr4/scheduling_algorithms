import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

function run_sjf(processes) {
    // Sort processes by arrival time initially
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let completedProcesses = 0;
    const totalProcesses = processes.length;
    const readyQueue = [];

    while (completedProcesses < totalProcesses) {
        // Add processes to the ready queue if they have arrived
        for (let process of processes) {
            if (process.arrivalTime <= currentTime && process.status !== 'COMPLETE') {
                readyQueue.push(process);
                process.status = 'READY';
            }
        }

        // If the ready queue is empty, increment time and continue
        if (readyQueue.length === 0) {
            processes.forEach((process) => {
                process.bar.push({ color: 'gray' });
            });
            currentTime += 1;
            continue;
        }

        // Sort the ready queue by remaining time (shortest job first)
        readyQueue.sort((a, b) => a.remainingTime - b.remainingTime);

        // Process the shortest job
        const process = readyQueue.shift();
        process.status = 'RUNNING';

        // Run the process until completion
        while (process.remainingTime > 0) {
            processes.forEach((process2) => {
                if (process.code === process2.code) {
                    process2.bar.push({ color: 'green' });
                    process2.remainingTime -= 1;
                } else if (process2.remainingTime === 0) {
                    process2.bar = [...process2.bar, { color: 'white' }]; // Mark complete processes
                } else if (process2.arrivalTime <= currentTime) {
                    process2.bar.push({ color: 'yellow' }); // Waiting
                } else {
                    process2.bar.push({ color: 'gray' }); // Not arrived yet
                }
            });
            currentTime += 1;
        }

        // Mark the process as complete
        process.status = 'COMPLETE';
        completedProcesses += 1;
    }

    // Sort processes back by their code in ascending order
    processes.sort((a, b) => {
        const numA = parseInt(a.code.substring(1));
        const numB = parseInt(b.code.substring(1));
        return numA - numB;
    });

    return processes;
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


const SjfScheduler = ({processes}) => {
    
    const [processesB, setProcessesB] = useState([
        ...(processes.map((process) => {
            return {
                ...process,
                bar:[]
            }
        }))
    ]);

    const [currentTime, setCurrentTime] = useState(0);
    const [maxChartLength, setMaxChartLength] = useState([]);
    const INSTANT = 500;

    useEffect(() => {
        const preComputedProcesses = run_sjf(processesB);
        setProcessesB(preComputedProcesses)
        const largest = findLargestBar(processesB);
        setMaxChartLength(rangeTo(largest - 1))

    }, [])

    useEffect(() => {
        console.log(processesB);
    }, [processesB]);

    useEffect(() => {
        if (processesB.length === 0) return;

        const intervalId = setInterval(() => {
            setCurrentTime(prevTime => prevTime + 1);
        }, INSTANT);

        return () => clearInterval(intervalId);
    }, [processesB]);

    return (
        <Box sx={{
            display:'flex',
            flexDirection:'column',
        }}>
            <Box sx={{display:'flex', gap:0.5, alignContent:'center', alignItems:'center'}}>
            <Box
                                bgcolor={'white'}
                                height={'25px'}
                                width={'25px'}
                            />
            {maxChartLength.slice(0, currentTime).map((item, index) => {
                return  <Box key={index} width={'25px'} height={'25px'} textAlign={'center'}>
                {item}
                        </Box>

            })}
            </Box>
        <Box sx={{
            display:'flex',
            // flexDirection:'column',
            gap:0.5
        }}>
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:1
        }}>
            {processesB.map((item, index) => {
                return  <Box key={index} width={'25px'} height={'25px'}>
                            {item.code}
                        </Box>
            })}

        </Box>
        <Box sx={{
            display:'flex',
            flexDirection:'column',
            gap:1
        }}>
            {processesB.map((item, index) => (
                    <Box key={index} sx={{display:'flex', gap:0.5}}>
                        {item.bar.slice(0, currentTime).map((box, idx) => (
                            <Box
                                bgcolor={box.color}
                                height={'25px'}
                                width={'25px'}
                                key={idx}
                            />
                        ))}
                    </Box>
            ))}

        </Box>
        </Box>
        </Box>
    )
}

export default SjfScheduler;