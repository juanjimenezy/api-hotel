import 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HeaderComponent } from './components/HeaderComponent/HeaderComponent';
import { HabitacionesComponent } from './components/HabitacionesComponent/HabitacionesComponent';
import { ReservasComponent } from './components/ReservasComponent/ReservasComponent';
import { LoginComponent } from './components/LoginComponent/LoginComponent';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={'/'} element={<><LoginComponent /></>}></Route>
          <Route path={'/habitaciones'} element={<><HeaderComponent /><HabitacionesComponent /></>}></Route>
          <Route path={'/reservas'} element={<><HeaderComponent /><ReservasComponent /></>}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
