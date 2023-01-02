import {useState} from 'react'
import {useDispatch} from 'react-redux'
import {createFlashcard} from '../features/flashcards/flashcardSlice'
import { toast } from 'react-toastify'

function FlashcardForm() {
    const [formData, setFormData] = useState({
        frontText: '',
        backText: ''
    })
    const [btnDisabled, setBtnDisabled] = useState(true);

    const dispatch = useDispatch()
    
    const { frontText, backText } = formData

    const onChange = (e) => {
        if(frontText === '' || backText === ''){
            setBtnDisabled(true)
        } else{
            setBtnDisabled(false)
        }

        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(frontText !== '' && backText !== '') {
            const flashcardData = {
                frontText,
                backText
            }
            dispatch(createFlashcard(formData))
            setFormData({
                frontText: '',
                backText: ''
            })
        } else {
            toast.error('Please fill in all fields', {
                theme: "dark"
            })
        }
    }

  return <form onSubmit={onSubmit} className="card bg-primary p-8 mt-7">
        <p className='card-title mb-5 text-white'> Create Flashcards</p>
        <label className="input-group input-group-md justify-start align-center mt-4">
          <span>Front</span>
          <input 
            type="text" 
            id="frontText" 
            name='frontText' 
            value={frontText}
            placeholder='Enter text'
            onChange={onChange}
            className="input input-md w-full"
          />
        </label>
        <label className="input-group input-group-md justify-start align-center mt-4">
          <span>Back</span>
          <input 
            type="text" 
            id="backText" 
            name='backText' 
            value={backText}
            placeholder='Enter text'
            onChange={onChange}
            className="input input-md w-full"
          />
        </label>
        <button disabled={btnDisabled} type='submit' className="btn mt-8">Submit</button>
    </form>
}

export default FlashcardForm