import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import * as sessionActions from '../../store/session';
import './navigation.css'

function ProfileButton({ user }) {
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

  return (
    <>
       <img className = "button" onClick={openMenu}src="https://img.icons8.com/material-rounded/24/000000/menu--v1.png" alt="menu--v1"></img>
      {showMenu && (
        <div className="profile-dropdown">
          <div>My Spots</div>
          <div>Wishlist</div>
          <button className = 'menu-button' onClick={logout}>Log Out</button>
        </div>
      )}
    </>
  );
}

export default ProfileButton;
