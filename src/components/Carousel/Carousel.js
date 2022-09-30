import React, { useState, useEffect } from "react";
import Carousel from "react-bootstrap/Carousel";
import "./Carousel.css";
import CryptoService from "../../utils/cryptoService";

//=========================================================

const sortRandom = () => {
  const rand = Math.floor(Math.random() * 2);
  return rand === 0 ? -1 : 1;
};

//==========================================================

export default function CryptoCarousel() {
  const [trendingCryptos, setTrendingCryptos] = useState([]);
  const [loading, setLoading] = useState(true);

  const TMDBImgUrl = "https://image.tmdb.org/t/p/w1280";

  let carouselCryptos = trendingCryptos.sort(sortRandom);
  carouselCryptos = trendingCryptos.slice(0, 5);
  let carouselItems = [];

  //==============================================================

  useEffect(() => {
    const fetchTrendingCryptos = async () => {
      const popCryptos = await CryptoService.fetchTrendingCryptos();
      setLoading(() => false);
      setTrendingCryptos(popCryptos.results);
    };
    fetchTrendingCryptos();
  }, []);

  //-------------------------------------------------------------------

  for (let crypto of carouselCryptos) {
    let carouselItem = (
      <Carousel.Item key={crypto.id}>
        <img
          className="d-block w-100"
          src={TMDBImgUrl + crypto.backdrop_path}
          alt={crypto.name}
        />
      </Carousel.Item>
    );
    carouselItems.push(carouselItem);
  }

  //===================================================

  return <Carousel>{carouselItems}</Carousel>;
}