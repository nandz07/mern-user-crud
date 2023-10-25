import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Login.css'
import { Form, Button } from 'react-bootstrap';
import { LoginPost } from '../../../utils/Constants';
import axios from '../../../utils/axios';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion'

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        const body = JSON.stringify({
            email,
            password
        })
        e.preventDefault();
        if (!email.trim()) {
            toast.error('Email is required 🥺');
        } else if (!password.trim()) {
            toast.error('Password is required 🥺');
        } else {
            try {
                // alert(LoginPost)
                let user = await axios.post(LoginPost, body, { headers: { "Content-Type": "application/json" } })

                if (user.data.user) {
                    localStorage.setItem('token', user.data.user)
                    console.log(user.data, "thisis loginndata")
                    navigate('/home');
                    toast('Welcome !', {
                        icon: '😍😍😍',
                    });
                } else {
                    toast.error(user.data.error, {
                        icon: '🥺',
                    });
                }


            } catch (err) {
                console.log(err)
            }
        }

    }

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            navigate('/home');
        }
    })


    return (

        <motion.div

            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            <div className='outer d-flex  justify-content-center align-items-center' style={{
                minHeight: '100vh',
            }}>
                <Form className='border p-4  rounded'
                    onSubmit={handleSubmit}
                >
                    <h2 className='text-white'>Login</h2>
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
                        <Link to='signup' className='link'>Create an account</Link>
                    </div>

                </Form>
            </div>
        </motion.div>
    )
}

export default Login