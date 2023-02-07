import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Footer from "../components/Footer";

function updateCart() {}

function Product() {
  const { id } = useParams();
  const [movie, setMovie] = useState();
  const [cartMoviees, setCartMovie] = useState([]);
  const [cartUpdated, setCartUpdated] = useState(false);
  const [loading, setloading] = useState(true);
  const API_KEY = "api_key=c26c13a2c7d4586f1674c5d626da95e2";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL = `${BASE_URL}/movie/${id}?${API_KEY}`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then(resp => {
        setMovie(resp.data);
        setloading(false);
      })

      .catch(e => console.log(e));

    console.log(
      localStorage.getItem("cart") === null
        ? []
        : JSON.parse(localStorage.getItem("cart"))
    );
  }, []);

  function handleSubmit(e) {
    e.preventDefault();

    let qty = 0;

    Array.from(e.target.elements).forEach(element => {
      if (element.type === "number") {
        qty = element.value;
      }
    });

    if (qty >= 1) {
      const item = {
        id: id,
        title: movie.title,
        qty: qty,
      };

      setCartMovie(cartMoviees => [...cartMoviees, item]);

      setCartUpdated(true);

      Array.form(e.target.elements)[0].value = "";
    }
  }
  return (
    <>
      <Header />
      <div className="view-product p-60">
        <div className="container-row">
          {loading
            ? "loading.."
            : movie && (
                <>
                  <div className="product-image">
                    <img
                      src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                      alt={movie.original_title}
                    />
                  </div>
                  <div className="product-details">
                    <h2>{movie.title}</h2>
                    <p>{movie.overview}</p>
                    <table border="1">
                      <tr>
                        <td>Release data</td>
                        <td>{movie.release_date}</td>
                      </tr>
                      <tr>
                        <td>Spoken languages</td>
                        <td>
                          {movie.spoken_languages.map(lang => (
                            <span className="badge" key={lang.iso_639_1}>
                              {lang.english_name}
                            </span>
                          ))}
                        </td>
                      </tr>
                      <tr>
                        <td>Genders</td>
                        <td>{movie.release_date}</td>
                      </tr>
                    </table>
                    <br /> <br />
                    <h4>Price: {(movie.id / 1000).toFixed(2)} &euro;</h4>
                    <form className="add-to-cart" onSubmit={handleSubmit}>
                      <input type="number" name="qty" min="0" max="10" />
                      <input type="hidden" name="id" value={movie.id} />
                      <button type="submit">Add to Cart</button>
                    </form>
                    {cartUpdated ? <p>Product was added to cart </p> : ""}
                  </div>
                </>
              )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Product;
