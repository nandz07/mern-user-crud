import React, { useEffect, useState } from 'react'
import { Card, Row } from 'react-bootstrap'
import Footer from '../Footer/Footer'
import AdminHeader from '../Header/AdminHeader'
import { useNavigate, useParams } from 'react-router-dom'
import { adminEditUser, adminUpdateUser, verifyAdminTokenn } from '../../../utils/Constants'
import axios from '../../../utils/axios';
import toast from 'react-hot-toast'


function UpdateUser() {
    const params = useParams();
    const navigate = useNavigate()
    const [userName,setUserName]= useState('');
    const [email, setEmail] = useState('')
    const [image, setImage] = useState('')
    

    
    useEffect(() => {
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
                    axios.get(`${adminEditUser}/${params.id}`).then((res) => {
                        console.log(res.data.userData);
                        setEmail(res.data.userData.email);
                        setUserName(res.data.userData.name);
                        setImage(res.data.userData.pic);
                    }).catch((err) => {
                        alert(err)
                    })
                }
            })
        }
        
    },[params.id,navigate])

    const updateUserDetails=async(e)=>{
        const body={userName:userName,email:email,id:params.id}
        if (!userName.trim()) {
            toast.error('Name is required');
        } else if (!email.trim()) {
            toast.error('Email is required');
        }  else {
            axios.put(`${adminUpdateUser}/${params.id}`,body, { headers: { "Content-Type": "application/json" } }).then((response)=>{
                if(response.data.userExists){
                    toast.error(response.data.message);
                }else{
                    toast.success(response.data.message);
                    navigate('/admin/users')
                }
            })
        }
    }

    return (
        <>
            <AdminHeader />

            <div className='outer d-flex  justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
                <Row>
                    <Card style={{ width: '60rem' }}>
                        <Card.Body>

                            <div class="container rounded bg- mt-2 mb-5 profilepage">
                                <div class="row">
                                    <div class="col-md-4 border-right">
                                        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                                            <img class="rounded-circle mt-5" width={150} src={image} alt="" />

                                            <span class="text-black-50"></span>
                                            <span>




                                                <button type="button" class="btn mt-3 btn-outline-secondary"
                                                onClick={()=>updateUserDetails()}
                                                >
                                                    Update User details
                                                </button>


                                            </span></div>
                                    </div>
                                    <div class="col-md-8 border-right">
                                        <div class="p-3 py-5">
                                            <div class="d-flex justify-content-between align-items-center mb-3">
                                                <h4 class="text-right">Profile Settings</h4>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-md-6"><label class="labels">Name</label><input class="form-control" 
                                                value={userName} onChange={(e) => setUserName( e.target.value )}  /></div>

                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-6"><label class="labels">Email</label><input class="form-control"
                                                 value={email}  onChange={(e) => setEmail( e.target.value )} /></div>

                                            </div>
                                            
                                            

                                        </div>
                                    </div>
                                    <div class="col-md-4">

                                    </div>
                                </div>
                            </div>
                        </Card.Body>
                    </Card>
                </Row>
            </div>
            <Footer />

        </>
    )
}

export default UpdateUser