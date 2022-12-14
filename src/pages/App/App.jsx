import { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getUser } from '../../utils/users-service';
import AuthPage from '../AuthPage/AuthPage';
import Index from '../Index/Index';
import Navv from '../../components/Navv/Navv';
import CoinDetailsPage from '../CoinDetailsPage/CoinDetailsPage'
import WatchlistPage from '../WatchlistPage/WatchlistPage'
import './App.css';
import WatchlistDetailsPage from '../WatchlistDetailsPage/WatchlistDetailsPage';
import WatchlistAddPage from '../WatchlistAddPage/WatchlistAddPage';
import Loading from '../../components/Loading/Loading'
import ScrollToTop from '../../components/ScrollToTop/ScrollToTop'

export default function App() {
	const [user, setUser] = useState(getUser());
	// const [coins, setCoins] = useState([]);
	const [loading, setLoading] = useState(false)

	// useEffect(() => {
	// 	history.push('/')
	// }, [history, user]);

	// useEffect(() => {
	// 	async function getCoins() {
	// 		console.log('ello mate');
	// 		const coinList = await coinsAPI.getAll();
	// 		console.log('coinList is => ',coinList)
	// 		setCoins(coinList)
	// 	}
	// 	getCoins();
	// }, []);

	return (
		<main className='App'>
			{user ? (
				<>
					<Navv user={user} setUser={setUser} />
					<ScrollToTop />
					<Switch>
						<Route exact path="/">
							<Index setLoading={setLoading} user={user}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/details/:id'>
							<CoinDetailsPage setLoading={setLoading} user={user}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/watchlist'>
							<WatchlistPage user={user} setLoading={setLoading}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/watchlist/:id'>
							<WatchlistDetailsPage user={user} setLoading={setLoading}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/watchlist/add/:id'>
							<WatchlistAddPage user={user} setLoading={setLoading}/>
							{loading ? <Loading /> : null}
						</Route>
						<Redirect to='/' />
					</Switch>
				</>
			) : (
				// <AuthPage setUser={setUser} />
				<>
					<Navv user={user} setUser={setUser} />
					<ScrollToTop />
					<Switch>
						<Route exact path="/">
							<Index setLoading={setLoading} user={user}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/details/:id'>
							<CoinDetailsPage setLoading={setLoading} user={user}/>
							{loading ? <Loading /> : null}
						</Route>
						{/* <Route exact path='/watchlist'>
							<WatchlistPage user={user} setLoading={setLoading}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/watchlist/:id'>
							<WatchlistDetailsPage user={user} setLoading={setLoading}/>
							{loading ? <Loading /> : null}
						</Route>
						<Route exact path='/watchlist/add/:id'>
							<WatchlistAddPage user={user} setLoading={setLoading}/>
							{loading ? <Loading /> : null}
						</Route> */}
						<Route exact path='/auth'>
							<AuthPage setUser={setUser} />
						</Route>
						<Redirect to='/auth' />
					</Switch>
				</>
			)}
		</main>
	);
}