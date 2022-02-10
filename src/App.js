import { Routes, Route } from 'react-router-dom'

import { LayoutContextProvider } from './context/LayoutContext'
import Layout from './components/Layout'
import Index from './components/Index'
import Cajeros from './components/Cajeros'

function App() {
  return (
    <LayoutContextProvider>
      <Layout>
        <Routes>
          <Route path='/cajeros' element={<Cajeros />} />
          <Route path='/' element={<Index />} />
        </Routes>
      </Layout>
    </LayoutContextProvider>
  )
}

export default App
