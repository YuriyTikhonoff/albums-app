import React, { useState, useEffect } from 'react'
import './Header.scss'
import { useDispatch, useSelector  } from 'react-redux'
import { logout } from '../../Redux/Actions/userActions'
import { useHistory } from 'react-router-dom'


const Header = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.userLogin)
   // const [ userName, setUserName] = useState('')
    const history = useHistory()

    const loginHandler = () => history.push('/login')
    const logoutHandler = () => {
        dispatch(logout())
        //setUserName('')
        history.push('/albums')  
    }

    //useEffect(() => setUserName(userInfo?.name) , [userInfo])
    

    return (
        <header className="header" >
            <div className="header__logo">Albums app</div>
            <nav className="nav">
                { userInfo ? <div><span>Hello, {userInfo.name}   </span> <button onClick={logoutHandler} className="btn">Log out </button> </div>
                : <button onClick={loginHandler} className="btn">Log in </button>
                }
            </nav>
        </header>
    )
}

export default Header