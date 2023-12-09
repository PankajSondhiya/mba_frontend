import { Button, Modal } from "react-bootstrap";

const MovieModal = ({
  showAddMovieModal,
  showEditMovieModal,
  resetState,
  editMovie,
  addMovie,
  movieDetail,
  addOrEditMovieDetails,
  changeMovieDetails,
  isRequestProcessing,
}) => {
  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  return (
    <Modal
      style={{ backdropFilter: "blur(10px)" }}
      show={showAddMovieModal || showEditMovieModal}
      onHide={resetState}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {showEditMovieModal ? "Edit Movie" : "Add Movie"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={showEditMovieModal ? addOrEditMovieDetails : addMovie}>
          <div className="input-group my-2">
            <span className="input-group-text">Name</span>
            <input
              type="text"
              name="name"
              className="form-control"
              value={movieDetail.name}
              placeholder="Movie Name"
              onChange={changeMovieDetails}
              required
            />
          </div>
          <div className="input-group my-2">
            <span className="input-group-text">Description</span>
            <textarea
              type="text"
              name="description"
              className="form-control"
              value={movieDetail.description}
              placeholder="Description"
              onChange={changeMovieDetails}
              required
            />
          </div>

          <div className="input-group my-2">
            <span className="input-group-text">Director</span>
            <input
              type="text"
              name="director"
              value={movieDetail.director}
              placeholder="director"
              onChange={changeMovieDetails}
              required
              className="form-control"
            />
          </div>

          <div className="input-group my-2">
            <span className="input-group-text">Language</span>
            <input
              type="text"
              name="language"
              value={movieDetail.language}
              placeholder="language"
              onChange={changeMovieDetails}
              required
              className="form-control"
            />
          </div>

          <div className="input-group my-2 ">
            <span className="input-group-text">Poster URL</span>
            <input
              type="text"
              name="posterUrl"
              value={movieDetail.posterUrl}
              placeholder="posterUrl"
              onChange={changeMovieDetails}
              required
              className="form-control"
            />
          </div>

          <div className="input-group my-2 ">
            <span className="input-group-text">Trailer URL</span>
            <input
              type="text"
              name="trailerUrl"
              value={movieDetail.trailerUrl}
              placeholder="trailerUrl"
              onChange={changeMovieDetails}
              required
              className="form-control"
            />
          </div>

          <div className="input-group my-2">
            <span className="input-group-text">Release Status</span>
            <select
              name="releaseStatus"
              value={movieDetail.releaseStatus}
              onChange={changeMovieDetails}
              defaultValue="RELEASED"
              required
              className="form-select form-select-sm"
            >
              <option value="RELEASED">RELEASED </option>
              <option value="UNRELEASED">UNRELEASED</option>
              <option value="BLOCKED">BLOCKED</option>
            </select>
          </div>

          <div className="input-group my-2">
            <span className="input-group-text">Release date</span>
            <input
              type="date"
              name="releaseDate"
              value={
                movieDetail.releaseDate
                  ? formatDate(movieDetail.releaseDate)
                  : ""
              }
              placeholder="releaseDate"
              onChange={changeMovieDetails}
              required
              className="form-control"
            />
          </div>

          <br />
          <div className="input-group justify-content-center">
            <div className="m-1">
              <Button variant="danger" onClick={resetState}>
                Cancel
              </Button>
            </div>
            <div className="m-1">
              <Button
                variant="primary"
                onClick={addOrEditMovieDetails}
                disabled={isRequestProcessing}
              >
                {showEditMovieModal
                  ? isRequestProcessing
                    ? "Editing movie..."
                    : "Edit Movie"
                  : isRequestProcessing
                  ? "Adding movie..."
                  : "Add Movie"}
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default MovieModal;
