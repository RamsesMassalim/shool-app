import { useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import axios from "axios";
import { Link } from "react-router-dom";

export default function SignIn() {
    const user = useSelector(state => state);
    const dispatch = useDispatch();
    const [isIncorrect, setIsIncorrect] = useState(false);

    const [userLog, setUserLog] = useState({
        userName: '',
        password: ''
    });

    const addUser = (data) => {
        dispatch({
            type: 'ADD_USER',
            payload: data
        });
    }

    const check = (data) => {
        console.log(data)
        if (data.id === undefined) {
            setIsIncorrect(true);
        } else {
            addUser(data);
            setIsIncorrect(false);
            setUserLog({
                userName: '',
                password: ''
            });
        }
    }

    const onSubmit = () => {
        const API_PATH = `http://localhost:8080/auth?userName=${userLog.userName}&password=${userLog.password}`;
        console.log(API_PATH)

        axios({
            method: 'GET',
            url: API_PATH,
            headers: {
                'content-type': 'application/json'
            }
        })
        .then(result => {
            check(result.data);
        })
        .catch(error => console.log(error));
    }

    return (
        <>
            {
                user.id !== undefined
                ? <p className="msg">
                    { 
                        user.id !== null 
                        ? <>
                            "You have been logged in."<br />
                            <Link to="/">Main</Link>
                        </>
                        : "Incorrect e-mail or password." 
                    }
                </p>
                : <>
                    <div className="inputstyle">
                        <input
                            className="input"
                            type="text"
                            placeholder="Name"
                            value={userLog.userName}
                            onChange={(event) => setUserLog(userLog => ({...userLog, userName: event.target.value}))}
                        />
                    </div>

                    <div className="inputstyle">
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={userLog.password}
                            onChange={(event) => setUserLog(userLog => ({...userLog, password: event.target.value}))}
                        />
                    </div>
                    <button className="btnstyle" onClick={() => onSubmit()}>Send</button>
                    { isIncorrect && <p>Incorrect username or password.</p> }
                </>
            }
        </>
    )
}
