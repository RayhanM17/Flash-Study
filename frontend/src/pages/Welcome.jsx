import {Link} from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector} from 'react-redux'
import { useEffect } from 'react'

function Welcome() {
    const {user} = useSelector((state) => state.auth)

    const navigate = useNavigate()

    useEffect(() => {
        if(user) {
            navigate('/dashboard')
        }
    }, [user, navigate])

  return (
    <div className='text-primary-content px-4'>
        <h1 className="text-6xl mb-5">Welcome to FlashStudy</h1>
        <p className="text-lg text-white-400 mb-5">
            The Worlds Best Study Assistant
        </p>
        <div className="flex">
            <Link to='/login' className='text-lg font-bold btn btn-primary'>
                login
            </Link>
            <Link to='/register' className='text-lg font-bold btn btn-primary ml-4'>
                Register
            </Link>
        </div>
    </div>
  )
}

export default Welcome