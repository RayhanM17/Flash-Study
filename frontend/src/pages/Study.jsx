import {useParams } from 'react-router-dom'
import { useSelector, useDispatch} from 'react-redux'
import { useEffect } from 'react'
import FlashcardFlip from '../components/FlashcardFlip';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'
import {BsChevronLeft, BsChevronRight} from 'react-icons/bs'
import { useState } from 'react';
import { getFlashcards, reset as flashcardsReset } from '../features/flashcards/flashcardSlice'
import { getCardList, reset} from '../features/cardLists/cardListSlice';

function Study() {
    const {cardList, isLoading, isError, message} = useSelector((state) => state.cardLists)
    const {flashcards, isLoading: flashcardsIsLoading, isError: flashcardsIsError, message: flashcardsMessage, isSuccess: flashcardsIsSuccess} = useSelector((state) => state.flashcards)
    
    const [index, setIndex] = useState(0)

    const {cardListId} = useParams()
    const dispatch = useDispatch()

    const toggleNext = () => {
        if(index + 1 < flashcards.length) {
            setIndex(index + 1)
        } else {
            setIndex(0)
        }
    }

    const togglePrev = () => {
        if(index - 1 < 0) {
            setIndex(flashcards.length - 1)
        } else {
            setIndex(index - 1)
        }
    }

    useEffect(() => {

        if(isError){
            toast.error(message, {
                position: toast.POSITION.BOTTOM_LEFT,
                theme: "dark"
            })
        }

        if(flashcardsIsError) {
            toast.error(flashcardsMessage, {
              position: toast.POSITION.BOTTOM_LEFT,
              theme: "dark"
            })
        }

        dispatch(getCardList(cardListId))
        dispatch(getFlashcards(cardListId))

        return () => {
            dispatch(reset())
            dispatch(flashcardsReset())
        }

    }, [isError, flashcardsIsError, message, flashcardsMessage])

    if(isLoading || flashcardsIsLoading) {
        return <Spinner />
    }

    if(flashcards[index] === undefined || cardList === undefined) {
        return (
            <div className='text-primary-content px-4 mb-10 flex flex-col align-center justify-center h-[50vh] min-h-[10rem]'>
                <h1 className="text-5xl mb-5">This set contains no flashcards</h1>
                <BackButton url='/cardlists' />
            </div>
        )
    }

    return <>
        <div className="ml-4 mt-10">
            <BackButton url='/cardlists' />
        </div>


        <div className='px-4 mb-10 flex flex-col align-center justify-center h-[50vh] min-h-[10rem]'>
            <h1 className="text-5xl mb-5 text-primary-content">Study your Flashcards</h1>
                <div className="divider"></div>

            <h2 className="text-3xl mb-5 mt-4">{cardList.title}</h2>
            <p>{cardList.description}</p>
        </div>

        <FlashcardFlip flashcard={flashcards[index]}/>

        <div className="w-full flex align-center justify-around mt-8 mb-40">
            <button onClick={togglePrev} className="btn btn-circle">
                <BsChevronLeft className='text-accent'/>
            </button>
            <div className="badge badge-primary">{`${index + 1}/${flashcards.length}`}</div>
            <button onClick={toggleNext} className="btn btn-circle">
                <BsChevronRight className='text-accent'/>
            </button>
        </div>

    </>
}

export default Study