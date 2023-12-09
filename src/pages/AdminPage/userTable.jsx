import MaterialTable from "@material-table/core";
import { Edit } from "@material-ui/icons";
import { useState } from "react";
import { toast } from "react-toastify";
import { AxiosInstance } from "../../util/axiosInstance";
import UserModal from "./userModal";

const UserTable = ({ userList, setUserList }) => {
  const [showUserModal, setShowUserModal] = useState(false);
  const [userDetail, setUserDetail] = useState({});

  const editUser = (user) => {
    setUserDetail(user);
    setShowUserModal(true);
  };

  const changeUserDetails = (event) => {
    setUserDetail({
      ...userDetail,
      [event.target.name]: event.target.value,
    });
  };

  const updateUserDetail = async (event) => {
    event.preventDefault();
    try {
      await AxiosInstance.put(
        `/mba/api/v1/users/details/${userDetail.userId}`,
        {
          userId: userDetail.userId,
          userType: userDetail.userType,
          userStatus: userDetail.userStatus,
          name: userDetail.name,
          email: userDetail.email,
        }
      );
      toast.success("User details updated successfully");
      setUserList(
        userList.map((user) =>
          user.userId === userDetail.userId ? userDetail : user
        )
      );
      setShowUserModal(false);
    } catch (ex) {
      toast.error(
        "Error occured while updating user details. Please try again in a minute."
      );
    }
  };

  const resetState = () => {
    setShowUserModal(false);
    setUserDetail({
      ...userDetail,
      name: "",
      email: "",
      userType: "",
      userStatus: "",
    });
  };

  return (
    <>
      <MaterialTable
        title="Users"
        data={userList.map((user) => ({
          ...user,
          id: user._id,
        }))}
        columns={[
          {
            title: "User Id",
            field: "userId",
          },
          {
            title: "Name",
            field: "name",
          },
          {
            title: "Email",
            field: "email",
          },
          {
            title: "Role",
            field: "userType",
          },
          {
            title: "Status",
            field: "userStatus",
          },
        ]}
        actions={[
          {
            icon: Edit,
            tooltip: "Edit User Details",
            onClick: (event, rowData) => editUser(rowData),
          },
        ]}
      />
      <UserModal
        showUserModal={showUserModal}
        resetState={resetState}
        userDetail={userDetail}
        changeUserDetails={changeUserDetails}
        updateUserDetail={updateUserDetail}
      />
    </>
  );
};

export default UserTable;
