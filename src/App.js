import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';

import './App.css';
import Registration from './components/Registration/Registration';
import Main from './components/Main/Main';
import SignUP from './components/Registration/SignUp';
import SignIn from './components/Registration/SignIn';
import UserAddForm from './components/Profile/UserAddForm';

export default function App() {
    const user = useSelector(state => state);

    return (
        <div style={{height: '100vh'}}>
            <div className="container">
                <div className="registration-form">
                    <div className="registration-container">
                        <Routes>
                            <Route path="/registration" element={<Registration />}>
                                <Route path="signup" element={<SignUP />} />
                                <Route path="signin" element={<SignIn />} />
                            </Route>
                            <Route path="/" element={ user.id === undefined ? <Navigate to="registration/signup" /> : <Main /> } />
                            <Route path="/add-user" element={<UserAddForm />} />
                            <Route path="*" element={<>404</>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    );
}
