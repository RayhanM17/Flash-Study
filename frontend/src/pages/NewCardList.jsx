import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createCardList, reset} from '../features/cardLists/cardListSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewCardList() {
  const {user} = useSelector((state) => state.auth)
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.cardLists)

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(isError) {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "dark"
      })
    }

    if(isSuccess) {
      dispatch(reset())
      navigate('/cardLists')
    }

    dispatch(reset())
  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = (e) => {
    e.preventDefault()

    dispatch(createCardList({title, description}))
  }

  if(isLoading) {
    return <Spinner />
  }

  return <>
    <div className="ml-4 mt-10">
      <BackButton url='/dashboard' />
    </div>
    <div className='text-primary-content px-4 mb-4 flex flex-col align-center justify-center h-[50vh] min-h-[10rem]'>
      <h1 className="text-5xl mb-5">Create New Cards List</h1>
      <p className="text-md text-white-400 font-bold">Please fill out the form below</p>
    </div>

    <div className="card bg-primary p-4 mx-4 mb-10">
      <label className="input-group input-group-md justify-start align-center mt-4">
        <span className='whitespace-nowrap'>Customer Name</span>
        <input 
          type="text"
          value={name}
          disabled
          className="input input-md w-full"
        />
      </label>
      <label className="input-group input-group-md justify-start align-center mt-4">
        <span className='whitespace-nowrap'>Customer Email</span>
        <input 
          type="text" 
          value={email}
          disabled
          className="input  input-md w-full"
        />
      </label>
      <form className='form-control' onSubmit={onSubmit}>
        <label className="input-group input-group-md justify-start align-center mt-4">
          <span className='whitespace-nowrap'>List title</span>
          <input 
            type="text" 
            name="title"
            id="title"
            value={title}
            onChange= {(e) => setTitle(e.target.value)}
            placeholder='Enter text'
            className="input  input-md w-full"
          />
        </label>
        <label className="label font-medium mt-3">
          <span className='label-text'>List Description</span>
        </label>
        <textarea 
          type="text" 
          name="description"
          id="description"
          value={description}
          onChange= {(e) => setDescription(e.target.value)}
          placeholder='Enter Text'
          className="textarea textarea-bordered h-24"
        /> 
        <button className='btn btn-block mt-6'>Submit</button>
      </form>
    </div>
  </>
}

export default NewCardList