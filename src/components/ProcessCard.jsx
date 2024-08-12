import React from 'react';
import { Card, CardContent, Typography, Grid, TextField } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme();

function ProcessCard({ index, code, arrivalTime, remainingTime, deadline, updateProcessData }) {
  // Handle input changes and update parent state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    updateProcessData(index, name, value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Card
        variant="elevation"
        sx={{
          maxWidth: 300,
          margin: 1,
          borderRadius:'5%',
          // bgcolor:'#291E67',
          border:'2px solid #291E67',
          '&:hover': {
            transition: 'box-shadow 0.3s',
            boxShadow: '0 8px 16px rgba(0,0,0,0.5)',
          },
        }}
      >
        <CardContent>
          <Typography variant="h6" color={'#291E67'} fontWeight={1000} component="div" gutterBottom>
            {code}
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
                value={arrivalTime}
                onChange={handleInputChange}
                sx={{
                  '& .MuiFilledInput-root': {
                  backgroundColor: '#f5f5f5', // Background color of input field
                },}}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                label="Tempo de execução"
                type="number"
                name="remainingTime"
                InputLabelProps={{
                  shrink: true,
                }}
                variant="filled"
                size="small"
                fullWidth
                value={remainingTime}
                onChange={handleInputChange}
                sx={{
                  '& .MuiFilledInput-root': {
                  backgroundColor: '#f5f5f5', // Background color of input field
                },}}
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
                value={deadline}
                onChange={handleInputChange}
                sx={{
                  '& .MuiFilledInput-root': {
                  backgroundColor: '#f5f5f5', // Background color of input field
                },}}
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </ThemeProvider>
  );
}

export default ProcessCard;
