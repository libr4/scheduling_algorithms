import React from 'react'
import { Box, Button, Divider, FormControlLabel, MenuItem, Select, Typography, createTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import FullScreenDialog from './FullScreenDialog.jsx';
import { useState } from 'react';


export default function ProcessForm({algorithm, setAlgorithm, dialogOpen, setDialogOpen, createdProcesses, setCreatedProcesses}) {

  const algorithms = ["FIFO", "SJF", "RR", "EDF"];
  const [nProcesses, setNProcesses] = useState(0);
  const [selectedAlgorithm, setSelectedAlgorithm] = useState(0);

function handleCreateProcesses() {
    const processCards = [];
    for (let i = 0; i < nProcesses; i++) {
      processCards.push({
        code:`P${i + 1}`
      })
    }
    setCreatedProcesses(processCards);
  }

  function handleRun(event) {
    event.preventDefault()
    setDialogOpen(true)
  }
    return (
    <Box onSubmit={(e) => handleRun(e)}  component={'form'} sx={{flex:0.5, display:'flex', gap:1, maxHeight:'100%', flexDirection:'column', alignContent:'center'}}>
    <Box sx={{display:'flex', flexDirection:'column'}}>
    <Typography>Selecione um algoritmo</Typography>
    <Select
            name='type'
            size='small'
            defaultValue={algorithms[0]}
            onChange={(event) => {setAlgorithm(event.target.value)}}
            sx={
              {
                // width:'50%'
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
        </Box>
    <Box sx={{display:'flex', gap:1, justifyContent:'space-between'}}>
      <TextField
        disabled = {(algorithm == "FIFO" || algorithm == "SJF")}
        label="Quantum"
        type="number"
        name="quantum"
        size='small'
        // variant="filled"
      />
      <TextField
        disabled = {(algorithm == "FIFO" || algorithm == "SJF")}
        label="Sobrecarga do sistema"
        type="number"
        name="systemOverhead"
        size='small'
        // variant="filled"
      />
    </Box>
    <Divider />
    {/* <Divider /> */}
    <Box sx={{display:'flex', gap:1, justifyItems:'stretch'}}>
    <TextField
      label="Nº de processos:"
      type="number"
      // InputProps={{ inputProps: { min: 0, max: 1000 } }}
      name="nProcesses"
      size='small'
      variant="filled"
      onChange={(event) => {setNProcesses(event.target.value)}}
      // sx={{width:'200px'}}
    />
          <Button onClick={handleCreateProcesses} sx={{backgroundColor:'#291E67', flex:1}} variant='contained' size='small'>Criar Processo(s)</Button>
          </Box>  
          {/* <Box sx={{display:'flex', flexWrap:'wrap'}}>
            <ProcessCard name={"test"}></ProcessCard>
          </Box> */}
          <Button disabled={createdProcesses <= 0} type='submit' sx={{backgroundColor:'#006400'}} variant='contained' size='large'>Run</Button>
          <FullScreenDialog></FullScreenDialog>
          {/* <BoxRenderer></BoxRenderer> */}
          {/* <FifoScheduler></FifoScheduler> */}
          {/* <SjfScheduler></SjfScheduler> */}


 </Box>
  )
}
