import { useNavigate } from "react-router-dom"
import SignUP from "../Registration/SignUp"

export default function UserAddForm() {
    const navigate = useNavigate();

    const add = () => {
        navigate("/")
    }

    return (
        <div className="container registration">
            <div>
                <div className="inline">
                    <div>Add user</div>
                    <button className="btnstyle" onClick={() => add()}>Back</button>
                </div>
                <SignUP />
            </div>
        </div>
    )
}
