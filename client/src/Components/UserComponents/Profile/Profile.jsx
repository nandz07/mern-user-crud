import React, { useEffect, useState } from 'react'
import Header from '../Home/Header'
import { Card, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { imageUpload, verifyUserToken } from '../../../utils/Constants'
import axios from '../../../utils/axios';
import Swal from 'sweetalert2';
import { login, updateImage } from '../../../Redux/usernameReducer'


function Profile() {
    const userName = useSelector((state) => state.user.value)
    console.log(userName);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [image, setImage] = useState('')

    useEffect(() => {

        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/');

        } else {
            const body = JSON.stringify({ token });

            axios.post(verifyUserToken, body, { headers: { "Content-Type": "application/json" } }).then((res) => {
                console.log(res.data.userCheck);
                setName(res.data.userCheck.name)
                setEmail(res.data.userCheck.email)
                setImage(res.data.userCheck.pic)
                setPhone(res.data.userCheck.phonenumber)
                dispatch(login({
                    name: res.data.userCheck.name,
                    id: res.data.userCheck._id,
                    image: res.data.userCheck.pic
                }))
                // dispatch(change(res.data.userCheck.userName))
                // dispatch(changeImage(res.data.userCheck.image))

            })
        }
    }, [navigate, dispatch,image]);

    const addImage = async () => {
        const { value: file } = await Swal.fire({
            title: 'Select image',
            input: 'file',

            inputAttributes: {
                'accept': 'image/*',
                'aria-label': 'Upload your profile picture'
            }
        })
        if (file) {
            const reader = new FileReader()
            reader.onload = (e) => {
                Swal.fire({
                    title: "img",
                    imageUrl: e.target.result,
                    imageHeight: 400,
                    showDenyButton: true,
                    showCancelButton: true,
                    confirmButtonText: 'Update',
                    denyButtonText: `Change`,
                }).then((result) => {
                    if (result.isConfirmed) {
                        uploadImg(file)
                    } else if (result.isDenied) {
                        addImage()
                    }
                })
            }
            reader.readAsDataURL(file)
        }
        function uploadImg(file) {
            const Token2 = localStorage.getItem("token");
            let sToken = JSON.stringify(Token2)
            let formData = new FormData();
            formData.append("image", file)
            axios.post(`${imageUpload}/${sToken}`, formData).then((res) => {
                setImage(res.data.image)
                dispatch(updateImage())
            }).catch((err) => {
                console.log(err);
            })
        }
    }

    return (
        <>
            <Header />
            <div className='outer d-flex  justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
                <Row>
                    <Card style={{ width: '60rem' }}>
                        <Card.Body>

                            <div class="container rounded bg- mt-5 mb-5 profilepage">
                                <div class="row">
                                    <div class="col-md-4 border-right">
                                        <div class="d-flex flex-column align-items-center text-center p-3 py-5">
                                            <img class="rounded-circle mt-5" width={150} src={image} alt="" />
                                            
                                            <span class="text-black-50"></span>
                                            <span>




                                                <button type="button" class="btn mt-3 btn-outline-secondary"
                                                    onClick={addImage}
                                                >
                                                    Update Image
                                                </button>


                                            </span></div>
                                    </div>
                                    <div class="col-md-8 border-right">
                                        <div class="p-3 py-5">
                                            <div class="d-flex justify-content-between align-items-center mb-3">
                                                <h4 class="text-right">Profile Settings</h4>
                                            </div>
                                            <div class="row mt-2">
                                                <div class="col-md-6"><label class="labels">Name</label><input class="form-control" value={name} disabled/></div>

                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-6"><label class="labels">Email</label><input class="form-control" value={email} disabled/></div>

                                            </div>
                                            <div class="row mt-3">
                                                <div class="col-md-6"><label class="labels">Phone</label><input class="form-control" value={phone} disabled/></div>

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
        </>
    )
}

export default Profile