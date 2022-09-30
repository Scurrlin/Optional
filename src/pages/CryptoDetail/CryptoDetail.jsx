import React, { useState, useEffect } from "react";
import Crypto from "../../components/Crypto/Crypto";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../components/Navbar/Navbar";
import UserService from "../../utils/userService";
import CryptoService from "../../utils/cryptoService";
import "./CryptoDetail.css";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import LoadingSpinner from "../../components/Loading/Loading";

const CryptoDetails = ({ user, handleLogout }) => {
  const [Crypto, setCrypto] = useState("");
  const [cryptoReviews, setCryptoReviews] = useState()
  const [userProfile, setUserProfile] = useState("");
  const [loading, setLoading] = useState(true)
  const [notInterested, setNotInterested] = useState(false)

  const TMDBImgUrl = "https://image.tmdb.org/t/p/w1280";

  const { id } = useParams();

  //==============================================================================

  useEffect(() => {
    const fetchCryptoDetails = async () => {
      const cryptoDetail = await CryptoService.getCryptoDetails(id);
      setLoading(false)
      console.log(cryptoDetail, "<---CRYPTO DETAILS");
      setCrypto(cryptoDetail);
    };
    fetchCryptoDetails();
    const getUserProfile = async () => {
      const profile = await UserService.getProfile();
      console.log(profile, "<---profile");
      if (profile.data.watchlistCryptos.find(((w => w.cryptoId === id)))){
        setNotInterested(true);
      }
      setLoading(false)
      setUserProfile(profile);
    };    
    getUserProfile();
  }, []);

  //================================================================================
    //======== ADD TO WATCHLIST =======================

    const handleAddToWatchlist =  (crypto) => {
      return (e) => {
        e.preventDefault();
        addToWatchlist(crypto)
        setNotInterested(true);
       };
    }

    async function addToWatchlist(crypto) {
      const cryptoInfo = {
        cryptoId: crypto.id,
        cryptoName: crypto.name,
        cryptoImg: `${TMDBImgUrl}${crypto.poster_path}`
      }
      try {
        const response = await CryptoService.addToWatchlist(cryptoInfo);
        console.log(response, "from add to watchlist cryptoservice");
      } catch (err) {
        console.log(err, " err from server");
      }
    }

  //=================================================================================


  if (loading) {
    return (
      <>
        <Navbar handleLogout={handleLogout} user={user} />
        <LoadingSpinner />
      </>
    );
  }

  return (
    <>
      <Navbar handleLogout={handleLogout} user={user}/>
      <Container>
        <br/>
        <br/>
        <br/>
        <br/>
        <Row>
          <Col>
            <img className="detailsImg" src={TMDBImgUrl + crypto.poster_path} alt={crypto.title}></img>
          </Col>
          <Col>
            <ul>
              <li className="cryptoInfo">
                <span className="cryptoInfoNames">NAME: </span>
                {crypto.name}
              </li>
              <br/>
              <li className="cryptoInfo">
                <span className="cryptoInfoNames">OVERVIEW: </span>
                {crypto.overview}
              </li>
              <br/>
              <li className="cryptoInfo">
                <span className="cryptoInfoNames">CURRENT PRICE: </span>
                {crypto.current_price}
              </li>
              <br/>
              { notInterested &&
              <Button disabled={notInterested} onClick={handleAddToWatchlist(crypto)} variant="success">Added to your watch list!</Button>
              }
              { !notInterested &&
              <Button disabled={notInterested} onClick={handleAddToWatchlist(crypto)} variant="success">Add to your watch list</Button>
              }

            </ul>
            
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CryptoDetails;