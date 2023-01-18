import { useSelector} from 'react-redux'
import { Link } from 'react-router-dom'

function Dashboard() {

  const {user} = useSelector((state) => state.auth)

  return <>
    <div className=' px-4 mb-10 flex flex-col align-center justify-center h-[50vh] min-h-[10rem]'>
      <h1 className="text-primary-content text-5xl mb-5">Welcome {user && user.name}</h1>
      <p className="text-md font-bold mb-20">Flashcards Dashboard</p>
      <Link className='btn mt-5' to='/new-cardlist'>Create New List of Cards</Link>
      <Link className='btn btn-primary mt-5' to='/cardlists'>View Lists of Cards</Link>
    </div>
  </>
}

export default Dashboard