
import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';

import "./genre-view.scss";

export class GenreView extends React.Component {


  render() {
    const { genre, movies, onBackClick } = this.props;

    return (
      <Container>
        <Card style={{margin: '20px 0px 10px 0px'}}>
          <Card.Body >
            <Card.Title>{genre.Name}</Card.Title>
            <Card.Title>{genre.Description}</Card.Title>
            <Button id="genre-back-button" onClick={() => { onBackClick(); }}>Back</Button>
          </Card.Body>
        </Card>
      </Container>
         
    );
  }
}

export default GenreView;