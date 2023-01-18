import {AiFillDelete} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi'
import { useDispatch, useSelector} from 'react-redux'
import {toast} from 'react-toastify'
import { deleteFlashcard} from '../features/flashcards/flashcardSlice'

function FlashcardItem({flashcard, setFlashcardEdit, cardListId, setShowFlashcardModal}) {
  const {isSuccess, isError, message} = useSelector((state) => state.flashcards)
  const dispatch = useDispatch()

  return (
    <li className='card bg-base-300 mt-6 p-5 border-secondary text-white mx-4'>
        <p className='col-span-2'>{flashcard.frontText}</p>
        <div className="divider"></div>
        <p className='col-start-4 col-end-6'>{flashcard.backText}</p>
        <div className='mt-4'>
            <button 
              className="btn btn-xs"
              onClick={() => {
                dispatch(deleteFlashcard({
                  cardListId, 
                  flashcardId: flashcard._id
                }))
                if(isSuccess) {
                  toast.success(message, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    theme: "dark"
                  })
                }
                if(isError) {
                  toast.error(message, {
                    position: toast.POSITION.BOTTOM_LEFT,
                    theme: "dark"
                  })
                }
              }}
            >
                <AiFillDelete className='text-error'/>
            </button>
            <button 
              className="btn btn-xs"
              onClick={() => {
                setFlashcardEdit({
                  edit: true,
                  updateFlashcard: flashcard
                })
                setShowFlashcardModal(true)
              }}
            >
                <BiEditAlt className='text-warning'/>
            </button>
        </div>
    </li>
  )
}

export default FlashcardItem