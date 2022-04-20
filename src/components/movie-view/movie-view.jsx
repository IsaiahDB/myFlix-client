import React from 'react';


class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
            <div className="movie-poster">
                <img src={movie.ImagePath} />
            </div>
            <div className="movie-title">
                <span className="value">{movie.Title}</span>
            </div>
            <div className="movie-description">
                <span className="value">{movie.Description}</span>
            </div>
            <button onClick={() => { onBackClick(null); }}>Back</button>
       </div>
    );
  }
}

export default MovieView;