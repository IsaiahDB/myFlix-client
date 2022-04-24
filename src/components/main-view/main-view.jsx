import React from 'react';
import axios from 'axios';

import  LoginView from '../login-view/login-view';
import  RegisterUser from '../registration-view/registration-view';
import  MovieView  from '../movie-view/movie-view';
import  MovieCard  from '../movie-card/movie-card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import  Navbar  from 'react-bootstrap/Navbar';

class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
          movies: [],
          selectedMovie: null
        };
      }
      componentDidMount(){
        axios.get('https://manymovies.herokuapp.com/movies')
          .then(response => {
            this.setState({
              movies: response.data
            });
          })
          .catch(error => {
            console.log(error);
          });
      }
      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

      onLoggedIn(user) {
        this.setState({
          user
        });
      }

      onRegister(reg) {
        this.setState({
          reg
        });
      }

     

      render() {
        const { movies, selectedMovie, user, reg } = this.state;

        if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />;
    
        if (movies.length === 0) return <div className="main-view" />;
    
        return (
          <div className="main-view">

            <Navbar bg="dark" expand="lg">
                  <Container>
                    <Navbar.Brand href="#home" style={{color: "white", fontSize: "30px"}}>The Movie App</Navbar.Brand>
                  </Container>
            </Navbar>
            {selectedMovie
              
              ?( 
              <Row className="justify-content-md-center" > 
                <Col md={6}>
                 <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
                </Col>
              </Row> )
              :(
                <Row className="justify-content-md-center">
                  {movies.map(movie => (
                  <Col md={6}>
                    <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
                  </Col>
                  ))} 
              </Row>
            )}
          </div>
        );
      }
}

export default MainView;