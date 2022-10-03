import { useState, useEffect } from "react";
import WatchlistListItem from "../WatchlistListItem/WatchlistListItem";
import Table from 'react-bootstrap/Table'
import MyModal from '../../Components/MyModal/MyModal';
import * as watchlistsAPI from '../../utils/watchlists-api'
import MyToast from '../../Components/MyToast/MyToast';
import './WatchlistList.css';


export default function WatchlistList({ watchlists, isDefault, setIsDefault, setWatchlists }) {
  const [displayedWatchlists, setDisplayedWatchlists] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [modalShowDelete, setModalShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [show, setShow] = useState(false);
  const [msg, setMsg] = useState("")

  useEffect(() => {
    setDisplayedWatchlists(
      watchlists.map((watchlist, idx) => {
        return (
            <WatchlistListItem key={idx} watchlist={watchlist} handleChange={handleChange} isDefault={isDefault} deleteButton={deleteButton}/>
        );
      })
    );
  }, [watchlists, isDefault]);

  function handleChange(e) {
      setIsDefault(e.target.value);
      setModalShow(true)

  }

  async function handleSubmit(e) {
    e.preventDefault();
    setModalShow(false)
    const data= {
        isDefault: true,
    }

    const update = await watchlistsAPI.update(data, isDefault);
    if (update.success === true) {
      setMsg(<span className="toast-success">New DEFAULT watchlist set!</span>)
      setShow(true)
    } else {
      setMsg(<span className="toast-danger">ERROR setting default</span>)
      setShow(true)
    }
    // setWatchlists([...watchlists, watchlistList])
  }

  async function handleDelete(e) {
    e.preventDefault()
    setModalShowDelete(false)
    const deletedWatchlist = await watchlistsAPI.deleteOne(deleteId)
    if (deletedWatchlist.success === true) {
      setMsg(<span className="toast-success">Successfully REMOVED watchlist</span>)
      setShow(true)
    } else {
      setMsg(<span className="toast-danger">ERROR removing watchlist</span>)
      setShow(true)
    }
    setWatchlists(watchlists.filter(watchlist => watchlist._id !== deleteId))
  }

  function deleteButton(id) {
    setDeleteId(id)
    setModalShowDelete(true)
  }

  return (
    <>
      <Table striped bordered hover size="sm" className="WatchlistList">
        <thead>
          <tr>
            <th className='align-R'>Default</th>
            <th className='align-L'>Name</th>
            <th>Total</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayedWatchlists}
        </tbody>

      </Table>

      <MyModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        title="Change Default"
        handleSubmit={handleSubmit}
      />

      <MyModal
        show={modalShowDelete}
        onHide={() => setModalShowDelete(false)}
        title="Delete Watchlist"
        handleSubmit={handleDelete}
      />

      <MyToast show={show} setShow={setShow} msg={msg}/>

    </>
  );
}