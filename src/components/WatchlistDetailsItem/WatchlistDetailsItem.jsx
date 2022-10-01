import { Link } from "react-router-dom";
import { useState } from "react";
import * as watchlistsAPI from "../../utilities/watchlists-api";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import "./WatchlistDetailsItem.css"

export default function WatchlistDetailsItem({
  idx,
  coin,
  watchlist,
  setWatchlist,
  setModalShow,
  setDeleteCoin,
}) {
  const [form, setForm] = useState({
    id: watchlist._id,
    quantity: coin.quantity,
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleUpdate(e) {
    e.preventDefault();

    const updatedWatchlist = await watchlistsAPI.addCoin(form, coin.id);
    updatedWatchlist.addedQuantity.coins.forEach((e, idx) => {
      updatedWatchlist.addedQuantity.coins[idx].usd = watchlist.coins[idx].usd;
      updatedWatchlist.addedQuantity.coins[idx].usd_24h_change =
        watchlist.coins[idx].usd_24h_change;
    });
    setWatchlist(updatedWatchlist.addedQuantity);
  }

  return (
    <tr className="WatchlistDetailsItem">
      <th>
        <Link to={`/details/${coin.id}`}>{coin.id}</Link>
      </th>
      <th>{(coin.usd).toLocaleString('en')}</th>
      <th>
        <DropdownButton id="dropdown-basic-button" title={coin.quantity}>
          <Dropdown.Header>
            <form autoComplete="off" onSubmit={handleUpdate}>
              <input
                type="number"
                name="quantity"
                placeholder="0"
                step="0.0001"
                min="0"
                value={form.quantity}
                onChange={handleChange}
              />
              <button type="submit">Update</button>
            </form>
          </Dropdown.Header>
        </DropdownButton>
      </th>
      <th>{(Number(coin.usd) * Number(coin.quantity)).toLocaleString('en')}</th>
      <th><button onClick={()=> {
        setModalShow(true)
        setDeleteCoin({
          watchlistId: watchlist._id,
          coinId: coin.id,
        })
      }}>x</button></th>
    </tr>
  );
}