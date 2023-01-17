import { useEffect, useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { getCardList, reset} from '../features/cardLists/cardListSlice'
import {useParams, useNavigate} from 'react-router-dom'
import BackButton from '../components/BackButton'
import {getFlashcards, reset as flashcardsReset} from '../features/flashcards/flashcardSlice'
import { toast } from 'react-toastify'
import {FaPlus} from 'react-icons/fa'
import {BiEditAlt} from 'react-icons/bi'
import { GiArtificialIntelligence } from "react-icons/gi";
import Spinner from '../components/Spinner'
import CardListModal from '../components/modals/CardListModal'
import FlashcardItem from '../components/FlashcardItem'
import FlashcardModal from '../components/modals/FlashcardModal'
import FlashcardGenModal from '../components/modals/FlashcardGenModal'

function CardList() {
  const {cardList, isLoading, isError, message} = useSelector((state) => state.cardLists)
  const {flashcards, isLoading: flashcardsIsLoading, isError: flashcardsIsError, message: flashcardsMessage} = useSelector((state) => state.flashcards)

  const [showListModal, setShowListModal] = useState(false)
  const [flashcardEdit, setFlashcardEdit] = useState({
    edit: false,
    updateFlashcard: {}
  })
  const [showFlashcardModal, setShowFlashcardModal] = useState(false)
  const [showFlashcardGenModal, setShowFlashcardGenModal] = useState(false)

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

    return () => {
      dispatch(reset())
      dispatch(flashcardsReset())
    }

  }, [isError, message, cardListId, flashcardsIsError])

  if(isLoading || flashcardsIsLoading) {
    return <Spinner />
  }

  if(isError) {
    return <h3>Something Went Wrong</h3>
  }

  const toggleListModal = () => setShowListModal(!showListModal)
  const toggleFlashcardModal = () => setShowFlashcardModal(!showFlashcardModal)
  const toggleFlashcardGenModal = () => setShowFlashcardGenModal(!showFlashcardGenModal)

  return <>
    <div className="ml-4 mt-10">
      <BackButton url='/cardlists' />
    </div>

    <div className='px-4 flex flex-col align-center justify-center h-[45vh]'>
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
        <h2 className="text-accent-content text-2xl my-0 text-center">Flashcards</h2>
        <div className="btn-group">
          <button onClick={toggleFlashcardModal} className='btn btn-sm btn-outline btn-accent'>
            <FaPlus className='mr-1'/>Add Flashcard
          </button>
          <button onClick={toggleFlashcardGenModal} className='btn btn-sm btn-outline btn-accent'>
            <GiArtificialIntelligence className='mr-1'/>Generate Flashcards
          </button>
        </div>
      </div>
    </div>

    <div className='mb-10'>
      {flashcards.map((flashcard) => 
        <FlashcardItem 
          key={flashcard._id} 
          flashcard={flashcard} 
          setFlashcardEdit={setFlashcardEdit} 
          cardListId={cardList._id}
          setShowFlashcardModal={setShowFlashcardModal}
        />
      )}
    </div>

    <CardListModal 
      cardList={cardList}
      showModal={showListModal} 
      setShowModal={setShowListModal}
    />
    <FlashcardModal
      showModal={showFlashcardModal} 
      setShowModal={setShowFlashcardModal} 
      setFlashcardEdit={setFlashcardEdit}
      flashcardEdit={flashcardEdit}
      cardList={cardList}
    />
    <FlashcardGenModal 
      setShowModal={setShowFlashcardGenModal}
      showModal={showFlashcardGenModal}
      cardList={cardList}
    />
  </>
}

export default CardList