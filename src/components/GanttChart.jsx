import React from 'react';
import { Box, Typography } from '@mui/material';

const ChartDisplay = ({ meanTurnAround, maxChartLength, currentTime, processesB }) => {
    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            // overflowX: 'auto',
        }}>
            <Box sx={{ display: 'flex', gap: 0.5, alignContent: 'center', alignItems: 'center' ,

            // overflowX: 'auto'

            }}>
                <Box
                    bgcolor={'white'}
                    height={'25px'}
                    width={'25px'}
                  flexShrink={0}
                />
                {maxChartLength.slice(0, currentTime).map((item, index) => (
                    <Box
                        key={index}
                        width={'25px'}
                        height={'25px'}
                        textAlign={'center'}
                        display={'flex'}
                        justifyContent={'center'}
                        alignItems={'center'}
                        fontFamily={'monospace'}
                        flexShrink={0}
                    >
                        {item}
                    </Box>
                ))}
            </Box>
            <Box sx={{
                display: 'flex',
                gap: 0.5
            }}>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}>
                    {processesB.map((item, index) => (
                        <Box key={index} width={'25px'} height={'25px'}
                            fontWeight={1000}
                            fontFamily={'monospace'}
                        >
                            {item.code}
                        </Box>
                    ))}
                </Box>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1
                }}>
                    {processesB.map((item, index) => (
                        <Box key={index} sx={{ display: 'flex', gap: 0.5 }}>
                            {item.bar.slice(0, currentTime).map((box, idx) => (
                                <Box
                                    bgcolor={box.color}
                                    height={'25px'}
                                    width={'25px'}
                                    key={idx}
                                    borderRadius={"5%"}
                                    sx={{
                                        borderRadius: '10%'
                                    }}
                                />
                            ))}
                        </Box>
                    ))}
                </Box>
            </Box>
          <Typography
            fontFamily={'monospace'}
            sx={{
              pt: 2
            }}
          >
            {`Turnaround médio: ${meanTurnAround}`}
          </Typography>
        </Box>
    );
};

export default ChartDisplay;