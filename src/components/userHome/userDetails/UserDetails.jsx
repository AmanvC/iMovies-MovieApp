import './userDetails.scss';
import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext';

const UserDetails = () => {

  const {currentUser} = useContext(AuthContext);

  return (
    <div className="user-details-container">
      <h2 className="user-display-name">{currentUser.name}</h2>
      <h4 className="user-username">@{currentUser.username}</h4>
    </div>
  )
}

export default UserDetails;