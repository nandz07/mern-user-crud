import React from 'react'
import AdminHeader from '../Header/AdminHeader'
import Footer from '../Footer/Footer'
import users from './data'
import { useNavigate } from 'react-router-dom'
import './users.css'
import {  Card, Container, Row } from 'react-bootstrap'

function Usermanagement() {
    const navigate=useNavigate()
  return (
    <div >
            <AdminHeader />
            <Container className='outer d-flex  justify-content-center align-items-center' style={{ minHeight: '60vh' }}>
                    <Row>
                        <Card style={{ width: '40rem' }}>
                        <br/>
            
            <br/>
            <input class="form-control mb-3 w-25 searchadmin"  name="query" type="search" placeholder="Search" aria-label="Search"/>
                <button class=" addButtonAdmin" onClick={()=>navigate('/adminAddUser')} style={{ maxWidth: '10vh' }} >add</button>
           
            <table id="customers">
                <tr>
                    <th class="w-5">No</th>
                    <th>User Name</th>
                    <th>Emaiil</th>
                    <th>Action</th>
                    <th>Action</th>
                </tr>
               
                  {  users.map((obj,index)=>
                   <tr>
                    <td>{index+1}</td>
                    <td>{obj.userName}</td>
                    <td>{obj.email}</td>
                    <td>
                        <button className='editt' onClick={()=>navigate(`/updateUser/${obj._id}`)} >Edit</button>
                    </td>
                    <td> 
                        <button className='deletee' >Delete</button>
                    </td>
                    </tr>
                  )}

                

            </table>
                        </Card>
                    </Row>
                </Container>
            <Footer />
        </div>
  )
}

export default Usermanagement