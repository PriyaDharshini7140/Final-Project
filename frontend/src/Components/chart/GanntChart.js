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
        return axios.get("http://localhost:4000/project/getAllProject").then((res)=>{
            setstate(res.data)
        })
    }
    const load1 =(e)=>{
        console.log(e);
        return axios.post("http://localhost:4000/project/getAProject",{_id:e}).then((res)=>{
            history('/Dashboard', { state:{_id:res.data}, replace:true })
        })
    }
    const history = useNavigate();
    useEffect(() => {
        return axios.get("http://localhost:4000/project/getAlllProject").then((res)=>{
            setstate(res.data)
        })
       
     }, [])
     console.log(state);
    const  taskFields = {
        id: '_id',
            name: 'project_name',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            child: 'category',
    };
const data=[];
    state.forEach((e)=>{
        let d={
          _id:e.Project_id.Task_name,
          project_name:e.Project_id.Task_name,
          StartDate:new Date(e.Project_id.Start_date),
         category:e.Task.map((e)=>{
           return{
             _id:e.Task_name,
             project_name:e.Task_name,
             StartDate:new Date(e.Start_date),
            
             Duration:e.Duration,
             Progress:e.Percentage
           }
         })
        }
        data.push(d)
    })
    const GanttData = [
      {
          _id: "1",
          project_name: 'Project Initiation',
          StartDate: new Date('11/20/2021'),
          EndDate: new Date('12/20/2021'),
          category: [
              { _id: "2", project_name: 'Identify Site location', StartDate: new Date('11/20/2021'), Duration: 4, Progress: 50 },
              {  _id: "3",project_name: 'Perform Soil test', StartDate: new Date('11/29/2021'), Duration: 4, Progress: 50 },
              { _id: "4", project_name: 'Soil test approval', StartDate: new Date('12/7/2021'), Duration: 4, Progress: 50 },
          ]
      }]
 console.log(data);
    
    return (
        <div>
            <br/>
            <br/>
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
            timelineSettings={{timelineViewMode:timeline}}
 height="550px" taskFields={taskFields} 
            
            />
           
            
           
           
        </div>
    )
}

export default GanntChart