const apiUrlPrefix = "https://api.coingecko.com/api/v3"
const apiKey = process.env.APIKEY

//===================================================================

const fetchTrendingCryptos = async (req, res) => {
  const url = `${apiUrlPrefix}/trending/coin/day?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const trendingCryptoData = await response.json();
      res.status(200).json(trendingCryptoData);
    }
  } catch (err) {
    console.log(err);
  }
};

//====================================================================================

const cryptoSearch = async (req, res) => {
  const search = req.query.query
  const url = `https://api.coingecko.com/api/v3/search/coin?api_key=${apiKey}&query=${search}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const cryptoQuery = await response.json();
      res.status(200).json(cryptoQuery)
    }
  } catch (err) {
    console.log(err);
  }
};

//==============================================================================================

const createSession = async (req, res) => {
  const url = `${apiUrlPrefix}/authentication/guest_session/new?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const json = await response.json();
      res.status(200).json(json)
    }
  } catch (err) {
    console.log(err);
  }
};

//===================================================================================

const getCryptoDetails = async (req, res) => {
  let cryptoId = req.query.id;
  const url = `${apiUrlPrefix}/crypto/${cryptoId}?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const detailsData = await response.json();
      console.log(detailsData);
      // error handler goes here
      res.status(200).json(detailsData);
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  fetchTrendingCryptos,
  cryptoSearch,
  createSession,
  getCryptoDetails
};