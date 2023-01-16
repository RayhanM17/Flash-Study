import { useNavigate, Link, useParams } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import FlashcardFlip from '../components/FlashcardFlip';
import Spinner from '../components/Spinner'
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'
import { useState } from 'react';
import { getFlashcardsLists, reset } from '../features/flashcards/flashcardSlice';

function Study() {
    const {user} = useSelector((state) => state.auth)
    const {flashcardsLists, isLoading, isSuccess, isError, message} = useSelector((state) => state.flashcards)
    const [index, setIndex] = useState(0)
    const { id } = useParams()
    const list = flashcardsLists.find(list => list._id === id)
    const [currentCard, setCurrentCard] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if(!user) {
            navigate('/')
        }

        if(isError){
            console.log(message)
        }

        if(isSuccess && list.flashcards.length > 0){
            setCurrentCard(list.flashcards[index])
        }

        dispatch(getFlashcardsLists())

        return () => {
            dispatch(reset())
        }
    }, [user, navigate, dispatch, isError, message])

    if(isLoading) {
        return <Spinner />
    }

    if(currentCard === null) {
        return (
            <div className='text-primary-content px-4 mb-10 flex flex-col align-center justify-center h-[50vh] min-h-[10rem]'>
                <h1 className="text-5xl mb-5">You have no flashcards to study</h1>
                <Link to='/dashboard' className='mt-5 btn btn-wide btn-primary'>
                    Return to Dashboard
                </Link>
            </div>
        )
    }

    const toggleNext = () => {
        if(index + 1 < list.flashcards.length) {
            setCurrentCard(list.flashcards[index + 1])
            setIndex(index + 1)
        } else {
            setCurrentCard(list.flashcards[0])
            setIndex(0)
        }
    }

    const togglePrev = () => {
        if(index - 1 < 0) {
            setCurrentCard(list.flashcards[list.flashcards.length - 1])
            setIndex(list.flashcards.length - 1)
        } else {
            setCurrentCard(list.flashcards[index - 1])
            setIndex(index - 1)
        }
    }

    return <>
        <div className='text-primary-content px-4 mb-10 flex flex-col align-center justify-center h-[50vh] min-h-[10rem]'>
            <h1 className="text-5xl mb-5">Study your Flashcards</h1>
            <p className="text-md text-white-400 font-bold">{currentCard ? 'Flashcard Flipper' : 'Return to dashboard'}</p>
            {currentCard ? 
                <></> : 
                (<Link to='/dashboard' className='mt-5 btn btn-md btn-primary btn-sm rounded-btn'>
                    Create Flashcards
                </Link>)
            }
        </div>

        <FlashcardFlip flashcard={currentCard}/>

        <div className="w-full flex align-center justify-around mt-8 mb-40">
            <button onClick={togglePrev} className="btn btn-circle">
                <BsChevronLeft className='text-accent'/>
            </button>
            <div className="badge badge-primary">{`${index + 1}/${list.flashcards.length}`}</div>
            <button onClick={toggleNext} className="btn btn-circle">
                <BsChevronRight className='text-accent'/>
            </button>
        </div>

    </>
}

export default Study