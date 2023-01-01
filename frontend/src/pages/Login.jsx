import {useState, useEffect} from 'react'
import { FaSignInAlt } from 'react-icons/fa'

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const { email, password } = formData

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
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
        <button type="submit" className='btn btn-primary mt-8'>Submit</button>
      </form>
    </>
  )
}

export default Login