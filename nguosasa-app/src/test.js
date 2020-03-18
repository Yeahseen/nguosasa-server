import React from 'react';
import axios from 'axios';

class MovieDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: [],
    };
  }
  componentDidMount() {
    this.fetchMovieDetails();
  }

  fetchMovieDetails() {
    this.setState({});
    axios.get('/api/product/:id').then(response => {
      this.setState({
        movieDetails: response.data,
      });
    });
  }
  render() {
    const movieDetails = this.state;
    const { poster, name, description, price } = movieDetails;
    return (
      <div className="mvls-container">
        <div className="mvls-movie-details-wrapper">
          <div className="mvls-movie-details">
            <img
              className="mvls-movie-details-poster"
              src={poster}
              alt={name}
            />
            <div className="mvls-movie-details-info">
              <h2>{name}</h2>
              <p>{description}</p>
              <span>name</span>: {name}
              <span>description</span>: {price}
              <p>
                <span>price</span>: {price}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieDetails;
