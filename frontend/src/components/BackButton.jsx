import {FaArrowCircleLeft} from 'react-icons/fa'
import {Link} from 'react-router-dom'

function BackButton({url}) {
  return (
    <Link className='btn btn-sm btn-outline btn-secondary' to={url}>
        <FaArrowCircleLeft className='mr-1'/> Back
    </Link>
  )
}

export default BackButton