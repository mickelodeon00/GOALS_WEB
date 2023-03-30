import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import {logout, reset} from "../features/auth/authSlice"

function Header() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const {user} = useSelector((state) => state.auth) 

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/login')
    }



  return (
    <header className='header'>
        <div className='logo'>
            <Link to='/'>Goal Setter</Link>
        </div>
        <ul>
            {!user ? 
            (<>
            <li>
                <Link to='/login'>
                    <FaSignInAlt /> Login
                </Link>
            </li>
            <li>
                <Link to='/register'>
                    <FaUser /> Register
                </Link>
            </li>
            </>) : 
            (<li>
                <button className='btn' onClick={onLogout}>
                    <FaSignOutAlt /> Logout
                </button>
            </li>)}
            
        </ul>

    </header>
  )
}

export default Header