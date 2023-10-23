
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import AdminPage1 from './Pages/AdminPages/AdminPage1'
import AdminDash from './Components/AdminComponents/Dashboard/AdminDash'
import Usermanagement from './Components/AdminComponents/Users/Usermanagement'
import AdminaddUsers from './Components/AdminComponents/Users/AdminaddUsers'



import Home from './Pages/UserPages/HomePage'
import Login from './Pages/UserPages/LoginPage'
import ProfilePage from './Pages/UserPages/ProfilePage'
import Signup from './Pages/UserPages/SignupPage'


function App() {
  return (

    <Router>
      <Toaster position='bottom-right' toastOptions={{ duration: 2000 }} />
      <Routes>
        <Route exact path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/Profile" element={<ProfilePage />} />
        <Route path="/signup" element={<Signup />} />

        <Route path='/admin' element={<AdminPage1 />} />

        <Route path='/adminHome' element={<AdminDash />} />
        <Route path='/users' element={<Usermanagement />} />
        <Route path='/adminAddUser' element={<AdminaddUsers/>}/>
        {/* <Route path='/updateUser/:id' element={<UpdateUser/>} /> */}


      </Routes>
    </Router>


  )
}

export default App