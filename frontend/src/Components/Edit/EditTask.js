import React, { useEffect } from 'react'
import {useLocation} from 'react-router-dom';
import moment  from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './EditTask.css'
function EditTask() {
    const location = useLocation();
    console.log(location.state.data);
    const [Project_id,setProject_id]=React.useState(location.state.data.parentItem.taskId)
    const [progress,setProgress]=React.useState(location.state.data.taskData.Progress)
  const [startdate,setStartdate]=React.useState(moment(location.state.data.taskData.StartDate).format("YYYY-MM-DD"))
  const [enddate,setEnddate]=React.useState(moment(location.state.data.taskData.EndDate).format("YYYY-MM-DD"))
  const [projecterror,setProjecterror]=React.useState(false)
  const [startdateerror,setStartdateerror]=React.useState(false)
  const [enddateerror,setEnddateerror]=React.useState(false)
  const [state, setstate] = React.useState({})
 console.log(Project_id,progress,startdate,enddate);
 useEffect(() => {
  return axios.post("http://localhost:4000/project/getAProject",{_id:Project_id}).then((res)=>{
    console.log(res.data);
    setstate(res.data)
})
 }, [Project_id])
 console.log(state);
 const navigate = useNavigate();
const updateTask=()=>{
    console.log("task");
    if (progress === "") {
        setProjecterror("*enter Project Progress")
    }
    else{
      setProjecterror(false)
    }
    if (startdate === "") {
      setStartdateerror("*Select start date")
    }
    else{
      setStartdateerror(false)
    }
    if (enddate === "") {
      setEnddateerror("*Select end date")
    }
    else{
      setEnddateerror(false)
    }

    if(!projecterror && !startdateerror && !enddateerror){
        console.log("taskup");
    axios.patch(`http://localhost:4000/category/updateCategory/${Project_id}`,{
       Task_name:location.state.data.taskData.project_name,
        Start_date:startdate,
        End_date:enddate,
        Percentage:progress
    }).then((res)=>{

        console.log(res.data);
        navigate('/')
    }).catch((e)=>{
        console.log(e);
    })
}
}
const validatePercentage =(e)=>{
  console.log(e);
  setProgress(e)
  if(e > 100){
    setProjecterror("Percentage should be less than or equal to 100 ")
  }
  else{
    setProjecterror(" ")
    setProgress(e)
  }

}
const validate =(e)=>{
  console.log(e);
  setEnddate(e)
  let start_project = new Date(state.Project_id.Start_date)
  let end_project = new Date(state.Project_id.Start_date)
 let start = new Date(startdate)
 let end = new Date(e)

 if(start.getTime() > end.getTime()){
   setEnddateerror("End date is less than start date")
 }

 else if(start.getTime() === end.getTime()){
   setEnddateerror("End date and  start date are same")
  }
 else{
   setEnddateerror(" ")
   setEnddate(e)
 }
}
console.log(enddateerror);
    return (
        <div> 
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <br/>
      <div className="update-task">
                <div className="modal-top">
        <p>
         Update <span>{location.state.data.taskData.project_name}</span>Task
        </p>
        </div>
        <div className="input-grid">
          <div>
            <label for="Task Progress">Task Progres</label>
            <input
              className="input"
              id="Task Progres"
              type='number'
              value={progress}
              name="projectname"
              placeholder="Enter Task Progres"
              onChange={(e)=>validatePercentage(e.target.value)}
            />
            
          </div>
          <div className='error'>{projecterror === "" ?"":projecterror}</div> 
          <div>
            <label for="startdate">Start Date</label>
            <input
              className="input"
              id="startdate"
              type="date"
               value={startdate}
              name="startdate"
             onChange={(e)=>setStartdate(e.target.value)}
              placeholder="start date"
              required
            />
            
          </div>
          <div className='error'>{startdateerror === "" ?"":startdateerror}</div> 
          <div>
            <label for="enddate">End Date</label>
            <input className="input" id="enddate" type="date" 
            value={enddate} 
            name="enddate" 
            onChange={(e)=>validate(e.target.value)} 
              required />
           
          </div>
          <div className='error'>{enddateerror === "" ?"":enddateerror}</div> 
          <div className="modal-bottom">
         
          <button className="modal-button-bottom" onClick={()=>updateTask()}>Submit</button>
          <button
            className="modal-button-bottom"
            onClick={() => navigate('/')}
          >
            Back
          </button>
       
        </div>
        </div>
       
        </div>
      </div>
  
         
        
    )
}

export default EditTask
