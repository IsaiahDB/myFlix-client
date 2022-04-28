import React from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Container } from "react-bootstrap";
import { CardGroup } from "react-bootstrap";

import "./directors-view.scss";

class DirectorView extends React.Component {


    render() {
        const { genre, movies, onBackClick } = this.props;

        return (
            <Container>
                <Row>
                    <Col>
                        <Card >
                            <Card.Body>
                                <Card.Title>{genre.Name}</Card.Title>
                                <Card.Text>
                                    Bio: {genre.Description}
                                </Card.Text>
                                <Button id="genre-back-button" onClick={() => { onBackClick(); }}>Back</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col md={30}>
                        <CardGroup>
                            {movies.map(movie => (
                                <Card className="favorite-movie card-content" key={movie._id} >
                                    <Card.Img
                                        variant="top"
                                        crossOrigin="true"
                                        src={movie.ImagePath} />
                                    <Card.Body style={{ backgroundColor: "black" }}>
                                        <Card.Title className="movie_title">
                                            {movie.Title}
                                        </Card.Title>
                                        <Link to={`/movies/${movie._id}`}>
                                            <Button id="card-button" variant="link">Show more</Button>
                                        </Link>
                                    </Card.Body>
                                </Card>
                            ))}
                        </CardGroup>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default DirectorView;