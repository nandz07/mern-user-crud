import React, { Fragment, useEffect } from 'react'
import Footer from '../Footer/Footer'
// import { Link } from 'react-router-dom'
import AdminHeader from '../Header/AdminHeader'
import './AdminDash.css'
import { Button, Card } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom'
import axios from '../../../utils/axios';
import { verifyAdminTokenn } from '../../../utils/Constants'
import toast from 'react-hot-toast'

function  AdminDash () {
    const navigate = useNavigate()
    useEffect(()=>{
        const token=localStorage.getItem('adminToken')
        if(!token){
            navigate('/admin')
        }else{
            const body=JSON.stringify({token})
            axios.post(verifyAdminTokenn,body,{headers:{"Content-Type":"application/json"}}).then((response)=>{
                if(!response.data.token){
                    toast.error(response.data.message)
                    navigate('/admin')
                }else{
                    toast.success(response.data.message)
                }
            })
        }
    })
    return (
        <>
            <Fragment >
                <AdminHeader />
                <div className='outer d-flex  justify-content-center align-items-center' style={{ minHeight: '80vh' }}>

                    <Card className="card text-center" style={{ width: '50%', height: '40vh' }}>
                        <Card.Header>Admin Dashboard</Card.Header>
                        <Card.Body>
                            <Card.Title>Welcome  </Card.Title>
                            <Card.Text>
                                Access Users details here
                            </Card.Text>
                            <Button variant="outline-secondary" onClick={() => navigate('/admin/users')} >Users</Button>
                        </Card.Body>
                        <Card.Footer className="text-muted">Yoy can update details in Users</Card.Footer>
                    </Card>

                </div>

                <Footer />

            </Fragment>
        </>
    )
}

export default AdminDash