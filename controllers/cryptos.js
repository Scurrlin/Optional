const apiUrlPrefix = "https://api.coingecko.com/api/v3"
const apiKey = process.env.APIKEY

//===================================================================

const fetchTrendingCoins = async (req, res) => {
  const url = `${apiUrlPrefix}/trending/coin/day?api_key=${apiKey}`;
  try {
    const response = await fetch(url);
    if (response.ok) {
      const trendingCoinData = await response.json();
      res.status(200).json(trendingCoinData);
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
      const movieQuery = await response.json();
      res.status(200).json(movieQuery)
    }
  } catch (err) {
    console.log(err);
  }
};

//==============================================================================================


module.exports = {
  fetchTrendingCoins,
  cryptoSearch,
};