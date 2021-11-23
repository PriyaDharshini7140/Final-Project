import React, { useEffect, useState } from 'react'
import { GanttComponent ,Inject, Edit, Selection,ColumnsDirective,ColumnDirective,Toolbar} from '@syncfusion/ej2-react-gantt'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './GanttChart.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function GanntChart() {
   const [timeline, settimeline] = useState("Week")
    const [state, setstate] = useState([])
    const load =()=>{
        
        return axios.get("http://localhost:4000/project/getAlllProject").then((res)=>{
            setstate(res.data)
        })
    }
    const load1 =(e)=>{
        console.log(e);
        axios.patch(`http://localhost:4000/project/updateProject/${e._id}`,{
            Percentage:e.Progress,
            Duration:e.Duration
        }).then((res)=>{
            console.log(res.data);
            return axios.post("http://localhost:4000/project/getAProject",{_id:e._id}).then((res)=>{
                history('/Dashboard', { state:{_id:res.data}, replace:true })
            })
        })
       
    }
    const history = useNavigate();
    useEffect(() => {
        load()
       
     }, [])
     console.log(state);
    const  taskFields = {
        id: '_id',
            name: 'project_name',
            startDate: 'StartDate',
            endDate: 'EndDate',
            duration: 'Duration',
            progress: 'Progress',
            child: 'category',
    };

    
const data=[];
    state.forEach((e)=>{
        let d={
          _id:e.Project_id._id,
          project_name:e.Project_id.Task_name,
          StartDate:new Date(e.Project_id.Start_date),
          EndDate:new Date(e.Project_id.End_date),
          Duration:e.Project_id.Duration,
          Progress:e.Project_id.Percentage,
         category:e.Task.map((e)=>{
           return{
             _id:e._id,
             project_name:e.Task_name,
             StartDate:new Date(e.Start_date),
             EndDate:new Date(e.End_date),
             Duration:e.Duration,
             Progress:e.Percentage
           }
         })
        }
        data.push(d)
    })
   
 console.log(data);
 const labelSettings = {
    
    rightLabel: "Progress" 
  };

    return (
        <div>
            
          
            <br/>
            <br/>
            <br/>
            <div className='home-nav'>
                <ul>
                    <li className={timeline === "Day" ?"home-nav-li-active":"home-nav-li" } onClick={()=>settimeline("Day")}>DAY</li>
                    <li className={timeline === "Week" ?"home-nav-li-active":"home-nav-li" } onClick={()=>settimeline("Week")}>WEEK</li>
                    <li className={timeline === "Month" ?"home-nav-li-active":"home-nav-li" } onClick={()=>settimeline("Month")}>MONTH</li>
                    <li className={timeline === "Year" ?"home-nav-li-active":"home-nav-li" } onClick={()=>settimeline("Year")}>YEAR</li>
                    </ul>
            </div>
            <br/>
            <GanttComponent dataSource={data}
         
             labelSettings={labelSettings} 
            timelineSettings={{timelineViewMode:timeline}}
 height="550px" taskFields={taskFields} 
onTaskbarClick={(e)=>{e.data.hasChildRecords?load1(e.data):history('/editTask', { state:{data:e.data}, replace:true })}}
            >
                <ColumnsDirective>
           <ColumnDirective field="project_name"></ColumnDirective>
           <ColumnDirective field="Duration"></ColumnDirective>
           <ColumnDirective field="Progress"></ColumnDirective>
           </ColumnsDirective>
          
            </GanttComponent>
           
           
           
        </div>
    )
}

export default GanntChart