import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Utils } from '../../../utils/utils'
import './Login.scss'

const Login = (props) => {
    const [inputs, setInputs] = useState()
    const [errors, setErrors] = useState({ Email: null, Password: null })
    const history = useHistory()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const loginResult = Utils.Users.login( inputs, history )

        // Implement login error handling
        if(loginResult){
            setErrors({...errors, loginResult})
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
            <Link to='/register'>Register for an account!</Link>
        </div>
    )
}

export default Login