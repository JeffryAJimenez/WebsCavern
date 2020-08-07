import React, { Fragment } from "react";
import { Link } from "react-router-dom";

import { useQuery, useApolloClient } from "@apollo/client";
import { IsUserLoggedInQuery } from "../../queries/client_quieres";
import { isLoggedInVar } from "../../cache";

const Navbar = () => {
  const { data } = useQuery(IsUserLoggedInQuery);

  return (
    <header id='main_header'>
      <div id='header_box'>
        <h1>WeebsCarvern</h1>

        <form id='search_form'>
          <input id='search_bar' type='search' placeholder='search'></input>
          <i className='fa fa-search'></i>
        </form>
      </div>

      <div className='clr'></div>

      <ul id='header_nav'>
        {data.isLoggedIn ? (
          <Fragment>
            <li>
              <a href='/PostsScreen.html'>Posts</a>
            </li>
            <li>
              <a href='CollectionsScreen.html'> Collection</a>
            </li>
            <li>
              <a href='UsersScreen.html'>Users</a>
            </li>
            <li>
              <a>Tags</a>
            </li>
            <li>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  isLoggedInVar(false);
                }}
              >
                LogOut
              </button>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li>
              <a href='/PostsScreen.html'>Posts</a>
            </li>
            <li>
              <a href='CollectionsScreen.html'> Collection</a>
            </li>
            <li>
              <a href='UsersScreen.html'>Users</a>
            </li>
            <li>
              <a>Tags</a>
            </li>
            <li>
              <Link to='Login'>Login</Link>
            </li>
            <li>
              <Link to='/Register'>Register</Link>
            </li>
          </Fragment>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
