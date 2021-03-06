import React from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { connect } from 'react-redux';

import { setMovies, setUser, setUserData, getToken } from "../../actions/actions";

import MoviesList from "../movie-list/movie-list";

import  LoginView from '../login-view/login-view';
import  RegisterUser from '../registration-view/registration-view';
import  ProfileView  from '../profile-view/profile-view';
import  MovieView  from '../movie-view/movie-view';
import GenreView from '../genre-view/genres-view';
import DirectorView from '../directors-view/directors-view';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar  from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';



class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
          movies: [],
          selectedMovie: null
        };
      }
      componentDidMount(){
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
           this.setState({
        user: localStorage.getItem('user')
        });
        this.getMovies(accessToken);
        }
      }
      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

      onLoggedIn(authData) {
        console.log(authData);
        this.setState({
          user: authData.user.Username
        });
        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
      }

      getMovies(token) {
        axios.get('https://manymovies.herokuapp.com/movies', {
          headers: { Authorization: `Bearer ${token}`}
        })
        .then(response => {
          // Assign the result to the state
          this.setState({
            movies: response.data
          });
        })
        .catch(function (error) {
          console.log(error);
        });
      }

      onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
          user: null
        });
      }

      onRegister(reg) {
        this.setState({
          reg
        });
      }

     

      render() {
        const { movies, user } = this.state;
        return (   
          <Router>
            <Navbar bg="dark" expand="lg">
              <Container>
                <Navbar.Brand href="/" style={{color: "white", fontSize: "30px"}}>The Movie App </Navbar.Brand>
                <Link to={'/profile'}>
                    <Button>Profile View</Button>
                </Link>
              </Container>
            </Navbar>
            <Row className="main-view justify-content-md-center">
              <Route exact path="/" render={() => {
                 if (!user) return <Col>
                 <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
               </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <MoviesList movies={movies} />
              }} />


              <Route path="/myprofile/" render={ ()=> 
                 <ProfileView movies={movies} onBackClick={() => console.log("back")} />
              }>
                
              </Route>

               <Route path='/profile' render={() => 
               
                  <ProfileView movies={movies} onBackClick={() => history.goBack()} />
                } />
              <Route path="/register" render={() => {
                if (user) return <Redirect to="/" />
                  return <Col>
                  <RegisterUser />
                </Col>
              }} />
              <Route path="/movies/:movieId" render={({ match, history }) => {
                if (!user) return <Col>
                  <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                  <MovieView movie={movies.find(m => m._id === match.params.movieId)} onBackClick={() => history.goBack()} />
                </Col>
              }} />
              <Route exact path="/directors/:Name" render={({ match, history }) => {
                if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                <DirectorView director={movies.find(m => m.Director.Name === match.params.Name).Director} onBackClick={() => history.goBack()} />
              </Col>
              }} />
              <Route exact path="/genres/:Name" render={({ match, history }) => {
                if (!user) return <Col>
                <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
              </Col>
                if (movies.length === 0) return <div className="main-view" />;
                return <Col md={8}>
                <GenreView genre={movies.find(m => m.Genre.Name === match.params.Name).Genre} onBackClick={() => history.goBack()} />
              </Col>
              }} />
            </Row>
            <Button style={{margin: '20px 0px 40px 20px'}}  variant="warning" size="lg" onClick={() => { this.onLoggedOut() }}>Logout</Button>
          </Router>
        );
    }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user, userData: state.userData };
};

export default connect(mapStateToProps, { setMovies, setUser, setUserData, getToken })(
  MainView
);