import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Slider from "../components/Slider";
import LatestProducts from "../components/LatestProducts";
import About from "../components/About";
import Footer from "../components/Footer";
function Home() {
  const [movies, setMovies] = useState([]);

  const API_KEY = "api_key=c26c13a2c7d4586f1674c5d626da95e2";
  const BASE_URL = "https://api.themoviedb.org/3";
  const API_URL = `${BASE_URL}/discover/movie/?certification_country=US&certification=R&sort_by=vote_average.desc&${API_KEY}`;

  useEffect(() => {
    axios
      .get(API_URL)
      .then(resp => setMovies(resp.data.results.splice(4, 8)))
      .catch(e => console.log(e));
  }, []);

  

  return (
    <>
      <Header />
      <Slider />
      <LatestProducts movies={movies} />
      <About />
      <Footer />
    </>
  );
}
export default Home;
