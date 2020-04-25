import React, { useState } from 'react'
import axios from 'axios'
import './Login.scss'

const Login = (props) => {
    const [inputs, setInputs] = useState()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const login = await axios.post('/users/login', {
            Email: inputs.Email,
            Password: inputs.Password
        })
        if(login) {
            localStorage.setItem('thishub.token', login.data.token)
            localStorage.setItem('thishub.user', login.data.Username)
            window.location.reload()
        }
    }

    return (
        <div className="modal-content">
            <h2>Login to Thishub</h2>
            <form className="login-form">
                <label htmlFor="Email">Email:</label>
                <input type="text" onChange={(e) => setInputs({...inputs, Email: e.target.value})}/>
                <label htmlFor="Password">Password:</label>
                <input type="password" onChange={(e) => setInputs({...inputs, Password: e.target.value})}/>
                <div className="login-buttons">
                    <button onClick={(e) => handleSubmit(e)}>Submit</button>
                    <button onClick={props.hideModal}>Close</button>
                </div>
            </form>
        </div>
    )
}

export default Login