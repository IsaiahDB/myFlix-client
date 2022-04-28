import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';


import "./login-view.scss";

export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://manymovies.herokuapp.com/login', {
      Username: username,
      Password: password
    })
    .then(response => {
      const data = response.data;
      props.onLoggedIn(data);
    })
    .catch(e => {
      console.log('no such user')
    });
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

                <Button style={{margin: '7px 2px 0px 0px'}} variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
                <Button style={{marginTop: '7px'}} variant="primary" type="submit" onClick={handleSubmit}>Register New Users</Button>
              </Form>
            </Col>
          </Card.Body>
        </Card>
      </Row>
    </Container>
  );
}

export default LoginView;