import "./Profile.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Modal from "react-bootstrap/Modal";
import UpdateUser from "./UpdateUser";
import ChangePassword from "./ChangePassword";
import HistoryUser from "./HistoryUser";
import { useTranslation, Trans } from "react-i18next";
const Profile = (props) => {
  const handleClose = () => props.setShow(false);
  const { t } = useTranslation();
  return (
    <div className="profile-user">
      <Modal
        show={props.isCheckProfile}
        onHide={handleClose}
        backdrop="static"
        className="custom-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("Profile.Home")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs id="controlled-tab-example" className="mb-3">
            <Tab eventKey="home" title={t("Profile.User")}>
              <UpdateUser />
            </Tab>
            <Tab eventKey="profile" title={t("Profile.Password")}>
              <ChangePassword />
            </Tab>
            <Tab eventKey="contact" title={t("Profile.History")}>
              <HistoryUser />
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Profile;
