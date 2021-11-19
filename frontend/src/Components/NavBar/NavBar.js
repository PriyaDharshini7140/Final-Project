import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import {AiOutlineMenu} from 'react-icons/ai'
import "./NavBar.css";
import TransitionsModal from "../Modal/AddProject";
function NavBar() {;
  let location = useLocation();
 
  
  return (
    <div>
          <nav>
        <input type="checkbox" id="check"/>
        <label for="check" class='checkbtn'> 
            <AiOutlineMenu/>
        </label>
     <label class="logo">Project<span>Tracker</span></label>
     <ul>
         
     <li><Link to="/" className={location.pathname==="/" ? "active" :""}>Home</Link></li>
     <li><Link to="/AddProject" className={location.pathname==="/AddProject" ? "active" :""}>Add Project</Link></li>

    
     </ul>
    </nav>
    </div>
  );
}

export default NavBar;