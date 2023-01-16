import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { createFlashcard} from '../features/flashcards/flashcardSlice'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';

function FlashcardModal({showFlashcardModal, setShowFlashcardModal, cardList}) {

    const [frontText, setFrontText] = useState( '')
    const [backText, setBackText] = useState('')

    const dispatch = useDispatch()

    const ModalClass = showFlashcardModal ? 'modal-open' : ''

    const toggleModal = () => {
        setShowFlashcardModal(!showFlashcardModal)
        setFrontText('')
        setBackText('')
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(frontText !== '' && backText !== ''){
            dispatch(createFlashcard({
                id: cardList._id,
                flashcard: {
                    frontText,
                    backText
                }
            }))
            toggleModal()
        } else {
            toast.error('Please fill in all fields', {
                position: toast.POSITION.BOTTOM_LEFT,
                theme: "dark"
            })
        }
        
    }

  return (
    <div className={`modal ${ModalClass}`} >
        <div className="modal-box relative">
            <h4 className='font-medium'>Add a Flashcard</h4>
            <form className='form-control' onSubmit={onSubmit}>
                <label onClick={toggleModal} htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <label className="input-group input-group-vertical mt-6">
                    <span>Front Text</span>
                    <input 
                        type="text" 
                        name='frontText'
                        id='frontText'
                        value={frontText}
                        onChange={(e) => setFrontText(e.target.value)}
                        placeholder="Enter Text" 
                        className="input input-bordered" 
                    />
                </label>
                <label className="input-group input-group-vertical mt-6">
                    <span>Back Text</span>
                    <input 
                        type="text" 
                        name='backText'
                        id='backText'
                        value={backText}
                        onChange={(e) => setBackText(e.target.value)}
                        placeholder="Enter Text" 
                        className="input input-bordered" 
                    />
                </label>
                
                <button 
                    type='submit' 
                    className='btn btn-sm mt-5 btn-primary'
                >
                    Submit
                </button>
            </form>
        </div>
    </div>
  )
}

FlashcardModal.propTypes = {
    showFlashcardModal: PropTypes.bool.isRequired,
    setShowFlashcardModal: PropTypes.func.isRequired,
    cardList: PropTypes.object.isRequired,
};

export default FlashcardModal