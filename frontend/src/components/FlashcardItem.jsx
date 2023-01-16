import {AiFillDelete} from 'react-icons/ai'
import {BiEditAlt} from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'

function FlashcardItem({flashcard}) {

  return (
    <li className='card bg-base-300 mt-6 p-5 border-secondary text-white mx-4'>
        <p className='col-span-2'>{flashcard.frontText}</p>
        <div className="divider"></div>
        <p className='col-start-4 col-end-6'>{flashcard.backText}</p>
        <div className='mt-4'>
            <button className="btn btn-xs">
                <AiFillDelete className='text-accent'/>
            </button>
            <button className="btn btn-xs">
                < BiEditAlt className='text-accent'/>
            </button>
        </div>
    </li>
  )
}

export default FlashcardItem