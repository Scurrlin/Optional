const Watchlist = require("../../models/watchlist");
const Coin = require("../../models/coin")

module.exports = {
  index,
  getFavs,
  create,
  update,
  addCoin,
  getOne,
  deleteOne,
  deleteCoin,
};

async function index(req, res, next) {
  const watchlistList = await Watchlist.find({user: req.user._id});
  const arr = []
  watchlistList.forEach((watchlist, idx) =>
    watchlist.coins.forEach((coin, idx) =>
      arr.push(coin.id)))
  const uniqueArray = [...new Set(arr)];
  if (uniqueArray.length !== 0) {
    const coinList = await Coin.getMultiplePrice(uniqueArray.join('%2C'))
    watchlistList.forEach((watchlist, idx1) =>
      watchlist.coins.forEach((coin, idx2) =>
        watchlistList[idx1].coins[idx2] = {
          ...coin,
          ...coinList[`${coin.id}`]
        }))
  }
  res.json(watchlistList)
}

async function getFavs(req,res, next) {
  try{
    const watchlistList = await Watchlist.find({user: req.user._id});
    const arr = []
    watchlistList.forEach((watchlist, idx) =>
      watchlist.coins.forEach((coin, idx) =>
        arr.push(coin.id)))
    const uniqueArray = [...new Set(arr)];
    if (uniqueArray.length !== 0) {
      res.json({success:true, uniqueArray})
    } else {
      res.json({success:false})
    }
  } catch(err) {
    res.json(err)
  }
}

async function getOne(req, res, next) {
  const watchlist = await Watchlist.findById(req.params.id)
  if (String(watchlist.user) !== String(req.user._id)) {
    return res.json({error: "invalid user"})
  }
  const arr = []
    watchlist.coins.forEach((coin, idx) => arr.push(coin.id))
    const uniqueArray = [...new Set(arr)];
    if (uniqueArray.length !== 0) {
      const coinList = await Coin.getMultiplePrice(uniqueArray.join('%2C'))
      watchlist.coins.forEach((coin, idx) =>
        watchlist.coins[idx] = {
          ...coin,
          ...coinList[`${coin.id}`]
      })
    }
  res.json(watchlist)
}

async function create(req, res, next) {
  const data = {
    "user" : req.user._id,
    ...req.body
  }
  const watchlist= await Watchlist.find({user: req.user._id});
  if (watchlist.length === 0) {
    data.isDefault = true
  }
  const createdWatchlist = await Watchlist.create(data);
  res.json(createdWatchlist)
}

async function update(req, res, next) {
  const id = req.params.id;
  const data = req.body;
  const many = await Watchlist.updateMany({"user": req.user._id}, {$set: {"isDefault":false}})
  const updatedWatchlist = await Watchlist.findByIdAndUpdate(id, data, {new:true})
  res.json({ success: true, updatedWatchlist })
}

async function addCoin(req, res, next) {
  try {
    const id = req.params.id;
    const cid = req.params.cid;
    const test = `coins.${cid}`
    const addedCoin = await Watchlist.findOneAndUpdate({_id: id, 'coins.id': {$ne: cid}}, {$push: {"coins": {"id": cid, "quantity":Number(req.body.quantity)}}},{ returnOriginal: false })
    const addedQuantity = await Watchlist.findOneAndUpdate({_id: id, "coins.id": cid}, {$set: {"coins.$.quantity": Number(req.body.quantity)}},{ returnOriginal: false })
    res.json({success:true, addedQuantity})
  } catch(err) {
    res.send(err)
  }
}

async function deleteOne(req, res, next) {
  try{
    const id = req.params.id;
    const removedWatchlist = await Watchlist.findByIdAndRemove(id)
    res.json({ success: true, removedWatchlist })
  } catch(err) {
    res.send(err)
  }
}

async function deleteCoin(req, res, next) {
  try{
    const data = req.body
    const removedCoin = await Watchlist.findByIdAndUpdate(
      { _id: data.watchlistId }, 
      { $pull: { 'coins': {"id": data.coinId} } }, {new : true});
    res.json({ success: true, removedCoin })
  } catch(err) {
    res.send(err)
  }
}