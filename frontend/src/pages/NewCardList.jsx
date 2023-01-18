import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-toastify'
import {createCardList, reset} from '../features/cardLists/cardListSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

function NewCardList() {
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.cardLists)
  const [btnDisabled, setBtnDisabled] = useState(true);

  const [formData, setFormData] = useState({
    title: '',
    description: ''
  })

  const { title, description } = formData

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

  const onChange = (e) => {
    if(title === '' || description === ''){
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

    dispatch(createCardList({title, description}))
  }

  if(isLoading) {
    return <Spinner />
  }

  return <>
    <div className="ml-4 mt-10">
      <BackButton url='/dashboard' />
    </div>

    <div className='px-4 mb-4 mt-20 flex flex-col align-center justify-center h-[50vh] min-h-[10rem]'>
      <h1 className=" text-primary-content text-5xl mb-5">Create New Cards List</h1>
      <p className="text-md font-bold">Please fill out the form below</p>

      <form className='form-control mt-20' onSubmit={onSubmit}>
        <label className="input-group input-group-md justify-start align-center mt-4">
          <span className='whitespace-nowrap'>List title</span>
          <input 
            type="text" 
            name="title"
            id="title"
            value={title}
            onChange={onChange}
            placeholder='Enter text'
            className="input input-bordered input-md w-full"
          />
        </label>
        <div className="input-group input-group-vertical mt-4">
          <span className='label-text p-2'>List Description</span>
          <textarea 
            type="text" 
            name="description"
            id="description"
            value={description}
            onChange= {onChange}
            placeholder='Enter Text'
            className="textarea textarea-bordered h-24"
          />
        </div>
        <button disabled={btnDisabled} className='btn btn-block mt-6'>Submit</button>
      </form>
    </div>
  </>
}

export default NewCardList