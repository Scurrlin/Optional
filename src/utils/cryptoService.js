import tokenService from './tokenService'
const BASE_URL = "/api/cryptos/";

//===================================================================================

const fetchTrendingCryptos = async () => {
  const url = '/api/cryptos/trending';
  try {
    const response = await fetch(url);
    if (response.ok) {
      const trendingCryptos = await response.json();
      return trendingCryptos;
    }
  } catch (err) {
    console.log(err);
  }
}

//===================================================================================

const cryptoSearch = async (search) => {
  const url = `/api/cryptos/search?query=${search}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const cryptoQuery = await response.json();
      return cryptoQuery;
    }
  } catch (err) {
    console.log(err);
  }
};

//===============================================================================

const createSession = async () => {
  const url = `/api/cryptos/session`;
  try {
    const response = await fetch(url);

    if (response.ok) {
      const json = await response.json();
      localStorage.setItem("tmdb_session_id", json.guest_session_id);
    }
  } catch (err) {
    console.log(err);
  }
};

//====================================================================================

const getCryptoDetails = async (cryptoId) => {
  const url = `/api/cryptos/details?id=${cryptoId}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const detailsData = await response.json();
      console.log(detailsData);
      // error handler goes here
      return detailsData;
    }
  } catch (err) {
    console.log(err);
  }
};

//==================ADD TO WATCH LIST ==================================================

function addCryptoToWatchlist(cryptoInfo) {

  return fetch(`/api/users/watchlist/?id=${cryptoInfo.cryptoId}&name=${cryptoInfo.cryptoTitle}&img=${cryptoInfo.cryptoImg}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + tokenService.getToken(), // This grabs thee JWT token out
      // local storage and send its in the header to the server
    },
  }).then((res) => {
    if (res.ok) return res.json();
    throw new Error(res.error);
  });
}

//==========================REMOVE FROM WATCHLIST==============================================

function removeCryptoFromWatchlist(cryptoInfo) {

  return fetch(`/api/users/watchlist/?id=${cryptoInfo.cryptoId}&name=${cryptoInfo.cryptoName}&img=${cryptoInfo.cryptoImg}`, {
    method: 'DELETE',
    headers: {
      Authorization: "Bearer " + tokenService.getToken(),
    }
  }).then((res) => {
    if(res.ok) return res.json();
    throw new Error (res.error)
  });
}

//===============================================================================================


export default {
  createSession,
  fetchTrendingCryptos,
  getCryptoDetails,
  cryptoSearch,
  addCryptoToWatchlist,
  removeCryptoFromWatchlist
};