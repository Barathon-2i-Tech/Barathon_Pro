import './App.css';
import './css/Professional/AtomeCustom.css';
import Welcome from './Page/Welcome.jsx';
import Register from './Page/Auth/RegisterHome';
import LoginPage from './Page/Auth/LoginPage';
import { Route, Routes } from 'react-router-dom';
import { HomeLayout } from './Components/Auth/HomeLayout';
import { ProtectedLayout } from './Components/Auth/ProtectedLayout';
import DashboardPage from './Page/Professional/Dashboard';
import CGUPage from './Page/Professional/CGU';
import ContactPage from './Page/Professional/Contact';
import EmployeePage from './Page/Professional/Employee';
import EstablishmentPage from './Page/Professional/Establishment';
import EventPage from './Page/Professional/Event/EventEstablishments';
import NotificationPage from './Page/Professional/Notification';
import TagPage from './Page/Professional/Tag';
import UnauthorizedLogin from './Page/ErrorPage/unauthorizedLogin';
import NotFoundPage from './Page/ErrorPage/NotFoundPage';
import EstablishmentFormPage from './Page/Professional/EstablishmentUpdate';
import EstablishmentCreatePage from './Page/Professional/EstablishmentCreate';
import EndRegisterLogin from './Page/Auth/EndRegisterBarathonien';
import EventOfEstablishmentPage from './Page/Professional/Event/EventOfEstablishment';
import EventOfEstablishmentCreatePage from './Page/Professional/Event/EventOfEstablishmentCreate';
import EventOfEstablishmentUpdatePage from './Page/Professional/Event/EventOfEstablishmentUpdate';
import ProfileUpdatePage from './Page/Professional/Profile/Profile';

export default function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Welcome />}></Route>
                <Route path="/registersucess" element={<EndRegisterLogin />}></Route>
                <Route path="/unauthorizedlogin" element={<UnauthorizedLogin />}></Route>

                <Route element={<HomeLayout />}>
                    <Route path="login" element={<LoginPage />}></Route>
                    <Route path="register" element={<Register />}></Route>
                </Route>

                <Route path="/pro" element={<ProtectedLayout />}>
                    <Route path="dashboard" element={<DashboardPage />}></Route>
                    <Route path="profile" element={<ProfileUpdatePage />}></Route>
                    <Route path="cgu" element={<CGUPage />}></Route>

                    <Route path="contact" element={<ContactPage />}></Route>

                    <Route path="employee" element={<EmployeePage />}></Route>
                    <Route path="establishment" element={<EstablishmentPage />}></Route>
                    <Route path="establishmentForm/:id" element={<EstablishmentFormPage />}></Route>
                    <Route
                        path="/pro/:id/establishment/create"
                        element={<EstablishmentCreatePage />}
                    ></Route>
                    <Route path="/pro/establishment/event" element={<EventPage />}></Route>
                    <Route
                        path="/pro/establishment/:id/event/list"
                        element={<EventOfEstablishmentPage />}
                    ></Route>
                    <Route
                        path="/pro/establishment/event/:id/create"
                        element={<EventOfEstablishmentCreatePage />}
                    />
                    <Route
                        path="/pro/establishment/:establishmentIdParam/event/:eventIdParam/update"
                        element={<EventOfEstablishmentUpdatePage />}
                    />
                    <Route path="notification" element={<NotificationPage />}></Route>
                    <Route path="tag" element={<TagPage />}></Route>
                </Route>

                <Route path="*" element={<NotFoundPage />} />
            </Routes>
        </div>
    );
}
