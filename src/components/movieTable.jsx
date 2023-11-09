import MaterialTable from "@material-table/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { useState } from "react";
import { ADMIN } from "../constants";
import MovieModal from "./movieModal";

import { removeMovie } from "../api/movie";
import { toast } from "react-toastify";

const MovieTable = ({ movieList, userType, setMovieList }) => {
  const [movieDetail, setMovieDetail] = useState({});
  const [showAddMovieModal, setShowAddMovieModal] = useState(false);
  const [showEditMovieModal, setShowEditMovieModal] = useState(false);

  const addMovie = async (movie) => {
    setShowAddMovieModal(true);
    try {
      const data = await addMovie(movie);
      setMovieDetail(data);
    } catch (ex) {
      console.log("error while adding the movie", ex);
    }
  };

  const editMovie = (movie) => {
    setMovieDetail(movie);
    setShowEditMovieModal(true);
  };

  const deleteMovie = async (movie) => {
    try {
      const data = await removeMovie(movie._id);
      console.log(data);

      setMovieList(movieList.filter((m) => m._id !== movie._id));
      toast.success("Movie Deleted successfully");
    } catch (error) {
      console.error("Error occurred while deleting the movie:", error);
    }
  };

  const changeMovieDetails = (event) => {
    setMovieDetail({
      ...movieDetail,
      [event.target.name]: event.target.value,
    });
  };

  const resetState = () => {
    setShowEditMovieModal(false);
    setShowAddMovieModal(false);
    setShowEditMovieModal(false);

    setMovieDetail({});
  };

  return (
    <>
      <MaterialTable
        title="Movies"
        data={movieList}
        columns={[
          {
            title: "Poster",
            field: "posterUrl",
            render: (rowData) => (
              <img src={rowData.posterUrl} alt="" height="100" width="80" />
            ),
          },
          {
            title: "Name",
            field: "name",
          },
          {
            title: "Director",
            field: "director",
          },
          {
            title: "Release Date",
            field: "releaseDate",
          },
          {
            title: "Release Status",
            field: "releaseStatus",
          },
        ]}
        actions={
          userType === ADMIN
            ? [
                {
                  icon: Delete,
                  tooltip: "Delete Movie",
                  onClick: (event, rowData) => deleteMovie(rowData),
                },
                {
                  icon: Edit,
                  tooltip: "Edit Movie",
                  onClick: (event, rowData) => editMovie(rowData),
                },
                {
                  icon: Add,
                  tooltip: "Add Movie",
                  isFreeAction: true,
                  onClick: (event) => addMovie(),
                },
              ]
            : []
        }
      />
      <MovieModal
        showAddMovieModal={showAddMovieModal}
        showEditMovieModal={showEditMovieModal}
        resetState={resetState}
        editMovie={editMovie}
        addMovie={addMovie}
        movieDetail={movieDetail}
        changeMovieDetails={changeMovieDetails}
      />
    </>
  );
};

export default MovieTable;
