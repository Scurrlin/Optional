import './WatchlistPage.css';
import { useState, useEffect } from 'react'
import WatchlistList from '../../Components/WatchlistList/WatchlistList'
import * as watchlistsAPI from '../../utils/watchlists-api'
import { Button } from 'react-bootstrap'
import MyModal from '../../Components/MyModal/MyModal';


export default function WatchlistPage( {setLoading} ) {
    const [watchlists, setWatchlists]= useState([])
    const [modalShow, setModalShow] = useState(false);
    const [isDefault, setIsDefault] = useState("");
    const [form, setForm] = useState({
        name: "",
      });

    useEffect(() => {
        async function getWatchlists() {
            setLoading(true);
            const watchlistList = await watchlistsAPI.getAll();
            setWatchlists(watchlistList)
            const defaultIndex = watchlistList.findIndex((e)=>e.isDefault ===true)
            if (defaultIndex !== -1) {
              setIsDefault(watchlistList[defaultIndex]._id)
            }
            setLoading(false);
        }
        getWatchlists()
    },[])


    function handleChange(e) {
        setForm({...form, [e.target.name]: e.target.value})
      }
    async function handleSubmit(e) {
        e.preventDefault();
        setModalShow(false)
        const watchlistList = await watchlistsAPI.create(form);
        setForm({name:""})
        setWatchlists([...watchlists, watchlistList])
      }

    return(
        <>
            <h3>Watchlist</h3>
            <nav>
            <Button variant="primary" onClick={() => setModalShow(true)}>+</Button>
            </nav>
            <WatchlistList watchlists={watchlists} isDefault={isDefault} setIsDefault={setIsDefault} setWatchlists={setWatchlists}/>


      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Add Watchlist"
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        form={form}
        setForm={setForm}
      />
        </>
    );
}