import React from 'react'

const RoomComponent = ({closeSession}) => {

  const handleLeaveRoom = () => {
    // Delete session ( DO WE NEED TO STORE IT IN DB???)
    closeSession();
  }

  return (
    <button>Close</button>
  )
}

export default RoomComponent