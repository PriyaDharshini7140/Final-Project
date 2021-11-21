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
    { Task_name: 'UI', Start_date: '', End_date: '', Percentage: 0,Duration:0 },
    { Task_name: 'API', Start_date: '', End_date: '', Percentage: 0,Duration:0 },
    { Task_name: 'DB',Start_date: '', End_date: '', Percentage: 0,Duration:0},
    { Task_name: 'TEST', Start_date: '',End_date: '', Percentage: 0,Duration:0},
  ]);
const navigate = useNavigate();
console.log(navigate);
  const Cache_project = JSON.parse(localStorage.getItem("Project"))
  const Cache_task = JSON.parse(localStorage.getItem("task"))
  // console.log(Cache_task);
    const handleChangeInput = (id, event) => {
    console.log(id);
    const newc = task.map((i) => {
      if (id === i.Task_name ) {
       
          i[event.target.name] = event.target.value;
        }
       
      console.log(i);
      return i;
    });

    settask(newc);
  };

 let OverallPercentage = 0
  // console.log(task);
  let percentage=0
  let duration=0
  task.forEach((e)=>{
var Start_date = moment(e.Start_date, "YYYY-MM-DD");
	var End_date = moment(e.End_date, "YYYY-MM-DD");
	var d=End_date.diff(Start_date,"days");
 percentage += e.Percentage * d;
duration += d
console.log("Percentage",percentage,duration);

  })
  console.log("Percentage",percentage,duration);
  OverallPercentage =Math.round(percentage/duration);
  console.log("overall",OverallPercentage);
  
const save=()=>{
  const project_detail={ Task_name:project,
    Start_date:startdate,
    End_date:enddate,
    Percentage:OverallPercentage,
    Duration:0,
   Description:desc}
  localStorage.setItem("Project",JSON.stringify(project_detail))
   localStorage.setItem("task",JSON.stringify(task))
   navigate('/')
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
  if(projecterror === "" && startdateerror==="" && enddateerror==="" && descerror===""){

    console.log("tasksubmission");
    localStorage.removeItem("Project")
    localStorage.removeItem("task")
    
         axios.post('http://localhost:4000/project/addProject',{
            Task_name:project,
      Start_date:startdate,
      End_date:enddate,
      Percentage:OverallPercentage,
      Duration:0,
     Description:desc
          }).then((res)=>{
            console.log(res.data);
               axios.post('http://localhost:4000/category/addCategory',{
              Project_id:res.data._id,
              Task:task
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
              value={Cache_project?Cache_project.Task_name:project}
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
              value={Cache_project?Cache_project.Start_date:startdate}
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
            <input className="input" id="enddate" type="date" value={Cache_project?Cache_project.End_date:enddate} name="enddate" onChange={(e)=>{setEnddate(e.target.value)
              setEnddateerror(" ")}} required />
            <div className='error'>{enddateerror === "" ?"":enddateerror}</div>
          </div>
         
        </div>
       
        <div>
        <div className="textarea">
            <label for="Description">Description</label>
            <textarea className="input-textarea" id="eDescription" type="date" value={Cache_project?Cache_project.Description:desc}   placeholder="Description" onChange={(e)=>{setDesc(e.target.value)
              setDescerror(" ")}} required/>
          </div>
          <div className='error'>{descerror === "" ?"":descerror}</div>
          {
          task.map((e) => {
           
            return (
              <div>
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
              </div>
            );
          })
          }
          
        </div>

        <div className="modal-bottom">
          <button className="modal-button-bottom" onClick={()=>save()}>Save</button>
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
