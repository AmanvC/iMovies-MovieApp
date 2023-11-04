import "./userHome.scss";
import React from 'react';
import UserDetails from "./userDetails/UserDetails";
import MovieMatchComponent from "./movieMatchComponent/MovieMatchComponent";

const UserHome = () => {

  return (
    <div className="user-home-container">
      <UserDetails />
      <MovieMatchComponent />
    </div>
  )
}

export default UserHome;