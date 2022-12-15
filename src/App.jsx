import './App.css';
import Welcome from './Page/Welcome.jsx';
import Register from './Components/Auth/RegisterHome';
import LoginPage from './Components/Auth/LoginPage';
import { Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Welcome />}></Route>
                <Route path="/login" element={<LoginPage />}></Route>
                <Route path="/register" element={<Register />}></Route>
                <Route path="/dashboard" element={<div>DASHBOARD</div>}></Route>
                <Route path="/registersucess" element={<div>DOWNLOAD OUR APP</div>}></Route>
            </Routes>
        </div>
    );
}

export default App;
