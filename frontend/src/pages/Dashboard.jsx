import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import FlashcardForm from '../components/FlashcardForm'
import FlashcardItem from '../components/FlashcardItem'
import FlashcardGen from '../components/FlashcardGen'
import Spinner from '../components/Spinner'
import { getFlashcards, reset } from '../features/flashcards/flashcardSlice'

function Dashboard() {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [cardEdit, setCardEdit] = useState({
    item: {},
    edit: false
  })

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
    <div className='text-primary-content px-4 mb-10 flex flex-col align-center justify-center h-[50vh] min-h-[10rem]'>
      <h1 className="text-5xl mb-5">Welcome {user && user.name}</h1>
      <p className="text-md text-white-400 font-bold">Flashcards Dashboard</p>
    </div>

    <FlashcardGen />
    
    <FlashcardForm cardEdit={cardEdit} setCardEdit={setCardEdit}/>

    <div className='mb-40'>
      {flashcards.length > 0 ? (
        <ul>
          {flashcards.map((flashcard) => (
            <FlashcardItem key={flashcard._id} flashcard={flashcard} setCardEdit={setCardEdit}/>
          ))}
        </ul>
      ) : (<h3>You have not set any flashcards</h3>)}
    </div>
  </>
}

export default Dashboard