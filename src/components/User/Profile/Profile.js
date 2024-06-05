import "./Profile.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import UpdateUser from "./UpdateUser";
import ChangePassword from "./ChangePassword";
import HistoryUser from "./HistoryUser";

const Profile = (props) => {
  const handleClose = () => props.setShow(false);

  return (
    <div className="profile-user">
      <Modal
        show={props.isCheckProfile}
        onHide={handleClose}
        backdrop="static"
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Manage Personal Page</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs id="controlled-tab-example" className="mb-3">
            <Tab eventKey="home" title="User Infomation">
              <UpdateUser />
            </Tab>
            <Tab eventKey="profile" title="Change Password">
              <ChangePassword />
            </Tab>
            <Tab eventKey="contact" title="Contact">
              <HistoryUser />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
