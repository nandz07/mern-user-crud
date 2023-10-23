
import React, { useEffect, useState } from 'react';
import AdminHeader from '../Header/AdminHeader';
import Footer from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import './users.css';
import { Button, Card, Table } from 'react-bootstrap'; // Import Table from react-bootstrap
import Swal from 'sweetalert2';
import axios from '../../../utils/axios';
import { adminDeleteUser, adminSearchUser, admingetAllusers } from '../../../utils/Constants';


function Usermanagement() {
    const navigate = useNavigate()
    const [users, setUsers] = useState([])

    useEffect((key) => {
        getUserLists();

    }, [])

    const getUserLists = () => {
        axios.get(admingetAllusers).then((response) => {
            setUsers(response.data.users)
        }).catch((err) => {
            console.log("oops user catch client");

        })
    }

    const userSearch = (e) => {
        let userSearch = e.target.value;

        console.log(userSearch);
        if (!userSearch) {
            getUserLists();
        } else {
            axios.get(`${adminSearchUser}/${userSearch}`).then((res) => {
                setUsers(res.data.users)
            })
        }
    }

    const deleteUser = (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes,delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`${adminDeleteUser}/${id}`).then((res) => {
                    getUserLists();
                })
                Swal.fire(
                    'Deleted!',
                    'User has been deleted.',
                    'success'
                )
            }
        })
    }

    return (
        <>
            <AdminHeader />
            <div className='outer d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
                <Card className="card text-center mt-3" style={{ width: '80%' }}>
                    <Card.Header>Active Users</Card.Header>
                    <Card.Body>
                        <div className='d-flex justify-content-between align-items-center'>

                        <input className="form-control mb-3 w-25 searchadmin" name="query" type="search" placeholder="Search" aria-label="Search" 
                        onChange={(e)=>userSearch(e)}
                        />
                        <Button className="addButtonAdmin" variant="outline-primary" onClick={() => navigate('/admin/adminAddUser')}>Add</Button>
                        </div>

                        <Table responsive striped bordered hover>
                            <thead>
                                <tr>
                                    <th>No</th>
                                    <th>User Name</th>
                                    <th>Email</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {users.map((obj, index) =>
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{obj.name}</td>
                                        <td>{obj.email}</td>
                                        <td>
                                        <Button className='mx-2' variant="outline-warning"
                                        onClick={() => navigate(`/admin/updateUser/${obj._id}`)}
                                        >
                                                Edit
                                            </Button>
                                            <Button variant="outline-danger" 
                                            onClick={()=>deleteUser(obj._id)}
                                            >
                                                Delete
                                            </Button>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </Table>
                    </Card.Body>
                    <Card.Footer className="text-muted">You can update details in Users</Card.Footer>
                </Card>
            </div>
            <Footer />
        </>
    );
}

export default Usermanagement;
