import * as React from 'react';

import './AddProject.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';


export default function TransitionsModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [project,setProject]=React.useState("")
  const [startdate,setStartdate]=React.useState("")
  const [enddate,setEnddate]=React.useState("")
  const [desc,setDesc]=React.useState("")
  const [projecterror,setProjecterror]=React.useState(false)
  const [startdateerror,setStartdateerror]=React.useState(false)
  const [enddateerror,setEnddateerror]=React.useState(false)
  const [descerror,setDescerror]=React.useState(false)
  const [task, settask] = React.useState([
    { Task_name: 'UI', Start_date: '', End_date: '', Percentage: 0,Duration:0 ,error:false},
    { Task_name: 'API', Start_date: '', End_date: '', Percentage: 0,Duration:0 ,error:false},
    { Task_name: 'DB',Start_date: '', End_date: '', Percentage: 0,Duration:0,error:false},
    { Task_name: 'TEST', Start_date: '',End_date: '', Percentage: 0,Duration:0,error:false},
  ]);
  const [taskvalidation,settaskvalidation]=React.useState(false)
 
const navigate = useNavigate();

console.log(taskvalidation);

    const handleChangeInput = (id, event) => {
    
    const newc = task.map((i) => {
      if (id === i.Task_name ) {
       if(event.target.name === "Start_date" ){
         if(event.target.value !== ""){
          let start = new Date(startdate)
        
          let end = new Date(event.target.value)
          
         if(end.getTime() >= start.getTime() ){
          i.error = " "
          i[event.target.name] = event.target.value;
       }
       else{
         i.error = `${i.Task_name} start date should be equal to project start date  `
       }
         }
         else{
          i.error = `enter ${i.Task_name} start date `
         }
        
       }
       else if (event.target.name === "End_date") {
        if(event.target.value !== ""){
          let start = new Date(enddate)
          let end = new Date(event.target.value)
          
         if(end.getTime() <= start.getTime() ){
          i.error = " "
          i[event.target.name] = event.target.value;
       }
       else{
         i.error = `${i.Task_name} end date should be equal to project end date  `
       }

        }
   else{
          i.error = `enter ${i.Task_name} end date `
         }
       
      }
      else{
       
        if(event.target.name === "Percentage" ){
          if(event.target.value !== ""){
            if(event.target.value > 100){
              i.error = `${i.Task_name} Percentage should be less than or equal to 100 `
            }
            else{
              i.error = " "
        i[event.target.name] = event.target.value;
            }
          }
          else{
            i.error = `enter ${i.Task_name} percentage `
           }
        }
      }
          i[event.target.name] = event.target.value;
        }
       
      console.log(i);
      return i;
    });

    settask(newc);
  };




 const validate =(e)=>{
   console.log(e);

  let start = new Date(startdate)
  let end = new Date(e)
  console.log(start.getTime() < end.getTime());
  if(start.getTime() > end.getTime()){
    setEnddateerror("End date is lesser than start date")
  }
  else if(start.getTime() === end.getTime()){
    setEnddateerror("End date and  start date are same")
   }
  else{
    setEnddateerror(" ")
    setEnddate(e)
  }
 }
 


const submit =()=>{
  console.log("submit");
  if (project === "") {
    setProjecterror("*enter project name")
}
else{
  setProjecterror("")
}
if (startdate === "") {
  setStartdateerror("*Select start date")
}
else{
  setStartdateerror("")
}
if (enddate === "") {
  setEnddateerror("*Select end date")
}
else{
  setEnddateerror("")
}
if (desc === "") {
  setDescerror("*enter project description")
}
else{
  setDescerror("")
}
task.forEach((e)=>{
 if(e.Start_date === "" || e.End_date === "" || e.Percentage === null){
   settaskvalidation(`add Task detail`)
 }
 else{
   settaskvalidation("")
 }
})

  if(projecterror === "" && startdateerror==="" && enddateerror==="" && descerror==="" && taskvalidation ===""){

    console.log("tasksubmission");
    localStorage.removeItem("Project")
    localStorage.removeItem("task")
    
         axios.post('http://localhost:4000/project/addProject',{
            Task_name:project,
      Start_date:startdate,
      End_date:enddate,
      Percentage:0,
      Duration:0,
     Description:desc
          }).then((res)=>{
            console.log(res.data);
               axios.post('http://localhost:4000/category/addCategory',{
              Project_id:res.data._id,
              Task:task.map((e)=>{
                return{
                  Task_name:e.Task_name,
    Start_date: e.Start_date,
    End_date: e.End_date,
    Percentage: e.Percentage,
    Duration: e.Duration,
                }
              })
            }).then((res)=>{
              console.log(res.data);
              navigate('/')
            }).catch((e)=>console.log(e))
          }).catch((e)=>console.log(e))
  }
  
       
        
}
  return (
    <div className="add-project">
      <br/>
      <br/>
      <br/>
      <br/>
      
     
          <div className="modal-top">
        <p>
          ADD <span>PROJECT</span>
        </p>
      </div>
      <div className="modal-form">
        <div className="gg">
          <div>
            <label for="projectname">Project Name</label>
            <input
              className="input"
              id="projectname"
              type="text"
              value={project}
              name="projectname"
              placeholder="Enter project name"
              onChange={(e)=>{setProject(e.target.value) 
                
                setProjecterror(" ")}}
            />
            <div className='error'>{projecterror === "" ?"":projecterror}</div>
          </div>
          <div>
            <label for="startdate">Start Date</label>
            <input
              className="input"
              id="startdate"
              type="date"
              value={startdate}
              name="startdate"
              onChange={(e)=>{setStartdate(e.target.value)
                setStartdateerror(" ")}}
              placeholder="start date"
              required
            />
            <div className='error'>{startdateerror === "" ?"":startdateerror}</div>
          </div>
          <div>
            <label for="enddate">End Date</label>
            <input className="input" id="enddate" type="date" value={enddate} name="enddate" onChange={(e)=>{validate(e.target.value)
              }} required />
            <div className='error'>{enddateerror === "" ?"":enddateerror}</div>
          </div>
         
        </div>
       
        <div>
        <div className="textarea">
            <label for="Description">Description</label>
            <textarea className="input-textarea" id="eDescription" type="date" value={desc}   placeholder="Description" onChange={(e)=>{setDesc(e.target.value)
              setDescerror(" ")}} required/>
          </div>
          <div className='error'>{descerror === "" ?"":descerror}</div>
          {
          task.map((e) => {
           
            return (
              <div>
                 <div className='error'>{taskvalidation===""  ?"":taskvalidation }</div>
                <p className="task">{e.Task_name}</p>
                <div className="gg">
                  <div>
                    <label for="startdate">Start Date</label>
                    <input
                      className="input"
                      id="startdate"
                      type="date"
                      name="Start_date"
                      value={e.Start_date}
                      placeholder="start date"
                      required
                      onChange={(ev) => handleChangeInput(e.Task_name, ev)}
                    />
                   
                   
                  </div>
                  
                  <div>
                    <label for="enddate">End Date</label>
                    <input
                      className="input"
                      id="enddate"
                      type="date"
                      value={e.End_date}
                      name="End_date"
                      required
                      onChange={(ev) => handleChangeInput(e.Task_name, ev)}
                    />
                    
                    
                  </div>
                 
                  <div>
                    <label for="Progress Percentage">Progress</label>
                    <input
                      className="input"
                      id="Progress Percentage"
                      type="number"
                      name="Percentage"
                      value={ e.Percentage}
                      placeholder="Enter Percentage"
                      required
                      onChange={(ev) => handleChangeInput(e.Task_name, ev)}
                    />
                    
                     
                  </div>
                </div>
                <div className='error'>{e.error === "" ?"":e.error}</div>
              </div>
            );
          })
          }
          
        </div>

        <div className="modal-bottom">
      
          <button className="modal-button-bottom" onClick={()=>submit()}>Submit</button>
          <button
            className="modal-button-bottom"
            onClick={() => navigate('/')}
          >
            Back
          </button>
        </div>
      </div>
            
      
     
    </div>
  );
}
