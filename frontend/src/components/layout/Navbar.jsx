import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function Navbar() {
    
    return (
        <div className="navbar flex flex-row justify-between shadow-lg bg-neutral text-neutral-content">
            <div className="w-full flex flex-row pl-2">
                <div className='logo'></div>
                <Link to='/' className='text-lg font-bold my-auto ml-3'>
                    FlashStudy
                </Link>
            </div>
            <div className="w-full flex flex-row pr-2 justify-end">
                <Link to='/login' className='btn btn-ghost btn-sm rounded-btn'>
                    <FaSignInAlt className='mr-1'/> Login
                </Link>
                <Link to='/register' className='btn btn-ghost btn-sm rounded-btn'>
                    <FaUser className='mr-1'/> Register
                </Link>
            </div>
        </div>
    )
}

export default Navbar