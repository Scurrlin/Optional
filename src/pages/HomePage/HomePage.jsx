import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar";
import Carousel from "../../components/Carousel/Carousel";
import CryptoService from "../../utils/cryptoService";
import Crypto from "../../components/Crypto/Crypto";
import LoadingSpinner from "../../components/Loading/Loading";

function HomePage({ user, handleLogout }) {
  const [cryptos, setCryptos] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  //==========================================

  useEffect(() => {
    const fetchTrendingCryptos = async () => {
      const cryptos = await CryptoService.fetchTrendingCryptos();
      // console.log(cryptos, "<-- from fetch trending cryptos");
      setLoading(() => false);
      setCryptos(cryptos.results);
    };
    fetchTrendingCryptos();
  }, []);

  //===================================================

  const fetchSearchCryptos = async (query) => {
    const queryCryptos = await CryptoService.movieCrypto(query);
    console.log(queryCryptos)
    setCryptos(queryCryptos.results)
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      fetchSearchCryptos(search)
      setSearch("");
    }
  };

  const handleChange = (e) => {
    setSearch(e.target.value);
  };


  //=======================================================

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
      <Navbar handleLogout= {handleLogout} user={user}/>
      <br />
      <Container fluid="md">
        <Row>
          <Col>
            <Carousel />
          </Col>
        </Row>

        <br />
        <br />
        <br />

        <Row>
          <Col>
            <h2>Curious about Crypto? Learn more below!</h2>

            <div className="searchform-container">
              <form onSubmit={handleSubmit} className="searchAuth-form">
                <div className="Auth-form-content">
                  <div className="form-group mt-3">
                    <input
                      name="search"
                      value={search}
                      onChange={handleChange}
                      className="form-control mt-1"
                      placeholder="Search Crypto Name"
                      required
                    />
                  </div>

                  <div className="d-grid gap-2 mt-3">
                    <button type="submit" className="btn btn-secondary">
                      Search
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <br />
        <Row>
          <Col>
            <div className="crypto-container">
              {cryptos.length > 0 &&
                cryptos.map((crypto) => <Crypto key={crypto.id} {...crypto} />)}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default HomePage;