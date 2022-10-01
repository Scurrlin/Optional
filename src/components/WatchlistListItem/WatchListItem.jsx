
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap'

export default function WatchlistListItem({watchlist, handleChange, isDefault, deleteButton}) {
    const [total, setTotal] = useState([])
    const url= `/watchlist/${watchlist._id}`
    useEffect(() => {
        const sum = watchlist.coins.reduce(function(r,a) {
            return r + a.usd*a.quantity;
        }, 0)
        setTotal(sum)
    }, [watchlist])
    return(
        <tr>
            <td className='align-R'><input type="radio" onChange={handleChange} name="isDefault" value={watchlist._id} checked={watchlist._id === isDefault? true:false}/></td>
            <td className='align-L'><Link to={url}><h5>{watchlist.name}</h5></Link></td>
            {/* <td><Link to={{
            pathname: url,
            state: { watchlist },
          }}>{watchlist.name}</Link></td> */}
            <td>${total.toLocaleString('en')}</td>
            <td>
                <input hidden name="id" value={watchlist._id} readOnly/>
                <Button onClick={()=> deleteButton( watchlist._id)} type="submit">x</Button>
            </td>
        </tr>
    )
}