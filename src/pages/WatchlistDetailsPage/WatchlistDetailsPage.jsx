import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import * as watchlistsAPI from "../../utils/watchlists-api";
import WatchlistDetailsItem from "../../components/WatchlistDetailsItem/WatchlistDetailsItem";
import Table from 'react-bootstrap/Table'
import MyModal from '../../components/MyModal/MyModal';
import { useHistory } from 'react-router'

export default function WatchlistDetailsPage( {setLoading} ) {
  const [error, setError] = useState("");
  const {id} = useParams();
  const [coins, setCoins] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [deleteCoin, setDeleteCoin] = useState({
    watchlistId: "",
    coinId: "",
  })
  
  const [watchlist, setWatchlist] = useState({})
  const history = useHistory()

  useEffect(() => {
      async function getWatchlist() {
          setError("")
          setLoading(true)
          const currentWatchlist = await watchlistsAPI.getOne(id)
          setWatchlist(currentWatchlist)
          setError(currentWatchlist.error)
          setLoading(false)
      }
      getWatchlist();
  }, [id])

  useEffect(() => {
    async function setLayout() {
      if (watchlist.coins !== undefined) {
        setCoins(
          watchlist.coins.length
            ? watchlist.coins.map((coin, idx) => 
              <WatchlistDetailsItem key={idx} coin={coin} watchlist={watchlist} setWatchlist={setWatchlist} setModalShow={setModalShow} setDeleteCoin={setDeleteCoin}/>)
            : null
        );
      }
    }
    setLayout()
  }, [watchlist])

  async function handleSubmit(e) {
      e.preventDefault();
      setModalShow(false)
      const deletedWatchlist = await watchlistsAPI.deleteCoin(deleteCoin)
      if (deletedWatchlist.success) {
        history.go(0)
      }
    }

  return (
    <>
      <h4>{error}</h4>
      <h3>{watchlist.name}</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {coins}
        </tbody>

      </Table>
      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Delete Coin"
        handleSubmit={handleSubmit}
      />
    </>
  );
}