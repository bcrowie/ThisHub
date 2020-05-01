import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserContext } from '../../App'
import AccountMenu from './AccountMenu/AccountMenu'
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
                    <Link id="logo" to="/">Thishub</Link>
                </div>
                <div className="nav-buttons account">
                    {User.Username ? 
                        <AccountMenu /> :
                    <>
                        <Link className="register" to='/register'>Register</Link>
                        <Link className="account-link" onClick={() => setShowLogin(!showLogin)}>Login</Link>
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