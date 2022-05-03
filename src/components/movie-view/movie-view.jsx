import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";


import "./movie-view.scss"

class MovieView extends React.Component {

  
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card style={{margin: '20px 0px 10px 0px'}} bg={"primary"}>
        <Card.Img variant="top" src={movie.ImagePath} style={{width: "max-width", height: "150px"}} />
        <Card.Body style={{width: "max-width"}}>
        <Card.Title>{movie.Title}</Card.Title>
        <Card.Text>{movie.Description}</Card.Text>
        <div className='movie-director'>
          <Link to={`/directors/${movie.Director}`}>
            <Button id="movie-director-id" variant="link">Director: {movie.Director}</Button>  
          </Link>
          <Link to={`/genres/${movie.Genre}`}>
            <Button id="movie-genre-id" variant="link">Genre: {movie.Genre}</Button>
          </Link>
        </div>
        <Button onClick={() => { onBackClick(null); }}>Back</Button>
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