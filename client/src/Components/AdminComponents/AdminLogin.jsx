import React from 'react'
import { Button, Container ,Form} from 'react-bootstrap'

function AdminLogin() {
  return (
    <>
    <Container className='outer d-flex  justify-content-center align-items-center' style={{ minHeight: '100vh' }}>
            <Form className='border p-4 bg-success rounded'
            //   onSubmit={loginUser}
            >
                <h2 className='text-white'>Admin</h2>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Enter email"
                    // value={data.email}
                    // onChange={(e) => setData({ ...data, email: e.target.value })}
                    />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Password"
                    // value={data.password}
                    // onChange={(e) => setData({ ...data, password: e.target.value })}
                    />
                </Form.Group>

                <Button variant="primary" type="submit" className='mt-3'>
                    Submit
                </Button>
            </Form>
        </Container>
    </>
  )
}

export default AdminLogin