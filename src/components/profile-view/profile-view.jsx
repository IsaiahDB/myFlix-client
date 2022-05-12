import React from "react";
import "./profile-view.scss";

import Card  from "react-bootstrap/Card"; 
import Button from "react-bootstrap/Button";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

import axios from "axios";


class ProfileView extends React.Component {
    constructor() {
        super();

        this.state = {
            Username: null,
            Password: null,
            Email: null,
            Birthday: null,
            FavoriteMovies: [],
            Favs: []
        };
    }

    componentDidMount() {
        const accessToken = localStorage.getItem('token');
        this.getUser(accessToken);
        this.getMovies(accessToken);
    } 

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
        window.open('/', '_self');
    }

    getMovies(token) {
        axios.get(`https://manymovies.herokuapp.com/movies`, {
            headers: { Authorization: `Bearer ${token}` }
        })
        .then(response => {
            const favs = response.data.filter(x=> this.state.FavoriteMovies.includes(x._id))
            this.setState({Favs: favs})
            console.log(favs)
            console.log(response)
        })

    }

    getUser(token) {
        const Username = localStorage.getItem('user');

        axios.get(`https://manymovies.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                this.setState({
                    Username: response.data[0].Username,
                    Password: response.data[0].Password,
                    Email: response.data[0].Email,
                    Birthday: response.data[0].Birthday,
                    FavoriteMovies: response.data[0].FavoriteMovies
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    editUser = (e) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.put(`https://manymovies.herokuapp.com/users/${Username}`,
            {
                Username: this.state.Username,
                Password: this.state.Password,
                Email: this.state.Email,
                Birthday: this.state.Birthday
            },
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            .then((response) => {
                this.setState({
                    Username: response.data.Username,
                    Password: response.data.Password,
                    Email: response.data.Email,
                    Birthday: response.data.Birthday
                });

                localStorage.setItem('user', this.state.Username);
                alert("Profile updated");
                window.open('/profile', '_self');
            });
    };

    onRemoveFavorite = (e, movies) => {
        e.preventDefault();
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://manymovies.herokuapp.com/users/${Username}/movies/${movies._id}`,
            {
                headers: { Authorization: `Bearer ${token}` }
            }
        )
            .then((response) => {
                console.log(response);
                alert("Movie removed");
                this.componentDidMount();
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onDeleteUser() {
        const Username = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        axios.delete(`https://manymovies.herokuapp.com/users/${Username}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then((response) => {
                console.log(response);
                alert("Profile deleted");
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    setUsername(value) {
        this.setState({
            Username: value
        });
    }

    setPassword(value) {
        this.setState({
            Password: value
        });
    }

    setEmail(value) {
        this.setState({
            Email: value
        });
    }

    setBirthday(value) {
        this.setState({
            Birthday: value
        });
    }

    render() {
        const {  Password, Username, Email, Birthday } = this.state;

        return (
            <div>
                <Card>
                    <Card.Body>
                        <Form onSubmit={(e) =>
                            this.editUser(e, 
                                this.Username,
                                 this.Password, 
                                 this.Email, 
                                 this.Birthday)
                        }>
                            <Form.Group>
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="Username"
                                    placeholder="New Username"
                                    value={Username}
                                    onChange={(e) => this.setUsername(e.target.value)}
                                    required
                            />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Password</Form.Label>
                                <Form.Control
                                    type="password"
                                    name="Password"
                                    placeholder="New Password"
                                    value={Password}
                                    onChange={(e) => this.setPassword(e.target.value)}
                                    required
                            />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                    type="email"
                                    name="Email"
                                    placeholder="New Email"
                                    value={Email}
                                    onChange={(e) => this.setEmail(e.target.value)}
                                    required
                            />
                            </Form.Group>
                            <Form.Group>
                                <Form.Label>Birthday</Form.Label>
                                <Form.Control
                                    type="date"
                                    name="Birthday"
                                    placeholder="New Birthday"
                                    value={Birthday}
                                    onChange={(e) => this.setBirthday(e.target.value)}
                                    required
                            />
                            </Form.Group>
                            <div>
                                <Button variant="success" type="submit" onClick={this.editUser}>Update Data</Button>
                                <Button variant="secondary" onClick={() => this.onDeleteUser()}>Delete Profile</Button>
                            </div>
                            
                        </Form>
                    </Card.Body>
                </Card>
                <Row>
                    <Col>
                        <Card>
                            <Card.Body>
                                    {this.state.Favs.map((movie) => 
                                   
                                        // <Card className="favorite-movie" key={movie._id} >
                                        //     <Card.Img
                                        //         className="favorite-movie-image"
                                        //         variant="top"
                                        //         src={movie.ImagePath}
                                        //     />
                                        //     <Card.Body>
                                        //         <Card.Title className="movie-title">
                                        //             {movie.Title}
                                        //         </Card.Title>
                                        //         <Button value={movie._id} onClick={(e) => this.onRemoveFavorite(e, movie)}>Remove from List</Button>
                                        //     </Card.Body>
                                        // </Card>
                                        <Card className="favorite-movie" key={movie._id} >
                                        <Card.Title key={movie._id}>
                                            {movie.Title}
                                        </Card.Title>
                                        
                                        <Card.Img className="favorite-movie-image" variant="top" src={movie.ImagePath}/>
                                        </Card>
                                        )};

                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </div>
            
        )
    }
}

export default ProfileView;