import { useContext, useEffect } from 'react';
import socket from '../utils/socket';
import { AuthContext } from '../context/AuthContext';
import { removeItemFromLocalStorage } from '../utils/local-storage';
import { LOCALSTORAGE_TOKEN_KEY } from '../utils/constants';

const useSocketSetup = () => {
  const { setCurrentUser } = useContext(AuthContext);

  useEffect(() => {
    socket.connect();
    socket.on('connect_error', () => {
      setCurrentUser(null);
      removeItemFromLocalStorage(LOCALSTORAGE_TOKEN_KEY);
    })

    return () => {
      socket.off('connect_error');
    }
  }, [setCurrentUser]);
}

export default useSocketSetup;