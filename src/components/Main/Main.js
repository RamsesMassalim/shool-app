import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import UserCard from "../Profile/UserCard";
import { useNavigate } from "react-router-dom";

export default function Main() {
    const userLogged = useSelector(state => state)
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch({
            type: 'REMOVE_USER',
            payload: null
        });
    }

    const deleteUser = (id) => {
        setUsers(users => users.filter(user => user.id !== id))
        console.log(id)

        const API_PATH = `http://localhost:8080/users/${id}`

        axios({
            method: 'DELETE',
            url: API_PATH,
            headers: {
                'content-type': 'application/json'
            }
        })
        .catch(error => console.log(error));
    }

    const addUser = () => {
        navigate("/add-user");
    }

    useEffect(() => {
        const API_PATH = 'http://localhost:8080/users'

        const getUsers = () => {
            axios({
                method: 'GET',
                url: API_PATH,
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(result => {
                setUsers(result.data.filter(user => user.id !== userLogged.id))
            })
            .catch(error => console.log(error));
        }

        getUsers()

        return(() => {
            setUsers([])
        })
    }, [userLogged])

    return (
        <div className="container registration">
            <div className="feedback-form">
                <div>
                    <UserCard user={userLogged} btnFunc={addUser} btnName={"Add"} />
                    <button className="btnstyle" onClick={logOut}>Logout</button>
                </div>
                <div className="container">
                    <div className="user-line">
                        {users.map((user) => 
                            <UserCard key={user.id} user={user} btnFunc={deleteUser} btnName={"Delete"} />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
