import React, { useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { getUser } from '../../utils/users-service';
import AuthPage from '../AuthPage/AuthPage';
import Index from '../Index/Index';
import CoinDetailsPage from '../CoinDetailsPage/CoinDetailsPage'
import WatchlistPage from '../WatchlistPage/WatchlistPage'
import './App.css';
import WatchlistDetailsPage from '../WatchlistDetailsPage/WatchlistDetailsPage';
import WatchlistAddPage from '../WatchlistAddPage/WatchlistAddPage';
import Loading from '../Components/Loading/Loading'
import ScrollToTop from '../Components/ScrollToTop/ScrollToTop'
import NavBar from '../Components/NavBar/NavBar';

export default function App() {
	const [user, setUser] = useState(getUser());
	const [loading, setLoading] = useState(false)

	return (
		<main className='App'>
			{user ? (
				<>
					<NavBar user={user} setUser={setUser} />
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
					<NavBar user={user} setUser={setUser} />
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