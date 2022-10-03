// import React from "react";
import { useState, useEffect } from "react";
import { useHistory, Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import * as userService from "../../utils/users-service";
import AsyncSelect from "react-select/async";
import * as coinsAPI from "../../utils/coins-api";
import "./Navv.css";

export default function Navv({ user, setUser }) {
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [options, setOptions] = useState([]);
  let history = useHistory();

  useEffect(() => {
    async function getCoins() {
      const defaultList = await coinsAPI.getDefault();
      setDefaultOptions(defaultList);
      const searchList = await coinsAPI.getSearch();
      setOptions(searchList);
    }
    getCoins();
  }, []);
  function handleLogOut() {
    userService.logOut();
    setUser(null);
  }

  const filterColors = (inputValue) => {
    return options.filter((i) =>
      i.label.toLowerCase().includes(inputValue.toLowerCase())
    );
  };

  const handleSelect = (inputValue) =>
    new Promise((resolve) => {
      setTimeout(() => {
        resolve(filterColors(inputValue));
      }, 1000);
    });

  function handleChange(e) {
    history.push(`/details/${e.value}`);
  }

  const Large = ({ children }) => {
    const isDesktop = useMediaQuery({ minWidth: 580 });
    return isDesktop ? children : null;
  };

  const Mobile = ({ children }) => {
    const isMobile = useMediaQuery({ maxWidth: 579 })
    return isMobile ? children : null
  }

  return (
    <div className="Navv">
      <Large>
        <div className="top-title">
          <h2>💎&nbsp;Crypt0Watch&nbsp;💎</h2>
          <div>
            {user ? (
              <>
                <span>Logged in as: {user.name} </span>
                <span className="logout">
                  <Link to="" onClick={handleLogOut}>
                    (Log Out)
                  </Link>
                </span>
              </>
            ):(
              <Link to="/auth">
                    (Register/Login)
                  </Link>
            )}
          </div>
        </div>
        <nav>
          <div className="nav-L">
            <Link to="/">Home</Link>
            &nbsp; | &nbsp;
            <Link to="/watchlist">Watchlist</Link>
          </div>
          <div className="nav-R">
            <AsyncSelect
              className="select-bar"
              cacheOptions
              defaultOptions={defaultOptions}
              loadOptions={handleSelect}
              onChange={handleChange}
            />
          </div>
        </nav>
      </Large>


      <Mobile>
        <div className="top-title">
          <h2>💎&nbsp;Crypt0Watch&nbsp;💎</h2>
        </div>
        <nav>
          <div >
            <Link to="/">Home</Link>
            &nbsp; | &nbsp;
            <Link to="/watchlist">Watchlist</Link>
            {user ? (
              <>
                &nbsp; | &nbsp;
                {user.name} <Link to="" onClick={handleLogOut}>(Log Out)</Link>
              </>
            ):(
              <>
              &nbsp; | &nbsp;
              <Link to="/auth">
                    (Register/Login)
                  </Link>
              </>
            )}
          </div>
          <div >
            <AsyncSelect
              className="select-bar"
              cacheOptions
              defaultOptions={defaultOptions}
              loadOptions={handleSelect}
              onChange={handleChange}
            />
          </div>
        </nav>
      </Mobile>
    </div>
  );
}