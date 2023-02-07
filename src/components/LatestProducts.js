import React from "react";
import { Link } from "react-router-dom";

function LatestProducts({ movies }) {
  return (
    <div className="bg-primary p-60">
      <div className="container-colum">
        <h2 className="text-center">Latest products</h2>
        <div className="products">
          {movies &&
            movies.map(movie => (
              <div className="product">
                <img
                  src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                  alt={movie.original_title}
                />
                <div className="details">
                  <h3>{movie.original_title}</h3>
                  <p>popularity: {movie.popularity}</p>
                  <Link to={`/product/${movie.id}`}>Details</Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default LatestProducts;
