import {AiFillDelete} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi'
import { useDispatch } from 'react-redux'
import {deleteFlashcard} from '../features/flashcards/flashcardSlice'

function FlashcardItem({flashcard, setCardEdit}) {
    const dispatch = useDispatch()

    const handleEditClick = () => {
        setCardEdit({
            item: flashcard,
            edit: true
        })
    }

  return (
    <li className='card bg-base-300 mt-6 p-5 border-secondary text-white'>
        <p className='col-span-2'>{flashcard.frontText}</p>
        <div className="divider"></div>
        <p className='col-start-4 col-end-6'>{flashcard.backText}</p>
        <div className='mt-4'>
            <button onClick={() => dispatch(deleteFlashcard(flashcard._id))} className="btn btn-xs">
                <AiFillDelete />
            </button>
            <button onClick={handleEditClick} className="btn btn-xs">
                < BiEditAlt />
            </button>
        </div>
    </li>
  )
}

export default FlashcardItem