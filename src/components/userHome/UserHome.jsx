import "./userHome.scss";
import React from 'react';
import UserDetails from "./userDetails/UserDetails";
import MovieMatchComponent from "./movieMatchComponent/MovieMatchComponent";
import useSocketSetup from '../../hooks/useSocketSetup';

const UserHome = () => {
  useSocketSetup();

  return (
    <div className="user-home-container">
      <UserDetails />
      <MovieMatchComponent />
    </div>
  )
}

export default UserHome;