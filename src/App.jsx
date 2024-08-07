import { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import ProcessForm from './components/ProcessForm.jsx';
import ufbalogo from './assets/ufbalogo.png'
import iclogo from './assets/iclogo.png'
import { Box } from '@mui/material';
import ProcessCard from './components/ProcessCard.jsx';
import FullScreenDialog from './components/FullScreenDialog.jsx';

function App() {
  // const [count, setCount] = useState(0)
  const [createdProcesses, setCreatedProcesses] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [algorithm, setAlgorithm] = useState("FIFO");

  return (
    <Box>
      <CssBaseline />
    <Box sx={{ display:'flex', alignItems:'center', alignContent:'center', gap:5, height:'55vh'}}>
      <Box sx={{height:'300px', flex:0.5, width:'100%', display:'flex', justifyContent:'center'}}>
        <Box sx={{maxHeight:'100%'}} component={'img'} src={ufbalogo}></Box>
      </Box>
      {/* <Box component='img' src={ufbalogo} sx={{height:'300px', flex:0.5}}></Box> */}
      <Box sx={{justifyContent:'center', gap:1, height:'300px', flexDirection:'column', alignContent:'center'}}>
      <ProcessForm algorithm={algorithm} setAlgorithm={setAlgorithm} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} createdProcesses={createdProcesses} setCreatedProcesses={setCreatedProcesses}></ProcessForm>
      </Box>
      <Box sx={{height:'300px', flex:0.5, width:'100%', display:'flex', justifyContent:'center'}}>
        <Box sx={{maxHeight:'100%'}} component={'img'} src={iclogo}></Box>
      </Box>
    </Box>
    <FullScreenDialog selectedAlgorithm={algorithm} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen}></FullScreenDialog>
      <Box sx={{display:'flex', flexWrap:'wrap', justifyContent:'center', marginTop:3}}>
        {createdProcesses.map((process, index)=> {
          return <ProcessCard key={index} code={process.code}></ProcessCard>
        })}
      </Box>
    </Box>
  )
}

export default App
