import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';


class MovieCard extends React.Component {
    
    render() {
        const { movie, onMovieClick } = this.props;
        <button onClick={() => { onBackClick(null); }}>Back</button>
        return (
            <Card style={{margin: '20px 0px 10px 0px'}}>
                <Card.Img variant="top" src={movie.ImagePath} />
                <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Button onClick={() => onMovieClick(movie)} variant="link">Open</Button>
                </Card.Body>
            </Card>
        )
    }
}

MovieCard.propTypes = {
    movie: PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
};


export default MovieCard;
