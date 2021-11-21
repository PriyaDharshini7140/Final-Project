import React, { useEffect, useState } from 'react'
import {Doughnut,Bar,Pie} from 'react-chartjs-2';
import './DashBoard.css'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {useLocation} from 'react-router-dom';
import moment from 'moment';
function DashBoard() {
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor:"#2F86A6",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));
  
  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor:"rgba(52, 190, 130, 0.5)",
    },
    '&:nth-of-type(even)': {
      backgroundColor:"rgba(47, 134, 166, 0.5)",
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      
      border: 0,
    },
  }));
  
 

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
           
           <div className='Dashboard-card'>
            
             <h1><span>{sdata.Project_id.Task_name}</span></h1>
             <p>Start Date - {moment(sdata.Project_id.Start_date).format("MMMD,YYYY")}</p>
             <p>End Date - {moment(sdata.Project_id.End_date).format("MMMD,YYYY")}</p>
             <p>Duration - {sdata.Project_id.Duration} days</p>
             <p>Progress - {sdata.Project_id.Percentage}%</p>
           </div>
           <div className='Dashboard-card-media'>
            
             <h1><span>{sdata.Project_id.Task_name}</span></h1>
             <p>Start Date - {moment(sdata.Project_id.Start_date).format("MMMD,YYYY")}</p>
             <p>End Date - {moment(sdata.Project_id.End_date).format("MMMD,YYYY")}</p>
             <p>Duration - {sdata.Project_id.Duration} days</p>
             <p>Progress - {sdata.Project_id.Percentage}%</p>
           </div>
            <div className='Dashboard-table'>
            <TableContainer component={Paper}>
      <Table sx={{ minWidth: 500 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>TASK CATEGORY</StyledTableCell>

            <StyledTableCell align="right">Start Date</StyledTableCell>
            <StyledTableCell align="right">End Date</StyledTableCell>
            <StyledTableCell align="right">Duration</StyledTableCell>
            <StyledTableCell align="right">Progress</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sdata.Task.map((row) => (
            <StyledTableRow key={row.Task_name}>
              <StyledTableCell component="th" scope="row">
              {row.Task_name}
              </StyledTableCell>
              <StyledTableCell align="right">{moment(row.Start_date).format("MMMD,YYYY")}</StyledTableCell>
              <StyledTableCell align="right">{moment(row.End_date).format("MMMD,YYYY")}</StyledTableCell>
              <StyledTableCell align="right">{row.Duration}</StyledTableCell>
              <StyledTableCell align="right">{row.Percentage}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            </div>
            <label className='label' for="Project Description">Project <span>Description</span></label>
            <div id='Project Description' className='Dashboard-desc'>
              {sdata.Project_id.Description}
            </div>
        </div>
    )
}

export default DashBoard
