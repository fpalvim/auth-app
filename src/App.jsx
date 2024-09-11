import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import LoginPage from './components/pages/LoginPage'
import { Routes, Route } from 'react-router-dom'
import Protected from './components/pages/Protected'
import ProtectedComponent from './components/pages/ProtectedComponent'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
        <Route path="/protected" element={<Protected><ProtectedComponent/></Protected>}></Route>
      </Routes>
    </>
  )
}

export default App
