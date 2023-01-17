import {useState, useEffect} from 'react'
import {useDispatch} from 'react-redux'
import { createFlashcard, updateFlashcard} from '../../features/flashcards/flashcardSlice'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';

function FlashcardModal({showModal, setShowModal, setFlashcardEdit, flashcardEdit, cardList}) {

    const [frontText, setFrontText] = useState('')
    const [backText, setBackText] = useState('')

    useEffect(() => {
        if(flashcardEdit.edit) {
            setFrontText(flashcardEdit.updateFlashcard.frontText)
            setBackText(flashcardEdit.updateFlashcard.backText)
        }
    }, [flashcardEdit, setFrontText])

    const dispatch = useDispatch()

    const ModalClass = showModal ? 'modal-open' : ''

    const toggleModal = () => {
        setShowModal(!showModal)
        setFrontText('')
        setBackText('')
        setFlashcardEdit({
            edit: false,
            updateFlashcard: {}
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(frontText !== '' && backText !== ''){
            if(!flashcardEdit.edit){
                dispatch(createFlashcard({
                    id: cardList._id,
                    flashcard: {
                        frontText,
                        backText
                    }
                }))
            } else {
                dispatch(updateFlashcard({
                    id: cardList._id,
                    flashcard: {
                        id: flashcardEdit.updateFlashcard._id,
                        frontText,
                        backText
                    }
                }))
            }
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
            <h4 className='font-medium'>{flashcardEdit.edit ? 'Update Flashcard': 'Add a Flashcard'}</h4>
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
                    className={`btn btn-sm mt-5 ${flashcardEdit.edit ? 'btn-warning': 'btn-primary'}`}
                >
                    {flashcardEdit.edit? 'Save Changes' : 'Submit'}
                </button>
            </form>
        </div>
    </div>
  )
}

FlashcardModal.propTypes = {
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired,
    setFlashcardEdit: PropTypes.func.isRequired,
    flashcardEdit: PropTypes.object.isRequired,
    cardList: PropTypes.object.isRequired,
}

export default FlashcardModal