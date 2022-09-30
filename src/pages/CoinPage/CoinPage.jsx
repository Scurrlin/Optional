import React, { useState, useEffect } from "react";
import Movie from "../../components/Movie/Movie";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Navbar from "../../components/Navbar/Navbar";
import UserService from "../../utils/userService";
import MovieService from "../../utils/movieService";
import "./MovieDetail.css";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";

const MovieDetails = ({ user, handleLogout }) => {
  const [movie, setMovie] = useState("");
  const [movieReviews, setMovieReviews] = useState()
  const [userProfile, setUserProfile] = useState("");
  const [loading, setLoading] = useState(true)
  const [alreadyWatched, setAlreadyWatched] = useState(false)

  const TMDBImgUrl = "https://image.tmdb.org/t/p/w1280";

  const { id } = useParams();

  //==============================================================================

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const movieDetail = await MovieService.getMovieDetails(id);
      setLoading(false)
      console.log(movieDetail, "<---MOVIE DETAILS");
      setMovie(movieDetail);
    };
    fetchMovieDetails();
    const getUserProfile = async () => {
      const profile = await UserService.getProfile();
      console.log(profile, "<---profile");
      if (profile.data.watchlistMovies.find(((w => w.movieId === id)))){
        setAlreadyWatched(true);
      }
      setLoading(false)
      setUserProfile(profile);
    };    
    getUserProfile();
  }, []);

  //================================================================================
    //======== ADD TO WATCHLIST =======================

    const handleAddToWatchlist =  (movie) => {
      return (e) => {
        e.preventDefault();
        addToWatchlist(movie)
        setAlreadyWatched(true);
       };
    }

    async function addToWatchlist(movie) {
      const movieInfo = {
        movieId: movie.id,
        movieTitle: movie.title,
        movieImg : `${TMDBImgUrl}${movie.poster_path}`
      }
      try {
        const response = await MovieService.addToWatchlist(movieInfo);
        console.log(response, "from add to watchlist movieservice");
      } catch (err) {
        console.log(err, " err from server");
      }
    }

    


  // useEffect(() => {
  //   const getMovieReviews = async () => {
  //     const reviews = await MovieService.getMovieReviews();
  //     // console.log(movies, "<-- from fetch trending movies");
  //     setLoading(() => false);
  //     setMovieReviews(reviews.results);
  //     console.log(reviews, '<---reviews')
  //   };
  //   getMovieReviews();
  // }, []);

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
            <img className="detailsImg" src={TMDBImgUrl + movie.poster_path} alt={movie.title}></img>
          </Col>
          <Col>
            <ul>
              <li className="movieInfo">
                <span className="movieInfoTitles">TITLE: </span>
                {movie.title}
              </li>
              <br/>
              <li className="movieInfo">
                <span className="movieInfoTitles">OVERVIEW: </span>
                {movie.overview}
              </li>
              <br/>
              <li className="movieInfo">
                <span className="movieInfoTitles">RELEASE DATE: </span>
                {movie.release_date}
              </li>
              <br/>
              { alreadyWatched &&
              <Button disabled={alreadyWatched} onClick={handleAddToWatchlist(movie)} variant="success">Added to your watch list!</Button>
              }
              { !alreadyWatched &&
              <Button disabled={alreadyWatched} onClick={handleAddToWatchlist(movie)} variant="success">Add to your watch list</Button>
              }

            </ul>
            
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default MovieDetails;