
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import "./directors-view.scss";

class DirectorView extends React.Component {


  render() {
    const { director, movies, onBackClick } = this.props;

    return (
      <Container>
        <Card style={{margin: '20px 0px 10px 0px'}}>
          <Card.Body >
            <Card.Title>{director.Name}</Card.Title>
            <Card.Title>{director.Bio}</Card.Title>
            <Button id="genre-back-button" onClick={() => { onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>
      </Container>
         
    );
  }
}

export default DirectorView;
