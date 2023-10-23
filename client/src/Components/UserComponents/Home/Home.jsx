import React, { useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import {  useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Redux/usernameReducer';
import { verifyUserToken } from '../../../utils/Constants';
import axios from '../../../utils/axios';



function Home() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/');
        } else {
            const body = JSON.stringify({ token });

            axios.post(verifyUserToken, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
                console.log(res.data.userCheck)
                const {name,pic,_id}=res.data.userCheck
                console.log("🚀🚀🚀 res  -  " + res.data.message)
                dispatch(login( { name: name, id: _id, image: pic }))
            })
        }
    }, [navigate, dispatch])
    const userName = useSelector((state) => state.user.value);
    
    
    return (
        <>
            <div className='outer d-flex  justify-content-center align-items-center' style={{
                minHeight: '100vh',
            }}>
                <Card className="text-center" style={{width:'50%',height:'40vh'}}>
                    <Card.Header>Home Page</Card.Header>
                    <Card.Body>
                        <Card.Title>Welcome {userName.name} </Card.Title>
                        <Card.Text>
                            Access your profile here 
                        </Card.Text>
                        <Button variant="outline-secondary" onClick={()=>navigate('/profile')} >My profile</Button>
                    </Card.Body>
                    <Card.Footer className="text-muted">Yoy can update details in My profile</Card.Footer>
                </Card>
            </div>
        </>
    )
}

export default Home