import '../CoinList/CoinList.css'
import { Link } from "react-router-dom"
import { useMediaQuery } from "react-responsive";
import WSB from "../../images/WSB.png"
import WSB_Selected from "../../images/WSB_Selected.png"
import { useEffect } from 'react';
import { useState } from 'react';

export default function CoinListItem({ coin, watchlistCoins }) {
  const url = `details/${coin.id}/`
  const fav = `watchlist/add/${coin.id}`
  const [isFav, setIsFav] = useState(false)

  useEffect(() =>{
    if (watchlistCoins.length > 0) {
      const favCheck = watchlistCoins.includes(coin.id)
      setIsFav(favCheck)
    }
  },[watchlistCoins, coin])

  const Large = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 700 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 699 })
    return isMobile ? children : null
  }


	return (
    <tr>
      <Large>
        <td className="coin-name head-col">
          <div className="coin-L"><Link to={fav}>{isFav ? <img src={WSB_Selected} alt="fav" className="favicon"/> : <img src={WSB} alt="fav" className="favicon"/>}</Link>{coin.rank}</div>
            
            <div className="coin-R"><Link to={url}><img src={coin.image} alt="coin" className="coinImage"/>{coin.name}</Link></div>
            
        </td>
        <td> <span className="ticker">{coin.ticker}</span> </td>
      </Large>
      <Mobile>
        <td className="coin-name head-col mob-view">
          <div className="rank-icon"><Link to={fav}>{isFav ? <img src={WSB_Selected} alt="fav" className="favicon"/> : <img src={WSB} alt="fav" className="favicon"/>}</Link>{coin.rank}</div>
          <div className="coin-icon"><img src={coin.image} alt="coin" className="coinImage"/></div>  
          <div className="coin-R"><Link to={url}>{coin.name}</Link></div>
          <div className="ticker">&nbsp;{coin.ticker}&nbsp;</div>
            
        </td>
      </Mobile>
        <td> {Number(coin.price) < 1 ? coin.price.toLocaleString('en', { minimumFractionDigits: 6 }) : coin.price.toLocaleString('en', { minimumFractionDigits: 2 })} </td>
        <td> {coin.market_cap.toLocaleString()} </td>
        <td className={coin.price1h >= 0? "green": "red"}> {coin.price1h ? (coin.price1h.toFixed(2)): (null)} </td>
        <td className={coin.price24h >= 0? "green": "red"}> {coin.price24h ? (coin.price24h.toFixed(2)): (null)} </td>
        <td className={coin.price7d >= 0? "green": "red"}> {coin.price7d ? (coin.price7d.toFixed(2)): (null)} </td>
        <td className={coin.price14d >= 0? "green": "red"}> {coin.price14d ? (coin.price14d.toFixed(2)): (null)} </td>
      </tr>
	);
}