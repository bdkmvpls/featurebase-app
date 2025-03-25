import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './routes/PrivateRoute';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';

import './App.css';

function App() {
  return (
    <Routes>
      {/* <Route path='/' element={<Home />} /> */}
      <Route path='/login' element={<Login />} />

      <Route element={<PrivateRoute />}>
        <Route path='/dashboard' element={<Dashboard />} />
        {/* add more private routes here */}
      </Route>
    </Routes>
  );
}

export default App;
