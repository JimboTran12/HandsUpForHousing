import { useState } from 'react'
import './App.css'
import UserRegister from './components/UserRegister'
import UserConfirm from './components/UserConfirm'
import UserLogin from './components/UserLogin'

function App() {

  return (
    <>
      <UserRegister />
      <UserConfirm />
      <UserLogin />
    </>
  )
}

export default App
