import React from "react";
import "./Crypto.css";
import { LinkContainer } from "react-router-bootstrap";

//============================================================

const Crypto = (props) => {
  // console.log(props, '<-- crypto component props')
  
  const TMDBImgUrl = "https://image.tmdb.org/t/p/w1280";

  let linkUrl = "/crypto-details/";
  let cryptoId = props.id;

  //==========================================================

  return (
    <div className="crypto image-container">
      <LinkContainer to={linkUrl + cryptoId}>
        <img src={TMDBImgUrl + props.logo_path} alt={props.name}></img>
      </LinkContainer>

      <div className="overlay d-flex align-items-center justify-content-center">
        Details
      </div>
    </div>
  );
};

export default Crypto;