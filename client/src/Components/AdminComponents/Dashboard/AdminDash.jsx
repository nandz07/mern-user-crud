import React, { Fragment } from 'react'
import Footer from '../Footer/Footer'
// import { Link } from 'react-router-dom'
import AdminHeader from '../Header/AdminHeader'
import './AdminDash.css'
import { Button, Card, Container, Row } from 'react-bootstrap'

function AdminDash() {
    return (
        <>
            <Fragment >
                <AdminHeader />
                <Container className='outer d-flex  justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
                    <Row>
                        <Card style={{ width: '40rem' }}>
                            <Card.Header>Admin Dashboard</Card.Header>
                            <Card.Body>
                                <Card.Title>WELCOME To Admin Dashboard..!</Card.Title>
                                <Card.Text>
                                    Button will navigate you to users table.
                                </Card.Text>
                                <Button variant="primary">Users</Button>
                            </Card.Body>
                        </Card>
                    </Row>
                </Container>

                <Footer />

            </Fragment>
        </>
    )
}

export default AdminDash