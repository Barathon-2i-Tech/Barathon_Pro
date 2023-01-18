import './App.css';
import Welcome from './Page/Welcome.jsx';
import Register from './Page/Auth/RegisterHome';
import LoginPage from './Page/Auth/LoginPage';
import { Route, Routes } from 'react-router-dom';
import { HomeLayout } from './Components/Auth/HomeLayout';
import { ProtectedLayout } from './Components/Auth/ProtectedLayout';
import Dashboard from './Page/Professional/Dashboard';
import UnauthorizedLogin from './Page/ErrorPage/unauthorizedLogin';
import NotFoundPage from './Page/ErrorPage/NotFoundPage';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Welcome />}></Route>
                <Route path="/registersucess" element={<div>DOWNLOAD OUR APP</div>}></Route>
                <Route path="/unauthorizedlogin" element={<UnauthorizedLogin />}></Route>

                <Route element={<HomeLayout />}>
                    <Route path="login" element={<LoginPage />}></Route>
                    <Route path="register" element={<Register />}></Route>
                </Route>

                <Route path="/pro" element={<ProtectedLayout />}>
                    <Route path="dashboard" element={<Dashboard />}></Route>
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
