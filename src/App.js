import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { LayoutContextProvider } from './context/LayoutContext'
import Login from './components/Login'
import Layout from './components/Layout'
import Index from './components/Index'
import Cajeros from './components/Cajeros'
import Intereses from './components/Intereses'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return (
    <LayoutContextProvider>
      {isLoggedIn ? (
        <Layout setIsLoggedIn={setIsLoggedIn}>
          <Routes>
            <Route path='/cajeros' element={<Cajeros />} />
            <Route path='/intereses' element={<Intereses />} />
            <Route path='/' element={<Index />} />
          </Routes>
        </Layout>
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </LayoutContextProvider>
  )
}

export default App
