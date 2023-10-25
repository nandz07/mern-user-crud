import React, { useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import axios from '../../../utils/axios'
import { signUpPost } from '../../../utils/Constants';


function Signup() {
    const navigate = useNavigate();
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            if (!userName.trim()) {
                toast.error('Name is required');
            } else if (!email.trim()) {
                toast.error('Email is required');
            } else if (password.trim().length < 6) {
                toast.error('Password is required and should be at least 6 characters');
            } else if (phoneNumber.trim().length < 10) {
                toast.error('Phone number is required and should be at least 10 characters');
            } else {

                const body = JSON.stringify({
                    userName,
                    email,
                    password,
                    phoneNumber
                })
                let response = await axios.post(signUpPost, body, { headers: { "Content-Type": "application/json" } })
                if (response.data.status === 'ok') {
                    toast.success('Registration successfully completed');
                    console.log(response.data);
                    navigate('/')
                } else  {
                    toast.error(response.data.error);
                    console.log("some error")
                }
            }
        } catch (error) {

        }

    }
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (token) {
            navigate('/home');
        }
    })
    return (
        <div className='outer d-flex  justify-content-center align-items-center' style={{
            minHeight: '100vh',
        }}>
            <Form className='border p-4  rounded'
                onSubmit={handleSubmit}
            >
                <h2 className='text-white'>Sign Up</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        className='placeHolder'
                        type="text"
                        placeholder="Enter name"
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

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Phone number"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                </Form.Group>
                <div className="d-grid gap-2 mt-3">
                    <Button type='submit' variant="outline-dark" >
                        Register
                    </Button>
                    <Link to='/' className='link'>Already have an account</Link>
                </div>

            </Form>
        </div>
    )
}

export default Signup