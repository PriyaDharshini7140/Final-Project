import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import './AddProject.css';

import { TextField } from '@mui/material';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 1300,
  bgcolor: 'white',
  boxShadow: 15,
padding:0,
border:"1px solid #34BE82",
borderRadius:'20px',
  p: 0,
};

export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
const category = ["UI",'API','DB','TEST']
  return (
    <div>
      <button className="modal-button" onClick={handleOpen}>Open modal</button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
    
          <Box sx={style}>
              <div className='modal-top'>
                  <p>ADD <span>PROJECT</span></p>
              </div>
              <div className='modal-form'>
              <div className='gg'>
                  <div className='g'>
             <label for='projectname'>Project Name</label>
              <input className='input' id='projectname' type='text' name='projectname' placeholder='Enter project name'/>
              </div>
              <div className='g'>
              <label for='startdate'>Start Date</label>
              <input className='input' id='startdate' type='date' name='startdate' placeholder='start date'/>
              </div>
              <div className='g'>
              <label for='enddate'>End Date</label>
              <input className='input' id='enddate' type='date' name='enddate'/>
              </div>
              </div>
             <div>
            
                 
                     {category.map((e)=>{
                         console.log(e);
                        return(
                            <div>
                                <p className='task'>{e}</p>
                                <div className='gg'>
                 
              <div className='g'>
              <label for='startdate'>Start Date</label>
              <input className='input' id='startdate' type='date' name='startdate' placeholder='start date'/>
              </div>
              <div className='g'>
              <label for='enddate'>End Date</label>
              <input className='input' id='enddate' type='date' name='enddate'/>
              </div>
              <div className='g'>
             <label for='Progress Percentage'>Progress</label>
              <input className='input' id='Progress Percentage' type='text' name='projectname' placeholder='Enter Percentage'/>
              </div>
              </div>
                            </div>
                        )
    
                     })}
                
                
              
             </div>

             <div className='modal-bottom'>
                 <button className="modal-button-bottom">save</button>
                 <button className="modal-button-bottom">submit</button>
                 <button className="modal-button-bottom" onClick={()=>setOpen(false)}>close</button>
             </div>
             </div>
             </Box>
      
      </Modal>
    </div>
  );
}
