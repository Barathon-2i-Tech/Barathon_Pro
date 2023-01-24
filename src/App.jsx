import './App.css';
import Welcome from './Page/Welcome.jsx';
import Register from './Page/Auth/RegisterHome';
import LoginPage from './Page/Auth/LoginPage';
import { Route, Routes } from 'react-router-dom';
import { HomeLayout } from './Components/Auth/HomeLayout';
import { ProtectedLayout } from './Components/Auth/ProtectedLayout';
import UnauthorizedLogin from './Page/ErrorPage/unauthorizedLogin';
import NotFoundPage from './Page/ErrorPage/NotFoundPage';
import { DashboardPage } from './Page/Professional/DashboardPage';
import { ProfilePage } from './Page/Professional/ProfilePage';
import { EstablishmentsPage } from './Page/Professional/EstablishmentsPage';
import { EventsPage } from './Page/Professional/EventsPage';
import { TagsPage } from './Page/Professional/TagsPage';
import { EmployeesPage } from './Page/Professional/EmployeesPage';
import { ContactPage } from '@mui/icons-material';
import { TermsOfUsePage } from './Page/Professional/TermsOfUse';

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
                    <Route path="dashboard" element={<DashboardPage />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="etablissements" element={<EstablishmentsPage />} />
                    <Route path="evenements" element={<EventsPage />} />
                    <Route path="tags" element={<TagsPage />} />
                    <Route path="emplyés" element={<EmployeesPage />} />
                    <Route path="contact" element={<ContactPage />} />
                    <Route path="cgu" element={<TermsOfUsePage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}

export default App;
