import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getCardList, reset} from '../features/cardLists/cardListSlice'
import {useParams, useNavigate} from 'react-router-dom'
import BackButton from '../components/BackButton'
import {getFlashcards, reset as flashcardsReset} from '../features/flashcards/flashcardSlice'
import { toast } from 'react-toastify'
import {FaPlus} from 'react-icons/fa'
import {BiEditAlt} from 'react-icons/bi'
import Spinner from '../components/Spinner'
import CardListModal from '../components/CardListModal'
import FlashcardItem from '../components/FlashcardItem'
import FlashcardModal from '../components/FlashcardModal'

function CardList() {
  const {cardList, isLoading, isSuccess, isError, message} = useSelector((state) => state.cardLists)
  const {flashcards, isLoading: flashcardsIsLoading, isError: flashcardsIsError, message: flashcardsMessage} = useSelector((state) => state.flashcards)

  const [showListModal, setShowListModal] = useState(false)
  const [showFlashcardModal, setShowFlashcardModal] = useState(false)

  const params = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {cardListId} = useParams()

  useEffect(() => {
    if(isError) {
      toast.error(message, {
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "dark"
      })
    }
    
    if(flashcardsIsError) {
      toast.error(flashcardsMessage, {
        position: toast.POSITION.BOTTOM_LEFT,
        theme: "dark"
      })
    }

    dispatch(getCardList(cardListId))
    dispatch(getFlashcards(cardListId))

  }, [isError, message, cardListId, flashcardsIsError])

  if(isLoading || flashcardsIsLoading) {
    return <Spinner />
  }

  if(isError) {
    return <h3>Something Went Wrong</h3>
  }

  const toggleListModal = () => setShowListModal(!showListModal)

  const toggleFlashcardModal = () => setShowFlashcardModal(!showFlashcardModal)

  return <>
    <div className="ml-4 mt-10">
      <BackButton url='/cardlists' />
    </div>

    <div className='px-4 mb-4 flex flex-col align-center justify-center h-[50vh] min-h-[10rem]'>
      <div className='flex justify-between align-center'>
        <h2 className="text-accent-content text-4xl mb-5">{cardList.title}</h2>
        <button onClick={toggleListModal} className='btn btn-sm btn-outline mt-2 btn-primary'>
          <BiEditAlt className='mr-1' /> Edit List
        </button>
      </div>
      <div className="flex flex-col">
        <h2 className="text-md font-medium">Description: </h2>
        <p className='font-medium'>{cardList.description}</p>
      </div>
      <div className="divider"></div>

      <div className='flex justify-between align-center'>
        <h2 className="text-accent-content text-2xl mb-5">Flashcards</h2>
        <button onClick={toggleFlashcardModal} className='btn btn-sm btn-outline mt-2 btn-accent'>
          <FaPlus className='mr-1'/>Add Flashcards
        </button>
      </div>
    </div>

    {flashcards.map((flashcard) => 
      <FlashcardItem key={flashcard._id} flashcard={flashcard} />
    )}

    <CardListModal 
      cardList={cardList}
      showListModal={showListModal} 
      setShowListModal={setShowListModal}
    />
    <FlashcardModal
      showFlashcardModal={showFlashcardModal} 
      setShowFlashcardModal={setShowFlashcardModal} 
      cardList={cardList}
    />
  </>
}

export default CardList