import MaterialTable from "@material-table/core";
import { Add, Delete, Edit } from "@material-ui/icons";
import { useState } from "react";
import { addNewTheatre } from "../api/theatre";
import { ADMIN, CLIENT } from "../constants";
import TheatreModal from "./theatreModal";
import { AxiosInstance } from "../util/axiosInstance";
import { toast } from "react-toastify";

const TheatreTable = ({
  fetchTheatresOfClient,
  theaterList,
  movieList,
  userType,
  setTheatreList,
}) => {
  const [theatreDetail, setTheatreDetail] = useState({});
  const [showAddTheatreModal, setShowAddTheatreModal] = useState(false);
  const [showEditTheatreModal, setShowEditTheatreModal] = useState(false);
  const [isRequestProcessing, setIsRequestProcessing] = useState(false);

  const resetState = () => {
    setShowEditTheatreModal(false);
    setShowAddTheatreModal(false);
    setTheatreDetail({
      name: "",
      description: "",
      city: "",
      pinCode: "",
      movies: [],
      ownerId: "",
    });
  };

  const editTheatre = (theatre) => {
    setTheatreDetail(theatre);
    setShowEditTheatreModal(true);
  };

  // const editTheatreInDb = () => {
  //   console.log("In edit");
  // };

  const deleteTheatre = async (theatre) => {
    const deletionId = theatre._id;
    try {
      await AxiosInstance.delete(`/mba/api/v1/theatres/${deletionId}`);
      // fetchTheatresOfClient();
      toast.success(`Theatre ${theatre.name} has been deleted successfully!`);
      setTheatreList(
        theaterList.filter((theatre) => theatre._id !== deletionId)
      );
    } catch (ex) {
      console.log(ex);
      toast.error(
        "Error occurred while deleting theatre. Please try again in a minute."
      );
    }
  };

  const addTheatre = (theatre) => {
    setTheatreDetail({});
    setShowAddTheatreModal(true);
  };

  const addTheatreInDb = (event) => {
    event.preventDefault();
    const { data } = addNewTheatre(theatreDetail);
  };

  const changeTheatreDetails = (event) => {
    setTheatreDetail({
      ...theatreDetail,
      [event.target.name]: event.target.value,
    });
  };

  const addOrRemoveScreening = async (movie) => {
    if (theatreDetail.movies.includes(movie._id)) {
      try {
        console.log("calling delete screening");
        setIsRequestProcessing(true);
        await AxiosInstance.put(
          `/mba/api/v1/theatres/${theatreDetail._id}/movies`,
          {
            movies: [movie._id],
            remove: "remove",
          }
        );
        toast.success(
          `Removed the screening of ${movie.name} from ${theatreDetail.name}.`
        );
      } catch (ex) {
        console.log(ex);
      } finally {
        setIsRequestProcessing(false);
      }
    } else {
      try {
        setIsRequestProcessing(true);
        await AxiosInstance.put(
          `/mba/api/v1/theatres/${theatreDetail._id}/movies`,
          {
            movies: [movie._id],
            add: "add",
          }
        );
        toast.success(
          `Added the screening of ${movie.name} to ${theatreDetail.name}.`
        );
      } catch (ex) {
        console.log(ex);
      } finally {
        setIsRequestProcessing(false);
      }
    }
  };

  const updateOrAddTheatreDetail = async (event) => {
    event.preventDefault();

    if (showEditTheatreModal) {
      try {
        setIsRequestProcessing(true);
        await AxiosInstance.put(`/mba/api/v1/theatres/${theatreDetail._id}`, {
          name: theatreDetail.name,
          city: theatreDetail.city,
          description: theatreDetail.description,
          pinCode: theatreDetail.pinCode,
        });
        toast.success(
          `Theatre details of ${theatreDetail.name} updated successfully.`
        );
        setTheatreList(
          theaterList.map((theatre) =>
            theatre._id === theatreDetail._id ? theatreDetail : theatre
          )
        );
        setShowEditTheatreModal(false);
      } catch (ex) {
        console.log(ex);
        toast.error(
          "Error occurred while updating theatre details. Please try again in a minute."
        );
      } finally {
        setIsRequestProcessing(false);
      }
    } else {
      try {
        setIsRequestProcessing(true);
        await AxiosInstance.post("/mba/api/v1/theatres", {
          name: theatreDetail.name,
          description: theatreDetail.description,
          city: theatreDetail.city,
          pinCode: theatreDetail.pinCode,
          movies: [],
          ownerId: localStorage.getItem("_id"),
        });
        toast.success(
          `Added new theatre, ${theatreDetail.name} , successfully.`
        );
        fetchTheatresOfClient();
        setShowAddTheatreModal(false);
      } catch (ex) {
        console.log(ex);
        toast.error(
          "Error occurred while adding new theatre. Please try again in a minute."
        );
      } finally {
        setIsRequestProcessing(false);
      }
    }
  };
  return (
    <>
      <MaterialTable
        title={
          localStorage.getItem("userTypes") === "CLIENT"
            ? "Theatres owned by you"
            : "Theatres"
        }
        data={theaterList.map((theatre) => ({
          ...theatre,
          id: theatre._id,
        }))}
        columns={[
          {
            title: "Name",
            field: "name",
          },
          {
            title: "City",
            field: "city",
          },
          {
            title: "Description",
            field: "description",
          },
          {
            title: "Pin Code",
            field: "pinCode",
          },
        ]}
        actions={[
          {
            icon: Delete,
            tooltip: "Delete Theater",
            onClick: (event, rowData) => deleteTheatre(rowData),
          },
          {
            icon: Edit,
            tooltip: "Edit Theater",
            onClick: (event, rowData) => editTheatre(rowData),
          },
          ...(userType === CLIENT
            ? [
                {
                  icon: Add,
                  tooltip: "Add Theater",
                  isFreeAction: true,
                  onClick: (event) => addTheatre(),
                },
              ]
            : []),
        ]}
      />
      <TheatreModal
        showAddTheatreModal={showAddTheatreModal}
        showEditTheatreModal={showEditTheatreModal}
        resetState={resetState}
        addTheatre={addTheatreInDb}
        editTheatre={editTheatre}
        theatreDetail={theatreDetail}
        changeTheatreDetails={changeTheatreDetails}
        userType={userType}
        movieList={movieList}
        isRequestProcessing={isRequestProcessing}
        setIsRequestProcessing={setIsRequestProcessing}
        addOrRemoveScreening={addOrRemoveScreening}
        updateOrAddTheatreDetail={updateOrAddTheatreDetail}
      />
    </>
  );
};

export default TheatreTable;
