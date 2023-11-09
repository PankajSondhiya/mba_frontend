import { Button, Form, Modal, ModalBody, ModalFooter } from "react-bootstrap";

const UserModal = ({
  showUserModal,
  resetState,
  userDetail,
  changeUserDetails,
  updateUserDetail,
}) => {
  return (
    <Modal
      show={showUserModal}
      onHide={resetState}
      centered
      backdrop="static"
      keyboard
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit User Details</Modal.Title>
      </Modal.Header>
      <ModalBody>
        <form>
          <h5 className="card-subtitle mb-2 text-primary lead">
            User ID: {userDetail.userId}
          </h5>
          <hr />
          <div className="input-group mb-3">
            <span className="input-group-text">Name</span>
            <input
              type="text"
              className="form-control"
              name="name"
              value={userDetail.name}
              onChange={changeUserDetails}
            />
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Email</span>
            <input
              type="text"
              className="form-control"
              name="email"
              value={userDetail.email}
              onChange={changeUserDetails}
            />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text">Type</span>
            <Form.Select
              aria-label="User Type Selection"
              value={userDetail.userType}
              onChange={changeUserDetails}
              name="userType"
            >
              <option value="CUSTOMER">CUSTOMER</option>
              <option value="CLIENT">CLIENT</option>
              <option value="ADMIN">ADMIN</option>
            </Form.Select>
          </div>
          <div className="input-group mb-3">
            <span className="input-group-text">Status</span>
            <Form.Select
              aria-label="User Status Selection"
              value={userDetail.userStatus}
              onChange={changeUserDetails}
              name="userStatus"
            >
              <option value="APPROVED">APPROVED</option>
              <option value="REJECTED">REJECTED</option>
              <option value="PENDING">PENDING</option>
            </Form.Select>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button variant="secondary" onClick={resetState}>
          Close
        </Button>
        <Button variant="primary" onClick={updateUserDetail}>
          Update
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserModal;
