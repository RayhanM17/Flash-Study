import {useState} from 'react'
import {useDispatch} from 'react-redux'
import { reset, updateCardList} from '../features/cardLists/cardListSlice'
import { toast } from 'react-toastify'
import PropTypes from 'prop-types';

function CardListModal({cardList, showListModal, setShowListModal}) {
    const [title, setTitle] = useState(cardList.title)
    const [description, setDescription] = useState(cardList.description)

    const dispatch = useDispatch()

    const ModalClass = showListModal ? 'modal-open' : ''

    const toggleModal = () => setShowListModal(!showListModal)

    const onSubmit = (e) => {
        e.preventDefault()
        if(title !== '' && description !== ''){
            dispatch(updateCardList({
                id: cardList._id,
                list: {
                    title,
                    description
                }
            }))
            dispatch(reset())
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
            <form className='form-control' onSubmit={onSubmit}>
                <label onClick={toggleModal} htmlFor="my-modal-3" className="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                <label className="input-group input-group-vertical mt-6">
                <span>List Title</span>
                <input 
                    type="text" 
                    name='title'
                    id='title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter Text" 
                    className="input input-bordered" 
                />
                </label>
                <label className="label font-medium mt-3">
                <span className='label-text'>List Description</span>
                </label>
                <textarea 
                type="text" 
                name="description"
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder='Enter Text'
                className="textarea textarea-bordered h-24 w-full"
                /> 
                <button type='submit' className='btn btn-sm mt-5 btn-warning'>Update</button>
            </form>
        </div>
    </div>
  )
}

CardListModal.propTypes = {
    cardList: PropTypes.object.isRequired,
    showListModal: PropTypes.bool.isRequired,
    setShowListModal: PropTypes.func.isRequired
};

export default CardListModal