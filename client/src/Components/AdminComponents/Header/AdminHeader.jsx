import React from 'react'
import './AdminHeader.css';
import { Link, useNavigate } from 'react-router-dom';

function AdminHeader() {
const navigate=useNavigate()
  const logoutHandle=(e)=>{
    e.preventDefault()
    localStorage.clear();
    navigate('/admin')
  }
  return (
    <>
    <nav class="navbar navbar-expand-lg adminHeadernav ">
    <div class="container-fluid">
      <Link class="navbar-brand" to="/admin/dashboard" style={{color:""}} >WELCOME ADMIN</Link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            
          </li>
          <li class="nav-item">
           
          </li>
          <li class="nav-item dropdown">
           
            <ul class="dropdown-menu">
             
            </ul>
          </li>
          <li class="nav-item">
            
          </li>
        </ul>
        <form class="d-flex" >
         
          <button class="adminLogoutBtn" onClick={logoutHandle} >Logout</button>
        </form>
      </div>
    </div>
  </nav>
    </>
  )
}

export default AdminHeader