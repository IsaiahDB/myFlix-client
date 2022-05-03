
import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container  from 'react-bootstrap';



import "./genre-view.scss";



class GenreView extends React.Component {
  

    render() {
      const{movie, onBackClick} = this.props;
  
      return (
        <Container>
            <Row>
                <Col>
                    <Card style={{margin: '20px 0px 10px 0px'}}>
                        <Card.Img variant="top" src={movie.ImagePath} style={{width: "max-width", height: "150px"}} />
                        <Card.Body style={{width: "max-width"}}>
                            <Card.Title>{movie.Title}</Card.Title>
                            <Card.Text>{movie.Description}</Card.Text>
                            <Card.Text>{movie.Genre}</Card.Text>
                            <Card.Text>{movie.Director.Name}</Card.Text>
                        </Card.Body>   
                        <Button  onClick={() => { onBackClick(null); } } variant="link" style={{marginTop: 50, }}>Back</Button>
                    </Card>
                </Col>
            </Row>
        </Container>
    )}
}

GenreView.propTypes = {
    movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.string.isRequired,
    Director: PropTypes.shape({
    Name: PropTypes.string.isRequired
        }).isRequired,
    }).isRequired,
onBackClick: PropTypes.func.isRequired
};

export default GenreView;