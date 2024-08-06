import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

function BoxRenderer() {
  const [boxes, setBoxes] = useState([]);
  const [count, setCount] = useState(0);

  useEffect(() => {
    // Set up an interval to add a new box every minute (60000 milliseconds)
    const intervalId = setInterval(() => {
      setBoxes((prevBoxes) => [...prevBoxes, {}]); // Add a new box object
    }, 1000);

    // Add a box immediately on mount
    setBoxes((prevBoxes) => [...prevBoxes, {}]);

    // Cleanup interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run only on mount and unmount

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', }}>
      {boxes.map((_, index) => (
        <Box
          key={index}
          bgcolor="green"
          sx={{ width: '25px', height: '25px' }}
        />
      ))}
    </Box>
  );
}

export default BoxRenderer;