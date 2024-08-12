import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

function run_fifo(processes) {
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


const FifoScheduler = ({processes}) => {
    
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
    const INSTANT = 250;

    useEffect(() => {
        console.log("processesB", processesB)
        const preComputedProcesses = run_fifo(processesB);
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
                return  <Box 
                    key={index} width={'25px'} height={'25px'} textAlign={'center'}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                    fontFamily={'monospace'}
                    >
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
                return  <Box key={index} width={'25px'} height={'25px'}
                fontWeight={1000}
                fontFamily={'monospace'}
                >
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

export default FifoScheduler;