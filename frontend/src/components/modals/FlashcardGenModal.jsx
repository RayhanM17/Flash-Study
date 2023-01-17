import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { reset, genFlashcards} from '../../features/flashcards/flashcardSlice'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';

function FlashcardGenModal({setShowModal, showModal, cardList}) {
    const [subject, setSubject] = useState('')

    const dispatch = useDispatch()

    const ModalClass = showModal ? 'modal-open' : ''

    const toggleModal = () => setShowModal(!showModal)

    const onSubmit = (e) => {
        e.preventDefault()
        if(subject !== ''){
            dispatch(genFlashcards({
                id: cardList._id,
                subject
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
            <h4 className='font-medium'>Generate Flashcards</h4>
            <form className='form-control' onSubmit={onSubmit}>
                <label onClick={toggleModal} htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <label className="input-group input-group-vertical mt-6">
                <span>Subject</span>
                <input 
                    type="text" 
                    name='subject'
                    id='subject'
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Enter Text" 
                    className="input input-bordered" 
                />
                </label>
                <button type='submit' className='btn btn-sm mt-5 btn-primary'>Submit</button>
            </form>
        </div>
    </div>
  )
}

FlashcardGenModal.propTypes = {
    cardList: PropTypes.object.isRequired,
    showModal: PropTypes.bool.isRequired,
    setShowModal: PropTypes.func.isRequired
};

export default FlashcardGenModal