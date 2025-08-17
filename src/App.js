import React from 'react'
import UserData from './Components/UserData'
import { ToastContainer } from 'react-toastify'


const App = () => {
  return (
    <div>
      <UserData/>
     <ToastContainer position="top-right" autoClose={2000} />
    </div>
  )
}

export default App
