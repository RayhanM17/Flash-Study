import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FlashcardForm from '../components/FlashcardForm'
import Spinner from '../components/Spinner'
import { getFlashcards, reset } from '../features/flashcards/flashcardSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user} = useSelector((state) => state.auth)
  const {flashcards, isLoading, isError, message} = useSelector((state) => state.flashcards)

  useEffect(() => {
    if(!user) {
      navigate('/')
      return
    }

    if(isError){
      console.log(message)
    }

    dispatch(getFlashcards())

    return () => {
      dispatch(reset())
    }
  }, [user, navigate, isError, message, dispatch])

  if(isLoading) {
    return <Spinner />
  }

  return <>
    <div className='text-primary-content px-4 mb-10'>
      <h1 className="text-5xl mb-5">Welcome {user && user.name}</h1>
      <p className="text-lg text-white-400 mb-5">Flashcards Dashboard</p>
    </div>

    <FlashcardForm />
  </>
}

export default Dashboard