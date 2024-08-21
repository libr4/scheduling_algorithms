import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import ProcessForm from './components/ProcessForm.jsx';
import ufbalogo from './assets/ufbalogocolorido.png'
import iclogo from './assets/iclogocolorido2.png'
import { Box } from '@mui/material';
import ProcessCard from './components/ProcessCard.jsx';
import FullScreenDialog from './components/FullScreenDialog.jsx';

function App() {
  // const [count, setCount] = useState(0)
  const [createdProcesses, setCreatedProcesses] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [algorithm, setAlgorithm] = useState("FIFO");
  const [systemVariables, setSystemVariables] = useState({
    quantum:2,
    systemOverhead:1
  });

  const updateProcessData = (index, field, value) => {
    const updatedProcesses = [...createdProcesses];
    updatedProcesses[index][field] = Number(value);
    setCreatedProcesses(updatedProcesses);
  };

  return (
    <Box>
      <CssBaseline />
    <Box sx={{ display:'flex', alignItems:'center', alignContent:'center', gap:5, height:'55vh'}}>
      <Box sx={{height:'250px', flex:0.5, width:'100%', display:'flex', justifyContent:'center'}}>
        <Box sx={{maxHeight:'100%'}} component={'img'} src={ufbalogo}></Box>
      </Box>
      <Box sx={{justifyContent:'center', gap:1, height:'300px', flexDirection:'column', alignContent:'center',
          border:'5px solid #2C3382',
          pt:0,
          px:5,
          borderRadius:'5%'
      }}>
      <ProcessForm  systemVariables={systemVariables} setSystemVariables={setSystemVariables} 
                    algorithm={algorithm} setAlgorithm={setAlgorithm} 
                    dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} 
                    createdProcesses={createdProcesses} setCreatedProcesses={setCreatedProcesses} />

      </Box>
      <Box sx={{height:'250px', flex:0.5, width:'100%', display:'flex', justifyContent:'center'}}>
        <Box sx={{maxHeight:'100%'}} component={'img'} src={iclogo}></Box>
      </Box>
    </Box>
    <FullScreenDialog systemVariables={systemVariables} createdProcesses={createdProcesses} 
                      selectedAlgorithm={algorithm} 
                      dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} />
      <Box sx={{display:'flex', flexWrap:'wrap', justifyContent:'center', marginTop:3}}>
        {createdProcesses.map((process, index)=> {
          return <ProcessCard
          key={index}
          index={index}
          code={process.code}
          arrivalTime={process.arrivalTime}
          remainingTime={process.remainingTime}
          deadline={process.deadline}
          updateProcessData={updateProcessData}
        />
        })}
      </Box>
    </Box>
  )
}

export default App
