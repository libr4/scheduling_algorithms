import React from 'react'
import { Box, Button, Divider, FormControlLabel, MenuItem, Select, createTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import ProcessCard from './ProcessCard';
import FullScreenDialog from './FullScreenDialog';
import BoxRenderer from './BoxRenderer';
import FifoScheduler from './FifoScheduler';


export default function ProcessForm() {

  const algorithms = ["FIFO", "SJF", "RR", "EDF"];

  return (
    <form>
    <TextField
      label="Quantum"
      type="number"
      name="quantum"
      size='small'
      variant="filled"
    />
    <TextField
      label="Sobrecarga do sistema"
      type="number"
      name="systemOverhead"
      size='small'
      variant="filled"
    />
    <Divider />
    <Select
            name='type'
            size='small'
            defaultValue={algorithms[0]}
            sx={
              {
                width:'50%'
              }
            }
          >
            {
              algorithms.map((item, index) => {
                return  <MenuItem key={index} value={item}>
                          {item}
                        </MenuItem>

              })
            }
          </Select>
    <Divider />
    <TextField
      label="Nº de processos:"
      type="number"
      InputProps={{ inputProps: { min: 0, max: 1000 } }}
      name="systemOverhead"
      size='small'
      variant="filled"
      sx={{width:'200px'}}
    />
          <Button variant='contained'>Criar Processo</Button>
          <Box sx={{display:'flex', flexWrap:'wrap'}}>
            <ProcessCard name={"test"}></ProcessCard>
            {/* <ProcessCard></ProcessCard>
            <ProcessCard></ProcessCard>
            <ProcessCard></ProcessCard>
            <ProcessCard></ProcessCard> */}
          </Box>
          <Button variant='contained' size='large'>Run</Button>
          <FullScreenDialog></FullScreenDialog>
          {/* <BoxRenderer></BoxRenderer> */}
          <FifoScheduler></FifoScheduler>


 </form>
  )
}
