import React from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import ProfileButton from './ProfileButton';
import LoginFormModal from '../LoginFormModal';
import SignupFormModal from '../SignupFormModal';
import './navigation.css'

function Navigation({ isLoaded }){
  const sessionUser = useSelector(state => state.session.user);

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <ProfileButton user={sessionUser} />
    );
  } else {
    sessionLinks = (
      <>
        <LoginFormModal />
        <SignupFormModal />
      </>
    );
  }

  return (
      <nav className = 'navbar'>
        <NavLink style={{textDecoration: 'none'}} className = 'logo' exact to="/">bunbnb</NavLink>
        <div className = 'create-spot-button'>
          <NavLink to="/host" className="nav-link-button">
            Bunbnb Your Home
          </NavLink>
          </div>
        <div className = 'profile'>{isLoaded && sessionLinks}</div>
      </nav>

  );
}

export default Navigation;
