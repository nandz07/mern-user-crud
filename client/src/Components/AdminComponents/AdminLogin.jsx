import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
// import './AdminLogin.css'
import axios from '../../utils/axios';
import toast from 'react-hot-toast';
import { adminPostLogin } from '../../utils/Constants';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion'

function AdminLogin() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleAdminLogin = async (e) => {
        const body = JSON.stringify({
            email,
            password
        });
        e.preventDefault()

        if (!email.trim()) {
            toast.error('Email is required 🥺');
        } else if (!password.trim()) {
            toast.error('Password is required 🥺');
        } else {
            try {
                let response = await axios.post(adminPostLogin, body, { headers: { "Content-Type": "application/json" } });
                console.log(response.data.status)
                if (response.data.status === true) {
                    localStorage.setItem('adminToken', response.data.admin)
                    navigate('/admin/dashboard');
                } else {
                    toast.error(response.data.message);
                }
            } catch (error) {
                console.log(error);
            }
        }

    }
    useEffect(() => {
        const token = localStorage.getItem('adminToken');

        if (token) {
            navigate('/admin/dashboard');
        }
    })

    return (
        <>
            <motion.div

                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
            >

                <div className='outer d-flex  justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                    <Form className='border p-4 rounded'
                        onSubmit={handleAdminLogin}
                    >
                        <h2 className=''>Admin</h2>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email address</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </Form.Group>

                        <div className="d-grid gap-2 mt-3">
                            <Button variant="outline-dark" type='submit' >
                                Login
                            </Button>
                        </div>
                    </Form>
                </div>
            </motion.div>

        </>
    )
}

export default AdminLogin