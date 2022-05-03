import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";


class MovieCard extends React.Component {
    
    render() {
         const { movie } = this.props;
         return (
            <Card style={{margin: '20px 0px 10px 0px'}}>
                <Card.Img variant="top" src={movie.ImagePath} style={{width: 'max-width', height: '150px'}} />
                <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>
                <Card.Text>{movie.Description}</Card.Text>
                <Link to={`/movies/${movie._id}`}>
                    <Button variant="link">Open</Button>
                </Link>
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
};


export default MovieCard;
