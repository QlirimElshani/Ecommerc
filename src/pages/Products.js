import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import No_image from "../No_image.png";

function Products() {
  const [page, setPage] = useState(1);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_KEY = "api_key=c26c13a2c7d4586f1674c5d626da95e2";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL = `${BASE_URL}/discover/movie/?page=${page}&certification_country=US&certification=R&sort_by=vote_average.desc&${API_KEY}`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then(resp => {
        setMovies(resp.data.results);
        setLoading(false);
      })
      .catch(e => console.log(e));
  }, [page]);

  const prevPage = e => {
    e.preventDefault();

    const prev_page = page - 1;
    if (prev_page < 1) return;
    setPage(prev_page);
  };

  const nextPage = e => {
    e.preventDefault();

    const next_page = page + 1;
    if (next_page > 707) return;
    setPage(next_page);
  };

  return (
    <>
      <Header />
      <div className="bg-primary p-60">
        <div className="container-colum">
          <div className="products">
            {loading
              ? "Loading movies..."
              : movies &&
                movies.map(movie => (
                  <div className="product">
                    {movie.poster_path === null ? (
                      <img src={No_image} alt={movie.original_title} />
                    ) : (
                      <img
                        src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                        alt={movie.original_title}
                      />
                    )}

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

      <div className="container-colum p-60">
        <ul className="pagination">
          <li>
            <a href="#" className="page_btn" onClick={prevPage}>
              &lt;
            </a>
          </li>
          <li>{page}</li>
          <li>
            <a href="#" className="page_btn" onClick={nextPage}>
              &gt;
            </a>
          </li>
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default Products;
