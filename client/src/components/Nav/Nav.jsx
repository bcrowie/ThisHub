import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import Login from './Login/Login'
import './Nav.scss'

const Nav = () => {
    const [ showLogin, setShowLogin ] = useState(false)
    const User = useContext(UserContext)

    const closeModal = (e) => {
        e.preventDefault()
        if(e.target.className === "login-modal"){
            setShowLogin(!showLogin)
        }
    }

    return (
        <nav>
            <div className="main-nav">
                <div className="nav-buttons">
                    <Link to="/">Thishub</Link>
                </div>
                <div className="nav-buttons account">
                    {User.Username ? 
                        <Link to='/my-account'>{User.Username}</Link> :
                    <>
                        <Link to='/register'>Register</Link>
                        <Link onClick={() => setShowLogin(!showLogin)}>Login</Link>
                    </>}
                </div>
            </div>
            {showLogin && 
            <div className="login-modal" onClick={e => closeModal(e)}>
                <Login hideModal={() => setShowLogin(!showLogin)}/>
            </div>}
        </nav>
    )
}

export default Nav