import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import ChartDisplay from './GanttChart';
import { calculateMeanTurnaround, rangeTo, findLargestBar } from './utils/utils';


const Scheduler = ({processes, systemVariables, runAlgorithm}) => {
    
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
    const [meanTurnAround, setMeanTurnAround] = useState(0);
    const INSTANT = 250;

    useEffect(() => {
        const preComputedProcesses = runAlgorithm(processesB, quantum, systemOverhead);
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

export default Scheduler;