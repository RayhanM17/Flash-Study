import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { FaUser } from 'react-icons/fa'
import { register, reset } from '../features/auth/authSlice'
import Spinner from '../components/Spinner'

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })
  const [btnDisabled, setBtnDisabled] = useState(true);

  const {name, email, password, password2} = formData

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
    if(name === '' || email === '' || password === '' || password2 === ''){
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

    if(name === '' || email === '' || password === '' || password2 === '') {
      toast.error('Please fill in all fields', {
        theme: "dark"
      })
    } else if(password !== password2) {
      toast.error('Passwords do not match', {
        theme: "dark"
      })
    } else {
      const userData = {
        name, email, password
      }

      dispatch(register(userData))
    }
  }

  if(isLoading) {
    return <Spinner />
  }

  return (
    <>
      <section className='grid justify-items-center'>
        <h1 className='text-5xl inline-flex align-center justify-center'>
          <FaUser/>
          <span className='ml-2'>Register</span>
        </h1>
        <div className='font-bold text-sm mt-4'>Please create an account</div>
      </section>

      <form 
        onSubmit={onSubmit} 
        className='form-control w-full flex justify-center align-center mt-8 px-8'
      >
        <label className="input-group input-group-md justify-start align-center">
          <span>Name</span>
          <input 
            type="text" 
            id="name" 
            name='name' 
            value={name} 
            placeholder='Enter your name' 
            onChange={onChange}
            className="input input-bordered input-md w-full"
          />
        </label>
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
        <label className="input-group input-group-md justify-start align-center mt-4">
          <span className='whitespace-nowrap'>Confirm Password</span>
          <input 
            type="password" 
            id="password2" 
            name='password2' 
            value={password2} 
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

export default Register