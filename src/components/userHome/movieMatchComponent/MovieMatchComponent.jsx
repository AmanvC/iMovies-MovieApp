import './movieMatchComponent.scss';
import React, { useState } from 'react'
import CustomInput from '../../custom/customInput/CustomInput';
import CustomButton from '../../custom/customButton/CustomButton';
import { postDataToBackendApi } from '../../../utils/backend-api';
import Loader from '../../loader/Loader';
import RoomComponent from './roomComponent/RoomComponent';

const MovieMatchComponent = () => {
  const [roomData, setRoomData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionID, setSessionID] = useState('');
  const [newSessionLoading, setNewSessionLoading] = useState(false);

  const handleOnChange = (e) => {
    setSessionID(e.target.value);
    setError(null);
  }

  const handleCreateNewSession = () => {
    setRoomData('TEST')
  }

  const handleJoinSession = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try{
      const res = await postDataToBackendApi('/user/movie-match/join', {sessionID});
      setRoomData(res);
      setLoading(false);
    }catch(err){
      setLoading(false);
      setError(err);
      console.log(err);
    }
  }

  const handleLeaveRoom = () => {
    setRoomData(null);
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