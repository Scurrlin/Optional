import React from "react";
import "./WatchlistCrypto.css";
import { LinkContainer } from "react-router-bootstrap";
import Button from "react-bootstrap/Button";
import "./WatchlistCrypto.css";

//============================================================

const WatchListCrypto = (props) => {
  let linkUrl = "/crypto-details/";
  let cryptoId = props.cryptoId;

  //==========================================================

  return (
    <>
      <div className="crypto image-container">
        <LinkContainer to={linkUrl + cryptoId}>
          <img src={props.cryptoImg} alt={props.cryptoName}></img>
        </LinkContainer>
        <div
          onClick={props.handleRemoveFromWatchlist}
          className="removeOverlay d-flex align-items-center justify-content-center"
        >
          Remove from your Watchlist
        </div>
      </div>
    </>
  );
};

export default WatchListCrypto;