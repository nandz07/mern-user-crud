
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'


import AnimatedRoutes from './Components/AnimatedRoutes'


function App() {

  return (

    <Router>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <AnimatedRoutes />
    </Router>


  )
}

export default App