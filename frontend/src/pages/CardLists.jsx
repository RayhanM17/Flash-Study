import {useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getCardLists, reset} from '../features/cardLists/cardListSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'
import CardListItem from '../components/CardListItem'

function CardLists() {
    const {cardLists, isLoading, isSuccess} = useSelector((state) => state.cardLists)

    const dispatch = useDispatch()

    // handle unmount
    useEffect(() => {
        return () => {
            if(isSuccess) {
                dispatch(reset())
            }
        }
    }, [dispatch, isSuccess])

    useEffect(() => {
        dispatch(getCardLists())
    }, [dispatch])

    if(isLoading) {
        return <Spinner />
    }

  return (
    <>
        <div className="ml-4 mt-10">
            <BackButton url='/dashboard' />
        </div>

        <div className='text-primary-content px-4 mb-4 flex flex-col align-center justify-center h-[50vh] min-h-[10rem]'>
            <h1 className="text-5xl mb-5">Lists of Flashcards</h1>
            <p className="text-md text-white-400 font-bold">Manage your lists below</p>
        </div>

        <table className="table w-full mb-8">
            <thead>
                <tr>
                    <th>Date</th>
                    <th>Title</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {cardLists.map((cardList) => (
                    <CardListItem key={cardList._id} cardList={cardList}/>
                ))}
            </tbody>
        </table>
    </>
  )
}

export default CardLists