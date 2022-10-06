import '../App.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import apiURL from '../myURL';
import { useNavigate } from "react-router-dom";


const AddUser = () => {
    const [loading, setLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [iduser, setIduser] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [identity, setIdentity] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const navigate = useNavigate();

    const handleSubmit = () => {
        setLoading(true);
        setIsError(false);
        const data = {
            iduser: iduser,
            username: username,
            password: password,
            identity: identity,
            firstname: firstname,
            lastname: lastname
        }
        axios.post(apiURL + '/user/', data, {
            auth: {
                username:localStorage.getItem('username'),
                password:localStorage.getItem('password')
            }
        })
            .then(res => {
                setIduser('');
                setUsername('');
                setPassword('');
                setIdentity('');
                setFirstname('');
                setLastname('');               
                setLoading(false);
                return navigate("/userlist");
            }).catch(err => {
                setLoading(false);
                setIsError(true);
            });
    }

    return (
        <div className="container">
            <table className='table table-bordered'>
                <thead>
                    <tr className='table-info'>
                        <th>iduser</th><th>username</th><th>password</th><th>identity</th><th>firstname</th><th>lastname</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" id="iduser" placeholder='iduser' onChange={e => setIduser(e.target.value)} /></td>
                        <td><input type="text" id="username" placeholder='username' onChange={e => setUsername(e.target.value)} /></td>
                        <td><input type="text" id="password" placeholder='password' onChange={e => setPassword(e.target.value)} /></td>
                        <td><input type="text" id="identity" placeholder='identity' onChange={e => setIdentity(e.target.value)} /></td>
                        <td><input type="text" id="firstname" placeholder='firstname' onChange={e => setFirstname(e.target.value)} /></td>
                        <td><input type="text" id="lastname" placeholder='lastname' onChange={e => setLastname(e.target.value)} /></td>
                    </tr>
                </tbody>
            </table>
            <button className='btn btn-primary' type="submit" onClick={handleSubmit} >Add</button>
            {isError}
        </div>
    )
} 

export default AddUser; 