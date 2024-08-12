import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ChartDisplay from './GanttChart';
import { calculateMeanTurnaround } from './utils/utils';

function run_sjf(processes) {
    
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
                bar:[],
                status:"NOT_READY"
            }
        }))
    ]);

    const [currentTime, setCurrentTime] = useState(0);
    const [maxChartLength, setMaxChartLength] = useState([]);
    const [meanTurnAround, setMeanTurnAround] = useState(0);
    const INSTANT = 250;

    useEffect(() => {
        console.log("processesB", processesB)
        const preComputedProcesses = run_sjf(processesB);
        setProcessesB(preComputedProcesses)
        const largest = findLargestBar(processesB);
        setMaxChartLength(rangeTo(largest - 1))
        const mta = calculateMeanTurnaround(processesB)
        setMeanTurnAround(mta);

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
        <ChartDisplay 
            meanTurnAround={meanTurnAround}
            maxChartLength={maxChartLength}
            currentTime={currentTime}
            processesB={processesB}
        />
    )
}

export default SjfScheduler;