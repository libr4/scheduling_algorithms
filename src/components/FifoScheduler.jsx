import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

const FifoScheduler = () => {
    const [processes, setProcesses] = useState([
        { code: 'P1', arrivalTime: 0, remainingTime: 6, status: 'WAITING' },
        // { code: 'P2', arrivalTime: 2, remainingTime: 2, status: 'WAITING' },
        // { code: 'P3', arrivalTime: 4, remainingTime: 1, status: 'WAITING' }
    ]);

    const [currentTime, setCurrentTime] = useState(0);
    const INSTANT = 1000;

    useEffect(() => {
        const runFifo = async () => {
            for (let i = 0; i < processes.length; i++) {
                let process = processes[i];
                while (process.arrivalTime > currentTime) {
                    await idle();
                }
                process.status = 'RUNNING';
                setProcesses([...processes]); // Trigger re-render
                while (process.remainingTime > 0) {
                    await run(process);
                }
                finish(process);
            }
        };

        runFifo();
    }, []);

    const finish = (process) => {
        console.log(`Process: ${process.code} finished`);
        process.status = 'COMPLETE';
        setProcesses([...processes]); // Trigger re-render
    };

    const run = async (process) => {
        console.log(`${currentTime}: Process: ${process.code} running...`);
        process.remainingTime -= 1;
        setProcesses([...processes]); // Trigger re-render
        await sleep(INSTANT);
        setCurrentTime(currentTime + 1);
    };

    const idle = async () => {
        console.log(`${currentTime}: Nothing is running...`);
        await sleep(INSTANT);
        setCurrentTime(currentTime + 1);
    };

    const sleep = (ms) => {
        return new Promise((resolve) => setTimeout(resolve, ms));
    };

    return (
        <div>
            {processes.map((process) => (
                <div key={process.code}>
                    <span>{process.code}</span>
                    {[...Array(process.remainingTime)].map((_, index) => (
                        <Box
                            key={index}
                            bgcolor={process.status === 'RUNNING' ? 'green' : 'yellow'}
                            sx={{ width: '25px', height: '25px', display: 'inline-block', margin: '2px' }}
                        ></Box>
                    ))}
                </div>
            ))}
        </div>
    );
};

export default FifoScheduler;