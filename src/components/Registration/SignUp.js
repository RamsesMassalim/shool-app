import { useState } from "react";
import axios from "axios";

export default function SignUP() {
    const [user, setUser] = useState({
        userName: '',
        password: '',
        firstName: '',
        lastName: '',
        dateOfBirth: ''
    });
    const [message, setMessage] = useState('');
    const [isCorrectUserName, setIsCorrectUserName] = useState(true);
    const [isCorrectPassword, setIsCorrectPassword] = useState(true);

    const formatDate = (date) => {
        const d = new Date(date)
        const day = d.getDate()
        const month = d.getMonth() + 1
        const year = d.getFullYear()

        return (day < 10 ? '0' + day : day) + "-" + (month < 10 ? '0' + month : month) + "-" + year
    }

    const validateUserName = (userName) => {
        const usernameRegex = /^[a-z0-9_.]+$/;

        setIsCorrectUserName(usernameRegex.test(userName));
    }

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;

        setIsCorrectPassword(passwordRegex.test(password));
    }

    const onSubmit = () => {        
        const API_PATH = 'http://localhost:8080/users/';
        
        axios({
            method: 'POST',
            url: API_PATH,
            headers: {
                'content-type': 'application/json'
            },
            data: {...user, dateOfBirth: formatDate(user.dateOfBirth)}
        })
        .then(result => {
            setMessage(1);
        })
        .catch(error => console.log(error));
    }

    return (
        <>
            {
                message === 1
                ? <p className="msg">
                    SUCCESS<br/><br/>
                    User has been added.
                </p>
                : <>
                    <div className={isCorrectUserName ? "inputstyle" : "inputstyle wrong"}>
                        <input
                            className="input"
                            type="text"
                            placeholder="User Name"
                            value={user.userName}
                            onChange={event => setUser(
                                    user => ({...user, userName: event.target.value}), 
                                    validateUserName(event.target.value)
                                )}
                        />
                    </div>

                    <div className="inputstyle">
                        <input
                            className="input"
                            type="text"
                            placeholder="First Name"
                            value={user.firstName}
                            onChange={event => setUser(user => ({...user, firstName: event.target.value}))}
                        />
                    </div>

                    <div className="inputstyle">
                        <input
                            className="input"
                            type="text"
                            placeholder="Last Name"
                            value={user.lastName}
                            onChange={event => setUser(user => ({...user, lastName: event.target.value}))}
                        />
                    </div>

                    <div className="inputstyle">
                        <input
                            className="input"
                            type="date"
                            value={user.dateOfBirth}
                            onChange={event => setUser(user => ({...user, dateOfBirth: event.target.value}))}
                        />
                    </div>

                    <div className={isCorrectPassword ? "inputstyle" : "inputstyle wrong"}>
                        <input
                            className="input"
                            type="password"
                            placeholder="Password"
                            value={user.password}
                            onChange={event => setUser(
                                    user => ({...user, password: event.target.value}), 
                                    validatePassword(event.target.value)
                                )}
                        />
                    </div>

                    <button className="btnstyle" onClick={event => onSubmit(event)}>Send</button>
                </>
            }
        </>
    )
}
