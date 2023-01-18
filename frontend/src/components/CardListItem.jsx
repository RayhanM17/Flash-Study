import {Link} from 'react-router-dom'

function CardListItem({cardList}) {
  return (
    <tr>
        <td>{new Date(cardList.createdAt).toLocaleString('en-US')}</td>
        <td>{cardList.title}</td>
        <td>
          <Link className='btn btn-ghost btn-sm' to={`/cardlist/${cardList._id}`} >
              View
          </Link>
        </td>
        <td>
          <Link className='btn btn-ghost btn-sm' to={`/cardlist/${cardList._id}/study`} >
              Study
          </Link>
        </td>
    </tr>
  )
}

export default CardListItem