import React, { useState } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

import "./registration-view.scss"

export function RegisterUser(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ birthday, setBirthday ] = useState('');

    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const validate = () => {
      let isReq = true;
      if (!username) {
          setUsernameErr('Username Required');
          isReq = false;
      } else if (username.length < 2) {
          setUsernameErr('Username must be at least 2 characters long');
          isReq = false;
      }
      if (!password) {
          setPasswordErr('Password Required');
          isReq = false;
      } else if (password.length < 6) {
          setPasswordErr('Password must be at least 6 characters long');
          isReq = false;
      }
      if (!email) {
          setEmailErr('Please enter a email address');
          isReq = false;
      } else if (email.indexOf('@') === -1) {
          setEmailErr('Please enter a valid email address');
      }
      return isReq;
  }


    const registerSubmit = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
        axios.post('https://manymovies.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday
        })
        .then(response => {
          const data = response.data;
          console.log(data);
          window.open('/', '_self'); // the second argument '_self' is necessary so that the page will open in the current tab
        })
        .catch(e => {
          console.log('error registering the user')
        });
      }
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
                      <Form.Control type="text" value={username} onChange={e => setUsername(e.target.value)} />
                      {usernameErr && <p>{usernameErr}</p>}
                    </Form.Group>
                    <Form.Group controlId="formPassword">
                      <Form.Label>Password:</Form.Label>
                      <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} />
                      {passwordErr && <p>{passwordErr}</p>}
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Email:</Form.Label>
                      <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} />
                      {emailErr && <p>{emailErr}</p>}
                    </Form.Group>
                    <Form.Group controlId="formEmail">
                      <Form.Label>Birthday:</Form.Label>
                      <Form.Control type="number" onChange={e => setBirthday(e.target.value)} />
                    </Form.Group>
                    <Link to={`/`}>
                      <Button style={{margin: '7px'}} variant="primary">Back</Button>
                    </Link>
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