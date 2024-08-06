import React from 'react';
import { Card, CardContent, Typography, TextField, Grid, createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';

const primary = {
    main: '#00796b',           // Main teal color
    light: '#48a999',          // Lighter shade of the main color
    dark: '#004c40',           // Darker shade of the main color
    contrastText: '#ffffff'    // White text contrasts well with the main color
  };
  
    const theme = createTheme({
      palette: {
        primary,
        // secondary: purple,
      },
    });

function ProcessCard({ name, status }) {
  return (
    <ThemeProvider theme={theme}>
    <Card variant="elevation" sx={{ maxWidth: 300, margin: 1,  
        '&:hover': {
          transition: 'box-shadow 0.3s',
          boxShadow: '0 8px 16px rgba(0,0,0,0.2)',
        }, }} >
      <CardContent>
        <Typography variant="h6" component="div" gutterBottom>
          {name}
        </Typography>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              label="Tempo de chegada"
              type="number"
              name="arrivalTime"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Tempo de execução"
              type="number"
              name="executionTime"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              size="small"
              fullWidth
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Deadline"
              type="number"
              name="deadline"
              InputLabelProps={{
                shrink: true,
              }}
              variant="filled"
              size="small"
              fullWidth
            />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
    </ThemeProvider>
  );
}

export default ProcessCard;
