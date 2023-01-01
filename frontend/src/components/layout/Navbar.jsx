import {FaSignInAlt, FaSignOutAlt, FaUser} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import logo from '../../assets/Flashstudylogo.png'

function Navbar() {

    // Logo Styling
    const logoStyle = {
        backgroundImage: `url('${logo}')`,
    }
    
    return (
        <div className="navbar flex flex-row justify-between">
            <div className="flex-inline">
                <div 
                    className="h-32 w-px">
                </div>
                <h3 className='text-xl'>FlashStudy</h3>
            </div>
        </div>
    )
}

export default Navbar