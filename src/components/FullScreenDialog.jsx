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

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="right" ref={ref} {...props} />;
});

export default function FullScreenDialog({dialogOpen, setDialogOpen, selectedAlgorithm}) {

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
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              {selectedAlgorithm}
            </Typography>
            {/* <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button> */}
          </Toolbar>
        </AppBar>
        <Box sx={{m:3}}>
          {selectedAlgorithm === "FIFO" ?
            <FifoScheduler></FifoScheduler>
            :
            <SjfScheduler></SjfScheduler>
          }
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
