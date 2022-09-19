import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
// import SignUP from "./SignUp";
// import SignIn from "./SignIn";

export default function RegistrationApp() {
    const [formType, setFormType] = useState(0);

    // const renderContent = () => {
    //     return !formType ? <SignUP /> : <SignIn />;
    // }

    const selectContent = () => {
        return (
            <div className="registration-bar">
                <Link to="signup"className={!formType ? "btn-form-type selected" : "btn-form-type"} onClick={() => setFormType(0)}>SignUp</Link>
                <Link to="signin"className={formType ? "btn-form-type selected" : "btn-form-type"} onClick={() => setFormType(1)}>SignIn</Link>
            </div>
        );
    }

    return (
        <>
            {selectContent()}
            <div className="container registration">
                <div className=" box">
                    <Outlet />
                </div>
            </div>
        </>
    )
}
