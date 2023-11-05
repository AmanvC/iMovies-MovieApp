import React from 'react';
import useSocketSetup from '../../hooks/useSocketSetup';

const UserHome = () => {
  useSocketSetup();

  return (
    <div>User Home Component</div>
  )
}

export default UserHome;