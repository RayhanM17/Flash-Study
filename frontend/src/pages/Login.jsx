import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { login, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [btnDisabled, setBtnDisabled] = useState(true);

  const { email, password } = formData

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    user, 
    isLoading, 
    isError, 
    isSuccess, 
    message} 
  = useSelector((state) => state.auth)

  useEffect(() => {
    if(isError){
      toast.error(message, {
        theme: "dark"
      })
    }

    if(isSuccess || user) {
      navigate('/dashboard')
    }

    dispatch(reset())

  }, [user, isError, isSuccess, message, navigate, dispatch])

  const onChange = (e) => {
    if(email === '' || password === ''){
      setBtnDisabled(true)
    } else{
      setBtnDisabled(false)
    }

    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()

    if(email !== '' && password !== ''){
      const userData ={
        email,
        password
      }
  
      dispatch(login(userData))
    } else {
      toast.error('Please fill in all fields', {
        theme: "dark"
      })
    }
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='grid justify-items-center'>
        <h1 className='text-5xl inline-flex align-center justify-center'>
          <FaSignInAlt/>
          <span className='ml-2'>Login</span>
        </h1>
        <div className='font-bold text-sm mt-4'>
          Login and start creating flashcards
        </div>
      </section>

      <form 
        onSubmit={onSubmit} 
        className='form-control w-full flex justify-center align-center mt-8 px-8'
      >
        <label className="input-group input-group-md justify-start align-center mt-4">
          <span>Email</span>
          <input 
            type="email" 
            id="email" 
            name='email' 
            value={email} 
            placeholder='Enter your email' 
            onChange={onChange}
            className="input input-bordered input-md w-full"
          />
        </label>
        <label className="input-group input-group-md justify-start align-center mt-4">
          <span>Password</span>
          <input 
            type="password" 
            id="password" 
            name='password' 
            value={password} 
            placeholder='Enter password' 
            onChange={onChange}
            className="input input-bordered input-md w-full"
          />
        </label>
        <button disabled={btnDisabled} type="submit" className='btn btn-primary mt-8'>Submit</button>
      </form>
    </>
  )
}

export default Login