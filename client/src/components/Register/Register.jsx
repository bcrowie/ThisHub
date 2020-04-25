import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import './Register.scss'

const Register = props => {
    const [inputs, setInputs] = useState({})
    const [errors, setErrors] = useState({})
    const history = useHistory()

    const submitRegister = async (e) => {
        e.preventDefault()

        const { Username, Email, Email2, Password, Password2 } = inputs
        const res = await axios.post('/users/register', {
            Username,
            Email,
            Email2,
            Password,
            Password2
        })

        if(res){
            console.log("success")
            history.push('/')
        } else {
            console.log(res.data)
            setErrors({...errors, [res.data.errors]: res.data.errors})
        }
    }

    return (
        <div className="register-modal">
            <div className="modal-content">
                <form action="">
                    <h2>Register for an account</h2>
                    <label htmlFor="Username">Username:</label>
                    <input type="text" onChange={(e) => setInputs({...inputs, Username: e.target.value})}/>
                    {errors.Username && <p className="error">{errors.Username}</p>}
                    <label htmlFor="Email">Email:</label>
                    <input type="text" onChange={(e) => setInputs({...inputs, Email: e.target.value})}/>
                    {errors.Email && <p className="error">{errors.Email}</p>}
                    <label htmlFor="Email2">Confirm email:</label>
                    <input type="text" onChange={(e) => setInputs({...inputs, Email2: e.target.value})}/>
                    {errors.Email2 && <p className="error">{errors.Email2}</p>}
                    <label htmlFor="Password">Password:</label>
                    <input type="password" onChange={(e) => setInputs({...inputs, Password: e.target.value})}/>
                    {errors.Password && <p className="error">{errors.Password}</p>}
                    <label htmlFor="Password2">Confirm password:</label>
                    <input type="password" onChange={(e) => setInputs({...inputs, Password2: e.target.value})}/>
                    {errors.Password2 && <p className="error">{errors.Password2}</p>}
                    <div>
                        <button onClick={(e) => submitRegister(e)}>Submit</button>
                        <button onClick={() => history.push('/')}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register;