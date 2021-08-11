import React from 'react'
import { useDispatch, useSelector  } from 'react-redux'
import { useHistory, Link } from 'react-router-dom'

import { logOut } from '../../Store/Actions/userActions'
import { cleanUp } from '../../Store/Actions/albumActions'

import './Header.scss'

const Header = () => {
    const dispatch = useDispatch();
    const { userInfo } = useSelector(state => state.userLogin);
    const history = useHistory();

    const loginHandler = () => history.push('/login');

    const logoutHandler = () => {
        dispatch(logOut());
        dispatch(cleanUp());
        history.push('/login');  
    }

    return (
        <header className="header container" >
            <div className="header__content">
                <Link to='/albums'>
                    <div className="header__logo">Albums app</div>
                </Link>
                <nav className="nav">
                    { userInfo ? <div><span>Hello, {userInfo.name}   </span> <button onClick={logoutHandler} className="btn">Log out </button> </div>
                    : <button onClick={loginHandler} className="btn">Log in </button>
                    }
                </nav>
            </div>
        </header>
    )
}

export default Header