import {AiFillDelete} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi'
import { useDispatch} from 'react-redux'
import { deleteFlashcard} from '../features/flashcards/flashcardSlice'

function FlashcardItem({flashcard, setFlashcardEdit, cardListId, setShowFlashcardModal}) {

  const dispatch = useDispatch()

  return (
    <li className='card bg-base-300 mt-6 p-5 border-secondary text-white mx-4'>
        <p className='col-span-2'>{flashcard.frontText}</p>
        <div className="divider"></div>
        <p className='col-start-4 col-end-6'>{flashcard.backText}</p>
        <div className='mt-4'>
            <button 
              className="btn btn-xs"
              onClick={() => 
                dispatch(deleteFlashcard({
                  cardListId, 
                  flashcardId: flashcard._id
                }))
              }
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