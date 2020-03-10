import React from 'react';

function Movie({ movieShowing }) {
  const {
    id,
    title,
    price,
    description,
    poster_url,
    cinema_count,
  } = movieShowing;
  let cinemaText = '';

  if (cinema_count === 'retail') {
    cinemaText = 'Item is in Retail';
  } else if (cinema_count === 'wholesale') {
    cinemaText = 'Item is in Wholesale';
  } else {
    cinemaText = `Showing in ${cinema_count} cinemas`;
  }

  return (
    <div className="mvls-movie">
      <img className="mvls-poster" src={poster_url} alt={title} />
      <div className="mvls-movie-body">
        <div className="mvls-title">{title}</div>
        <div className="mvls-title">{price}</div>
        <div className="mvls-title">{description}</div>

        <p className="mvls-cinema-count">{cinemaText}</p>
      </div>
      <div className="mvls-movie-footer">
        <a href={`/movie/${id}`} className="mvls-btn mvls-btn-cinemas">
          See {title}
        </a>
      </div>
    </div>
  );
}

export default Movie;
