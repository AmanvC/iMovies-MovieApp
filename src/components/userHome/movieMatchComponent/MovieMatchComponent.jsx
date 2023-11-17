import './movieMatchComponent.scss';
import React, { useEffect, useState } from 'react'
import CustomInput from '../../custom/customInput/CustomInput';
import CustomButton from '../../custom/customButton/CustomButton';
import { postDataToBackendApi } from '../../../utils/backend-api';
import Loader from '../../loader/Loader';
import RoomComponent from './roomComponent/RoomComponent';
import { getItemFromLocalStorage, removeItemFromLocalStorage, setItemInLocalStorage } from '../../../utils/local-storage';
import { LOCALSTORAGE_SESSION_ID } from '../../../utils/constants';
import toast from "react-hot-toast";

const MovieMatchComponent = () => {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionID, setSessionID] = useState('');
  const [newSessionLoading, setNewSessionLoading] = useState(false);

  // ADD JOINED SESSION ID TO LOCAL STORAGE SO IF USER RELOADS, HE CAN RECONNECT

  useEffect(() => {
    console.log("RELOADED");
    console.log("TEST", getItemFromLocalStorage(LOCALSTORAGE_SESSION_ID))
  }, [])

  const handleOnChange = (e) => {
    setSessionID(e.target.value);
    setError(null);
  }

  const createRandomSessionID = () => {
    let res = '';
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for(let i=0; i<=5; i++){
      res += characters.charAt(Math.floor(Math.random()*characters.length));
    }
    return res;
  }

  const handleCreateNewSession = async() => {
    const id = createRandomSessionID();
    setNewSessionLoading(true);
    try{
      const res = await postDataToBackendApi('/user/movie-match/create', {sessionID: id});
      if(res.success){
        setRoomData(res.data);
        addSessionToLocalStorage(id);
      }else{
        toast.error(res.message);
      }
      setNewSessionLoading(false);
    }catch(err){
      setNewSessionLoading(false);
      toast.error(err);
    }
  }

  const handleJoinSession = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try{
      const res = await postDataToBackendApi('/user/movie-match/join', {sessionID});
      setRoomData(res.data);
      setLoading(false);
      addSessionToLocalStorage(sessionID);
    }catch(err){
      setLoading(false);
      setError(err);
    }
  }

  const handleLeaveRoom = () => {
    setRoomData(null);
    removeItemFromLocalStorage(LOCALSTORAGE_SESSION_ID);
  }

  const addSessionToLocalStorage = (id) => {
    setItemInLocalStorage(LOCALSTORAGE_SESSION_ID, id);
  }

  if(newSessionLoading){
    return <Loader />
  }

  return (
    <>
      {roomData ? 
        <RoomComponent
          closeSession={handleLeaveRoom}
        /> 
      : (
        <div className="movie_match_component">
          <div className="action_card" onClick={handleCreateNewSession}>
            <h1>Create</h1>
            <p>Create a new session.</p>
          </div>
          <div className="action_card">
            <div className="title">
              <h1>Join</h1>
              <p>Join a session.</p>
            </div>
            <div className="id_input">
              <CustomInput
                inputType={'text'}
                placeholder={'Enter SIX DIGIT Session ID'}
                value={sessionID}
                onChange={handleOnChange}
              />
              <CustomButton
                text={'Join Session'}
                type={'SECONDARY'}
                width={'100%'}
                disabled={sessionID.length !== 6}
                onClick={handleJoinSession}
                loading={loading}
              />
              {error && (
                <p className='error_message'>{error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default MovieMatchComponent;