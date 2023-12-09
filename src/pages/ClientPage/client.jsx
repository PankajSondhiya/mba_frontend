import { lazy, Suspense, useEffect, useState } from "react";
import { fetchAllMovies } from "../../api/movie";
import { fetchAllTheatres } from "../../api/theatre";
import { CLIENT, CUSTOMER } from "../../constants";
import Navbar from "../../components/Navbar";

const TheatreTable = lazy(() => import("../../components/theatreTable"));
const MovieTable = lazy(() => import("../../components/movieTable"));

const Client = () => {
  const [movieList, setMovieList] = useState([]);
  const [theaterList, setTheaterList] = useState([]);

  async function fetchTheaters() {
    const theatres = await fetchAllTheatres();
    setTheaterList(theatres);
  }

  async function fetchMovies() {
    const movies = await fetchAllMovies();
    setMovieList(movies);
  }
  async function fetchTheatresOfClient() {
    const theatres = await fetchAllTheatres();

    const filteredTheatres = theatres.filter(
      (theatre) => theatre.ownerId === localStorage.getItem("_id")
    );

    setTheaterList(filteredTheatres);
  }

  useEffect(() => {
    fetchTheaters();
    fetchMovies();
  }, []);

  useEffect(() => {
    fetchTheatresOfClient();
  }, []);

  return (
    <>
      <Navbar />
      <div className="container my-5">
        <Suspense fallback={<div>Loading.....</div>}>
          <TheatreTable
            theaterList={theaterList}
            setTheatreList={setTheaterList}
            userType={CLIENT}
            movieList={movieList}
            fetchTheatresOfClient={fetchTheatresOfClient}
          />
        </Suspense>

        <div className="mt-5">
          <Suspense fallback={<div>Loading.....</div>}>
            <MovieTable movieList={movieList} userType={CLIENT} />
          </Suspense>
        </div>
      </div>
    </>
  );
};

export default Client;
