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
function App() {
  return (
    <BrowserRouter> 
    <NavBar/>
    <Routes>
    <Route path="/" element={<GanntChart/>} />
      <Route path="/Dashboard" element={<DashBoard/>}/>
      </Routes>
      <Footer/>
      </BrowserRouter>
  );
}

export default App;
