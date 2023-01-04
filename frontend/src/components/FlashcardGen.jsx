import {useDispatch} from 'react-redux'
import {useState} from 'react'
import {genFlashcards} from '../features/flashcards/flashcardSlice'
import { toast } from 'react-toastify'

function FlashcardGen() {
    const [subject, setSubject] = useState('')
    const [btnDisabled, setBtnDisabled] = useState(true);

    const dispatch = useDispatch()

    const onChange = (e) => {
        if(subject === ''){
            setBtnDisabled(true)
        } else{
            setBtnDisabled(false)
        }

        setSubject(e.target.value)
    }

    const onSubmit = (e) => {
        e.preventDefault()

        if(subject !== ''){
            dispatch(genFlashcards(subject))
            setSubject('')
        } else {
            toast.error('Please fill in all fields', {
                position: toast.POSITION.BOTTOM_LEFT,
                theme: "dark"
            })
        }
    }

  return (
    <form className="card bg-secondary p-8" onSubmit={onSubmit}>
      <p className='card-title mb-5 text-white'> Generate Flashcards</p>
      <label className="input-group input-group-md justify-start align-center mt-4">
          <span>Subject</span>
          <input 
            type="text" 
            id="frontText" 
            name='frontText' 
            value={subject}
            placeholder='Enter text'
            onChange={onChange}
            className="input input-md w-full"
          />
        </label>
        <button disabled={btnDisabled} type='submit' className="btn mt-8">Submit</button>
    </form>
  )
}

export default FlashcardGen