import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

function runRoundRobin(processes, systemQuantum, systemOverhead) {
    // Sort processes by arrival time
    processes.sort((a, b) => a.arrivalTime - b.arrivalTime);

    let currentTime = 0;
    let completedProcesses = 0;
    const totalProcesses = processes.length;
    const readyQueue = [];

    while (completedProcesses < totalProcesses) {
        // Add processes to the ready queue if they have arrived and are not ready
        for (let process of processes) {
            if (process.arrivalTime <= currentTime && process.status === 'NOT_READY') {
                readyQueue.push(process);
                process.status = 'READY';
            }
        }

        // If the ready queue is empty, increase current time and continue
        if (readyQueue.length === 0) {
            processes.forEach((process) => {
                process.bar.push({ color: 'gray' }); // Idle
            });
            currentTime += 1;
            continue;
        }

        const process = readyQueue.shift(); // Get the first process from the queue
        process.status = 'RUNNING';

        const execTime = Math.min(systemQuantum, process.remainingTime);

        for (let i = 0; i < execTime; i++) {
            process.remainingTime -= 1;
            processes.forEach((p) => {
                if (p.code === process.code) {
                    p.bar.push({ color: 'green' }); // Running
                } else if (p.remainingTime === 0) {
                    p.bar = [...p.bar];
                } else if (p.arrivalTime <= currentTime) {
                    p.bar.push({ color: 'yellow' }); // Waiting
                } else {
                    p.bar.push({ color: 'gray' }); // Not arrived
                }
            });
            currentTime += 1;

            // Add new processes to the ready queue during execution
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
        console.log("processes: ", processes)

        // Updated system overhead handling
        for (let i = 0; i < systemOverhead; i++) {
            processes.forEach((p) => {
                if (p.code === process.code) {
                    p.bar.push({ color: 'red' }); // Overhead for current process
                } else if (p.arrivalTime > currentTime) {
                    p.bar.push({ color: 'gray' }); // Not arrived
                }
                else if (p.remainingTime <= 0) {
                    p.bar = [...p.bar]
                } else {
                    p.bar.push({ color: 'yellow' }); // Waiting
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

        // Put the process back in the queue if not complete
        readyQueue.push(process);
    }
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


const RoundRobinScheduler = ({processes, systemVariables}) => {
    
    const [processesB, setProcessesB] = useState([
        ...(processes.map((process) => {
            return {
                ...process,
                bar:[],
                status:"NOT_READY"
            }
        }))
    ]);
    
    const [quantum, systemQuantum] = useState(systemVariables?.quantum)
    const [systemOverhead, setSystemOverhead] = useState(systemVariables?.systemOverhead)

    const [currentTime, setCurrentTime] = useState(0);
    const [maxChartLength, setMaxChartLength] = useState([]);
    const INSTANT = 500;

    useEffect(() => {
        const preComputedProcesses = runRoundRobin(processesB, quantum, systemOverhead);
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

export default RoundRobinScheduler;