import React from 'react';
import { Box, Typography } from '@mui/material';

const Legend = () => {

  const legendItems = [
    { color: 'green', label: 'Executando' },
    { color: 'yellow', label: 'Em espera' },
    { color: 'red', label: 'Sobrecarga' },
    { color: 'black', label: 'Fora do prazo' },
  ];

  return (
    <Box sx={{ p:0.75, display: 'flex', justifyContent: 'flex-end' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', maxWidth: '300px', alignItems:'center', alignContent:'center',
        justifyContent:'center', justifyItems:'center'
       }}>
        {legendItems.map((item, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
              width: '50%',
            }}
          >
            <Box border={'1px solid black'} borderRadius={'50%'} bgcolor={item.color} height={'20px'} width={'20px'} />
            <Typography fontFamily={'monospace'} style={{ marginLeft: '8px' }}>{item.label}</Typography>
          </div>
        ))}
      </div>
    </Box>
  );
};

export default Legend;
