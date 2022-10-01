import { useEffect, useState } from "react"
import { useHistory, useParams } from "react-router-dom"
import * as watchlistsAPI from '../../utilities/watchlists-api'
import MyToast from "../../Components/MyToast/MyToast"
import './WatchlistAddPage.css'

export default function WatchlistAddPage( {setLoading} ) {
    const [watchlists, setWatchlists] = useState([])
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState("")
    const { id } = useParams() // coin ID
    const [form, setForm] = useState(
        {
            id: null, // watchlist ID
            quantity: 0,
        }
    )
    const history = useHistory();

    useEffect(() =>{
        async function getWatchlists() {
            setLoading(true)
			const watchlistList = await watchlistsAPI.getAll();
            if (watchlistList.length > 0) {
                const defaultWatchlist = watchlistList.filter((e)=>e.isDefault === true)
                setForm({...form, id: defaultWatchlist[0]._id})
                setWatchlists(watchlistList)
            }
            setLoading(false)
        }
        getWatchlists()
    }, [])

    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
    }

    async function handleSubmit(e) {
        e.preventDefault();

        const watchlistList = await watchlistsAPI.addCoin(form, id);
        if (watchlistList.success === true) {
            history.push(`/watchlist/${form.id}`);
          } else {
            setMsg(<span className="toast-danger">ERROR removing watchlist</span>)
            setShow(true)
          }

    }

    return(
        <div className="WatchlistAddPage">
            <h1>Add: {id}</h1>
            <br />
            <br />
            <form autoComplete="off" onSubmit={handleSubmit}>
            <label >Choose a watchlist:</label>
            <select name="id" onChange={handleChange}>
                {watchlists.length !== 0 ? (watchlists.map((e, idx)=>{return <option key={idx} value={e._id} selected={e.isDefault?"selected":""}>{e.name}</option>})):(<option value={null} selected >NO PORTFOLIO MADE (Visit myPortfolios)</option>)}
            </select>

            <label>Amount Owned:</label>
            <input placeholder="0" step="0.0001" min="0" type="number" onChange={handleChange} name="quantity"/>
            <button type="submit" disabled={form.id === null? true:false}>Submit</button>
            </form>
            <MyToast show={show} setShow={setShow} msg={msg}/>
        </div>
    )
}