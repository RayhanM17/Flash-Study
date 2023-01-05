import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import {logout, reset} from '../../features/auth/authSlice'

function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {user} = useSelector((state) => state.auth)

    const onLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/')
    }

    return (
        <div className="navbar flex flex-row justify-between shadow-lg bg-neutral text-neutral-content">
            <div className="w-full flex flex-row pl-2">
                <div className='logo'></div>
                <Link to='/' className='text-lg font-bold my-auto ml-3'>
                    FlashStudy
                </Link>
            </div>
            <div className="w-full flex flex-row pr-2 justify-end">
                {user ? (
                    <>  
                        <Link to='/dashboard' className='btn btn-ghost btn-sm rounded-btn'>
                            Dashboard
                        </Link>
                        <Link to='/study' className='btn btn-ghost btn-sm rounded-btn'>
                            Study
                        </Link>
                        <button onClick={onLogout} className='btn btn-ghost btn-sm rounded-btn'>
                            <FaSignOutAlt className='mr-1'/> Logout
                        </button>
                    </>
                ) : (<>
                    <Link to='/login' className='btn btn-ghost btn-sm rounded-btn'>
                        <FaSignInAlt className='mr-1'/> Login
                    </Link>
                    <Link to='/register' className='btn btn-ghost btn-sm rounded-btn'>
                        <FaUser className='mr-1'/> Register
                    </Link>
                </>)}
            </div>
        </div>
    )
}

export default Navbar