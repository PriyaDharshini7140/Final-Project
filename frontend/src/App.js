import logo from './logo.svg';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import GanntChart from './Components/chart/GanntChart';
import NavBar from './Components/NavBar/NavBar';
import Footer from './Components/NavBar/Footer';
import DashBoard from './Components/DashBoard/DashBoard';
import TransitionsModal from './Components/Modal/AddProject';
import EditTask from './Components/Edit/EditTask';
function App() {
  return (
    <div>
    <BrowserRouter> 
    <NavBar/>
    <Routes>
    <Route path="/" element={<GanntChart/>} />
    <Route path="/AddProject" element={<TransitionsModal/>}/>
      <Route path="/Dashboard" element={<DashBoard/>}/>
      <Route path="/editTask" element={<EditTask/>}/>
      </Routes>
     
     <Footer/>
      </BrowserRouter>
      </div>
  );
}

export default App;
