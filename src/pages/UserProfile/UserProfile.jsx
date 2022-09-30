import React, { useState, useEffect, useCallback } from "react";
import "./UserProfile.css";
import CryptoService from "../../utils/cryptoService";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../components/Navbar/Navbar";
import WatchlistMovie from "../../components/WatchlistCrypto/WatchlistCrypto";
import userService from "../../utils/userService";
import { useParams } from "react-router-dom";

//================================================================

export default function UserProfile({ user, handleLogout }) {
  const [watchlistCryptos, setWatchlistCryptos] = useState([]);
  const [profileUser, setProfileUser] = useState({});
  const [loading, setLoading] = useState(true);

  const { username } = useParams();

  const removeFromWatchlist = async () => {
    try {
      const response = await CryptoService.removeCryptoFromWatchlist();
      console.log(response, "<-- response from remove Crypto");
    } catch (err) {
      console.log(err);
    }
  };

  const handleRemoveFromWatchlist =  (crypto) => {
    return (e) => {
      console.log('CLICK HAPPENING')
      e.preventDefault();
      removeFromWatchlist(crypto)
     };
  }

  //===============================================================

  const getProfile = useCallback(async () => {
    try {
      const response = await userService.getProfile(username);
      setLoading(false);
      setProfileUser(response.data.user);
      setWatchlistCryptos(response.data.watchlistCryptos);
    } catch (err) {
      console.log(err.message);
    }
  }, [username]);

  //===============================================================

  useEffect(() => {
    getProfile();
  }, [username, getProfile]);

  return (
    <>
      <Navbar handleLogout={handleLogout} user={user} />
      <br />
      <Container fluid="md">
        <Row>
          <Col>
            <br />
            <br />
            <h1 className="username">{profileUser.username}'s Watchlist </h1>
          </Col>
        </Row>
        <br />
        <br />
        <Row>
          <Col>
            <div className="crypto-container">
              {watchlistCryptos.length > 0 &&
                watchlistCryptos.map((crypto) => (
                  <WatchlistCrypto key={crypto.cryptoId} {...crypto} handleRemoveFromWatchlist={handleRemoveFromWatchlist} />
                ))}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}