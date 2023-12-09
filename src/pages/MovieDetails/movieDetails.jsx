import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Link, useParams } from "react-router-dom";
import { getMovie } from "../../api/movie";
import MovieAttributes from "../../components/movieAttributes";
import Navbar from "../../components/Navbar";
import { RELEASED } from "../../constants";
import "./movieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const [movieDetail, setMovieDetail] = useState({});

  async function fetchMovieDetails(id) {
    const data = await getMovie(id);
    setMovieDetail(data);
  }

  useEffect(() => {
    fetchMovieDetails(id);
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-light">
        <div className="box bg-black backg d-flex justify-content-center">
          <ReactPlayer
            url={movieDetail.trailerUrl}
            controls
            className="video"
            width={"65%"}
            height="100%"
          />
        </div>
        <div className="container my-4 justify-content-center">
          <div className="row mx-5">
            <div className="col">
              <img
                src={movieDetail.posterUrl}
                className="card"
                width={300}
                height={450}
                alt={movieDetail.name}
              />
            </div>
            <div className="col">
              <h2 className="hw-bolder">About the movie</h2>
              <div className="d-flex">
                <MovieAttributes
                  description={movieDetail.description}
                  language={movieDetail.language}
                  releaseStatus={movieDetail.releaseStatus}
                />
              </div>
              <hr />
              <h3>{movieDetail.name}</h3>
              <h5 className="font-italic">{movieDetail.director}</h5>
              <h5 className="font-italic">{movieDetail.releaseDate}</h5>
              <hr />
              <h4>Cast</h4>
              {movieDetail?.casts?.map((name, index) => (
                <li key={index + 1} className="list-group-item">
                  {name}
                </li>
              ))}
              <div className="text-center my-3">
                {
                  <Link
                    className="text-decoration-none btn btn-lg btn-danger text-center"
                    to={
                      movieDetail.releaseStatus === RELEASED
                        ? `/buytickets/${movieDetail.name}/${id}`
                        : "/"
                    }
                  >
                    {movieDetail.releaseStatus === RELEASED
                      ? "Book Tickets"
                      : "Coming Soon"}
                  </Link>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MovieDetails;
