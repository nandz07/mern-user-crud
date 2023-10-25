import axios from '../../../utils/axios'
import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { signUpPost, verifyAdminTokenn } from '../../../utils/Constants';
import { motion } from 'framer-motion'

function AdminaddUsers() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const submitHandler = async (e) => {
        e.preventDefault();
        const body = JSON.stringify({
            userName,
            email,
            password,
            phoneNumber
        })

        if (!userName.trim()) {
            toast.error('Name is required');
        } else if (!email.trim()) {
            toast.error('Email is required');
        } else if (!password.trim() && password.trim().length < 6) {
            toast.error('Password is required and should be at least 6 characters');
        } else if (!phoneNumber.trim() && phoneNumber.length.trim() < 10) {
            toast.error('Phone number is required and should be at least 10 characters');
        } else {
            try {
                let response = await axios.post(signUpPost, body, { headers: { "Content-Type": "application/json" } })
                if (response.data.status === 'ok') {
                    toast.success('New User is Added sucessfully..!')
                    navigate('/admin/users')
                } else {
                    toast.error(response.data.error);
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    useEffect(() => {
        const token = localStorage.getItem('adminToken')
        if (!token) {
            navigate('/admin')
        } else {
            const body = JSON.stringify({ token })
            axios.post(verifyAdminTokenn, body, { headers: { "Content-Type": "application/json" } }).then((response) => {
                if (!response.data.token) {
                    toast.error(response.data.message)
                    navigate('/admin')
                } else {
                    toast.success(response.data.message)
                }
            })
        }
    })

    return (
        <motion.div

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >

            <div className='outer d-flex  justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                <Form className='border p-4  rounded'
                    onSubmit={submitHandler}
                    style={{

                    }}
                >
                    <h2 className='text-white'>Add Details</h2>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter email"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                    </Form.Group>
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

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control
                            type="number"
                            placeholder="Phone number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </Form.Group>



                    <div className="d-grid gap-2 mt-3">
                        <Button variant="outline-light" type='submit' >
                            Add User
                        </Button>
                    </div>
                </Form>
            </div>
        </motion.div>
    )
}

export default AdminaddUsers