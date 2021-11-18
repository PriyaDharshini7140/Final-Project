import React, { useEffect, useState } from 'react'
import {Doughnut,Bar,Pie} from 'react-chartjs-2';
import './DashBoard.css'
import axios from 'axios';
import {useLocation} from 'react-router-dom';
function DashBoard() {
    const location = useLocation();
    console.log(location.state._id);
const [chart, SetChart] = useState("Donut")
const [sdata, setstate] = useState(location.state._id)



console.log(sdata);

   
    
    const category=[]
    const progress=[]
    sdata.Task.map((e)=>{
        return(
            <div>{category.push(e.Task_name),
                progress.push(e.Percentage)}</div>
        )
    })
    console.log(category);
    var state1 = {
        labels: category,
        datasets: [
          {
            label: 'Rainfall',
            backgroundColor: [
              '#2F86A6',
              '#34BE82',
              '#F56FAD',
              '#664E88'
            ],
            hoverBackgroundColor: [
                '#2F86A6',
                '#34BE82',
                 '#F56FAD',
                '#664E88'
            ],
            data: progress
          }
        ]
      }
    return (
        <div>

            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <br/>
            <div className='home-nav'>
                <ul>
                <li className={chart === "Donut" ?"home-nav-li-active":"home-nav-li" } onClick={()=>SetChart("Donut")}>DONUT</li>
                    <li className={chart === "Bar" ?"home-nav-li-active":"home-nav-li" } onClick={()=>SetChart("Bar")}>BAR</li>
                    
                    <li className={chart === "Pie" ?"home-nav-li-active":"home-nav-li" } onClick={()=>SetChart("Pie")}>PIE</li>
                      </ul>
            </div>
            <br/>
            <br/>
            {chart === "Bar" ?  <div className='barchart'>
            <Bar
                      data={{
                        // Name of the variables on x-axies for each bar
                        labels:category,
                        datasets: [
                          {
                            // Label for bars
                            label: sdata.Project_id.Task_name,
                            // Data or value of your each variable
                             data:progress,
                            // Color of each bar

                            backgroundColor: ["rgba(47, 134, 166, 0.5)","rgba(52, 190, 130, 0.5)","rgba(245, 111, 173, 0.5)","rgba(102, 78, 136, 0.5)"],
                            // Border color of each bar
                            borderColor: [ '#2F86A6',
                            '#34BE82',
                            '#F56FAD',
                            '#664E88'],
                            borderWidth: 1,
                          },
                        ],
                      }}
                      // Height of graph
                      height={400}
                     
                      options={{
                        maintainAspectRatio: false,
                        scales: {
                          yAxes: [
                            {
                              ticks: {
                                // The y-axis value will start from zero
                                beginAtZero: true,
                              },
                            },
                          ],
                        },
                        legend: {
                          labels: {
                            fontSize: 15,
                          },
                        },
                      }}
                    />  
                    
            </div>:chart === "Donut" ?  <div  className='barchart'>
            <Doughnut
                      data={state1}
                      options={{
                        title: {
                          display: true,
                          text: 'Average Rainfall per month',
                          fontSize: 20
                        },
                        legend: {
                          display: true,
                          position: 'right'
                        }
                      }}
                    />
             
             </div> : <div  className='barchart'>
            <Pie
                      data={state1}
                      options={{
                        title: {
                          display: true,
                          text: 'Average Rainfall per month',
                          fontSize: 20
                        },
                        legend: {
                          display: true,
                          position: 'right'
                        }
                      }}
                    />
             
             </div>
              }
           
           
            
        </div>
    )
}

export default DashBoard
