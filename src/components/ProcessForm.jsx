import React from 'react'
import { Box, Button, Divider, FormControlLabel, MenuItem, Select, Typography, createTheme } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useState } from 'react';


export default function ProcessForm({systemVariables, setSystemVariables, algorithm, setAlgorithm, dialogOpen, setDialogOpen, createdProcesses, setCreatedProcesses}) {

  const algorithms = ["FIFO", "SJF", "RR", "EDF"];
  const [nProcesses, setNProcesses] = useState(0);

function handleCreateProcesses() {
  setCreatedProcesses((prevProcesses) => {
      const processCards = [...prevProcesses];

      if (nProcesses > prevProcesses.length) {
          for (let i = prevProcesses.length; i < nProcesses; i++) {
              processCards.push({ 
                  code: `P${i + 1}`,
                  arrivalTime: 0,
                  remainingTime: 1,
                  deadline: 0
              });
          }
      } else if (nProcesses < prevProcesses.length) {
          processCards.length = nProcesses;
      }

      return processCards;
  });
}

  function handleRun(event) {
    event.preventDefault()
    setDialogOpen(true)
  }

  function handleSystemVariables(event) {
    setSystemVariables((prevSV) => {
      return {
        ...prevSV,
        [event.target.name]:parseInt(event.target.value)
      }
    })

  }
    return (
    <Box elevation={3} onSubmit={(e) => handleRun(e)}  component={'form'} 
      sx={{flex:0.5, display:'flex', gap:1, 
          maxHeight:'100%', flexDirection:'column', alignContent:'center',
          
          }}>
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
        fullWidth
        size='small'
        defaultValue={2}
        onChange={handleSystemVariables}
      />
      <TextField
        disabled = {(algorithm == "FIFO" || algorithm == "SJF")}
        label="Sobrecarga do sistema"
        type="number"
        name="systemOverhead"
        size='small'
        defaultValue={1}
        onChange={handleSystemVariables}
      />
    </Box>
    <Divider />
    <Box sx={{display:'flex', gap:1, justifyItems:'stretch'}}>
    <TextField
      label="Nº de processos:"
      type="number"
      name="nProcesses"
      size='small'
      variant="filled"
      onChange={(event) => {setNProcesses(event.target.value)}}
      bgcolor={'white'}
      sx={{backgroundColor:'white'}}
    />
          <Button onClick={handleCreateProcesses} sx={{backgroundColor:'#2C3382', flex:1}} variant='contained' size='small'>Criar Processo(s)</Button>
          </Box>  
          <Button disabled={createdProcesses <= 0} onClick={() => console.log("systemvariables", systemVariables)} type='submit' sx={{backgroundColor:'rgb(85, 174, 70)'}} variant='contained' size='large'>Run</Button>
 </Box>
  )
}
