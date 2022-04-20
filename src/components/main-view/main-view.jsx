import React from 'react';
import  MovieView  from '../movie-view/movie-view';
import  MovieCard  from '../movie-card/movie-card';

class MainView extends React.Component {
    constructor(){
        super();
        this.state = {
          movies: [
            { _id: 1, Title: 'Inception', Description: 'Dont mind the picture just practice', ImagePath: 'https://m.media-amazon.com/images/M/MV5BODAzNDMxMzAxOV5BMl5BanBnXkFtZTgwMDMxMjA4MjE@._V1_UY209_CR0,0,140,209_AL_.jpg'},
            { _id: 2, Title: 'The Shawshank Redemption', Description: 'Dont mind the picture just practice', ImagePath: 'https://m.media-amazon.com/images/M/MV5BODAzNDMxMzAxOV5BMl5BanBnXkFtZTgwMDMxMjA4MjE@._V1_UY209_CR0,0,140,209_AL_.jpg'},
            { _id: 3, Title: 'Gladiator', Description: 'Dont mind the picture just practice', ImagePath: 'https://m.media-amazon.com/images/M/MV5BODAzNDMxMzAxOV5BMl5BanBnXkFtZTgwMDMxMjA4MjE@._V1_UY209_CR0,0,140,209_AL_.jpg'}
          ],
          selectedMovie: null
        };
      }
      setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }

      render() {
        const { movies, selectedMovie } = this.state;
    
    
        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;
    
        return (
          <div className="main-view">
            {selectedMovie
              ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
              : movies.map(movie => (
                <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
              ))
            }
          </div>
        );
      }
}

export default MainView;