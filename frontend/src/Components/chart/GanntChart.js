import React, { useEffect, useState } from 'react'
import { GanttComponent ,Inject, Edit, Selection,ColumnsDirective,ColumnDirective} from '@syncfusion/ej2-react-gantt'
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import './GanttChart.css'
import axios from 'axios';
function GanntChart() {
   const [timeline, settimeline] = useState("Week")
    const [state, setstate] = useState([])
    const load =()=>{
        return axios.get("http://localhost:4000/project/getAllProject").then((res)=>{
            setstate(res.data)
        })
    }
    useEffect(() => {
        load()
       
     }, [])
    const  taskFields = {
        id: '_id',
            name: 'project_name',
            startDate: 'StartDate',
            duration: 'Duration',
            progress: 'Progress',
            child: 'category',
    };
    const GanttData = [
        {
            _id: 1,
            project_name: 'Project Initiation',
            Start_date: new Date('04/02/2019'),
            End_Date: new Date('04/21/2019'),
            category: [
                {  _id: 2, project_name: 'Identify Site location', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
                {  _id: 3, project_name: 'Perform Soil test', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
                {  _id: 4, project_name: 'Soil test approval', StartDate: new Date('04/02/2019'), Duration: 4, Progress: 50 },
            ]
        },
        {
            _id: 5,
            project_name: 'Project Estimation',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/21/2019'),
            category: [
                { _id: 6, project_name: 'Develop floor plan for estimation', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 100 },
                { _id: 7, project_name: 'List materials', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
                { _id: 8, project_name: 'Estimation approval', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 }
            ]
        },
        {
            _id: 9,
            project_name: 'Project Estimation',
            StartDate: new Date('04/02/2019'),
            EndDate: new Date('04/21/2019'),
            category: [
                { _id: 10, project_name: 'Develop floor plan for estimation', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
                { _id: 11, project_name: 'List materials', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 },
                { _id: 12, project_name: 'Estimation approval', StartDate: new Date('04/04/2019'), Duration: 3, Progress: 50 }
            ]
        },
    ];
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
            <GanttComponent dataSource={GanttData} height="550px" taskFields={taskFields} timelineSettings={{timelineViewMode:timeline}}/>
            <ColumnDirective field='Progress'></ColumnDirective>
        </div>
    )
}

export default GanntChart
