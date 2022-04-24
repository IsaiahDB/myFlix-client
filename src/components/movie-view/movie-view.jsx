import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class MovieView extends React.Component {

  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card style={{margin: '20px 0px 10px 0px'}}>
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
        </Card.Body>
      </Card>
    );
  }
}

export default MovieView;