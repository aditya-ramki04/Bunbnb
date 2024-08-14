import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import { NavLink } from "react-router-dom";
import { useSelector } from 'react-redux';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './navigation.css'

function ProfileButton({ user }) {
  const sessionUser = useSelector(state => state.session.user);
  let userProfileButton;

  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  if(sessionUser){
    userProfileButton = (
      <>
       <img className = "button" onClick={openMenu}src="https://img.icons8.com/material-rounded/24/000000/menu--v1.png" alt="menu--v1"></img>
      {showMenu && (
        <div className="profile-dropdown">
          <NavLink className = 'nav-link' to='spots/current'>
          <button className = 'menu-button success'>My Spots</button>
          </NavLink>
         <button className = 'menu-button success'>Wishlist</button>
          <button className = 'menu-button success' onClick={logout}>Log Out</button>
        </div>
      )}
    </>
    )
  }
  else{
    userProfileButton = (
      <>
       <img className = "button" onClick={openMenu}src="https://img.icons8.com/material-rounded/24/000000/menu--v1.png" alt="menu--v1"></img>
      {showMenu && (
        <div className="profile-dropdown">
          <LoginFormModal/>
          <SignupFormModal />
        </div>
      )}
    </>
    )
  }
  return (
    <div>{userProfileButton}</div>
  );
}

export default ProfileButton;
