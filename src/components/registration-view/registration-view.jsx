import React, { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

import "./registration-view.scss"

export function RegisterUser(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');


    const registerSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email);
        props.onRegister(username)
      };

      return (
        <Container>
          <Row className="justify-content-lg-center">
            <Card style={{marginTop: '100px', width: '75vw'}} >
              <Card.Body>
                <Col>
                  <Form>
                    <Form.Group controlId="formUsername">
                      <Form.Label>Username:</Form.Label>
                      <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control type="email" onChange={e => setEmail(e.target.value)} />
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={registerSubmit}>Submit</Button>
                  </Form>
                </Col>
              </Card.Body>
            </Card>
          </Row>
        </Container>
        
      );
}

export default RegisterUser;