import { Route, Routes } from 'react-router-dom';
import './App.css';
import Registration from './pages/Registration';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';
import AdminSignup from './pages/AdminSignup';
import Course from './pages/Course';
import Schedule from './pages/Schedule';
import Dashboard from './pages/Dashboard';

export const URL = "http://localhost:8000"
export const token = sessionStorage.getItem('token');

function App() {
  return (
    <Routes>

      <Route exact path='/' element={<Login />} />

      <Route path='/signup' element={<Signup />} />

      <Route path='/admin/login' element={<AdminLogin />} />

      <Route path='/admin/signup' element={<AdminSignup />} />

      <Route path='/register' element={<Registration />} />

      <Route path='/course' element={<Course />} />

      <Route path='/schedule' element={<Schedule />} />

      <Route path='/dashboard' element={<Dashboard />} />

    </Routes>
  );
}

export default App;