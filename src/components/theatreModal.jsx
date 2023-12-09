import MaterialTable from "@material-table/core";
import { Add, Delete } from "@material-ui/icons";
import { Button, Modal } from "react-bootstrap";
import { CLIENT } from "../constants";
import { cities } from "../util/cities";

const TheatreModal = ({
  showAddTheatreModal,
  showEditTheatreModal,
  resetState,
  editTheatre,
  addTheatre,
  theatreDetail,
  changeTheatreDetails,
  userType,
  movieList,
  isRequestProcessing,
  addOrRemoveScreening,
  updateOrAddTheatreDetail,
}) => {
  return (
    <Modal
      style={{ backdropFilter: "blur(8px)" }}
      show={showAddTheatreModal || showEditTheatreModal}
      onHide={resetState}
      backdrop="static"
      keyboard={false}
      centered
      size="lg md"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {showEditTheatreModal ? "Edit Theatre" : "Add Theatre"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={showEditTheatreModal ? editTheatre : addTheatre}>
          <div className="input-group mb-3">
            <span className="input-group-text">Name</span>
            <input
              type="text"
              name="name"
              value={theatreDetail.name}
              placeholder="Theatre Name"
              onChange={changeTheatreDetails}
              required
              className="form-control"
            />
          </div>
          <div className="input-group my-2">
            <span className="input-group-text">City</span>
            <select
              name="city"
              className="form-select form-select-sm"
              value={theatreDetail.city}
              onChange={changeTheatreDetails}
              required
            >
              <option>Select City</option>
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <div className="input-group my-2">
            <span className="input-group-text">Description</span>
            <textarea
              type="text"
              name="description"
              value={theatreDetail.description}
              placeholder="Description"
              onChange={changeTheatreDetails}
              required
              className="form-control"
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Pin Code</span>
            <input
              type="text"
              name="pinCode"
              placeholder="PinCode"
              value={theatreDetail.pinCode}
              onChange={changeTheatreDetails}
              required
              className="form-control"
            />
          </div>

          {userType === CLIENT && showEditTheatreModal && (
            <MaterialTable
              key={isRequestProcessing ? "loading" : "data"}
              title="Modify the screenings in your theatre"
              columns={[
                {
                  title: "Name",
                  field: "name",
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
              data={movieList.map((movie) => ({
                ...movie,
                id: movie._id,
              }))}
              actions={[
                (rowData) => {
                  const isMovieScreening =
                    theatreDetail.movies &&
                    theatreDetail.movies.includes(rowData._id);

                  return {
                    icon: isMovieScreening ? Delete : Add,
                    tooltip: isMovieScreening
                      ? "Remove screening"
                      : "Add screening",
                    onClick: () => {
                      addOrRemoveScreening(rowData);
                    },
                  };
                },
              ]}
            />
          )}

          <div className="input-group justify-content-center">
            <div className="m-1">
              <Button variant="danger" onClick={resetState}>
                Cancel
              </Button>
            </div>
            <div className="m-1">
              <Button
                variant="primary"
                onClick={updateOrAddTheatreDetail}
                disabled={isRequestProcessing}
              >
                {showEditTheatreModal
                  ? isRequestProcessing
                    ? "Editing theatre..."
                    : "Edit Theatre"
                  : isRequestProcessing
                  ? "Adding theatre..."
                  : "Add Theatre"}
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default TheatreModal;
