import React from 'react'

import { Route, Routes, useLocation } from 'react-router-dom'

import { AnimatePresence } from 'framer-motion'
import Login from './UserComponents/Login/Login'
import Home from './UserComponents/Home/Home'
import ProfilePage from '../Pages/UserPages/ProfilePage'
import AdminPage1 from '../Pages/AdminPages/AdminPage1'
import AdminDash from './AdminComponents/Dashboard/AdminDash'
import AdminaddUsers from './AdminComponents/Users/AdminaddUsers'
import Signup from './UserComponents/Signup/Signup'
import Usermanagement from './AdminComponents/Users/Usermanagement'
import UpdateUser from './AdminComponents/Users/UpdateUser'
function AnimatedRoutes() {
    const location = useLocation()
    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
                <Route path="/Profile" element={<ProfilePage />} />
                <Route path="/signup" element={<Signup />} />

                <Route path='/admin' element={<AdminPage1 />} />

                <Route path='/admin/dashboard' element={<AdminDash />} />
                <Route path='/admin/users' element={<Usermanagement />} />
                <Route path='/admin/adminAddUser' element={<AdminaddUsers />} />
                <Route path='/admin/updateUser/:id' element={<UpdateUser />} />


            </Routes>
        </AnimatePresence>

    )
}

export default AnimatedRoutes