import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";




class MovieView extends React.Component {

  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card style={{margin: '20px 0px 10px 0px'}} bg={"primary"}>
        <Card.Img variant="top"  src={movie.ImagePath} crossOrigin="true"  style={{width: '50px', height: '50px'}}/>
        <Card.Body>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
        <Link to={`/directors/${movie.Directors.Name}`}>
          <Button variant="link">Director: {movie.Director.Name}</Button>  
        </Link>
        <Link to={`/genres/${movie.Genre.Name}`}>
          <Button variant="link">Genre: {movie.Genre.Name}</Button>
        </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.shape({
      Name: PropTypes.string.isRequired
    }).isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};

export default MovieView;