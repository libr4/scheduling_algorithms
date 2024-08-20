import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import FifoScheduler from './FifoScheduler.jsx';
import SjfScheduler from './SjfScheduler.jsx';
import CloseIcon from '@mui/icons-material/Close';
import { Box } from '@mui/material';
import RoundRobinScheduler from './RoundRobinScheduler.jsx';
import EdfScheduler from './EdfScheduler.jsx'
import Legend from './Legend.jsx';
import Scheduler from './Scheduler.jsx';
// import run_fifo from '../algorithms/fifo.js';
import { run_fifo, run_sjf, runRoundRobin, runEDF } from '../algorithms'

const algorithmNames = {
  FIFO:"FIFO",
  SJF: "SHORTEST JOB FIRST",
  RR: "ROUND ROBIN",
  EDF: "EARLIEST DEADLINE FIRST"
}

const functions = {
  FIFO: run_fifo,
  SJF: run_sjf,
  RR: runRoundRobin,
  EDF: runEDF
}


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function FullScreenDialog({systemVariables, createdProcesses, dialogOpen, setDialogOpen, selectedAlgorithm}) {
  console.log("createdProcesses", createdProcesses)

  const handleClose = () => {
    setDialogOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen
        open={dialogOpen} // Ensure dialogOpen is always provided and defined
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar  sx={{ position: 'relative', }} elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div"
                    fontFamily={'monospace'}
                    fontWeight={1000}
            >
              { algorithmNames[selectedAlgorithm] }
            </Typography>
            <Legend />
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Box sx={{m:3}}>
          {
            <Scheduler processes={createdProcesses} systemVariables={systemVariables} runAlgorithm={functions[selectedAlgorithm]}></Scheduler>
          }
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
