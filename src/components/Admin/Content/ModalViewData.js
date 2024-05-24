import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import { isEmpty } from "lodash";
const ModalViewData = (props) => {
  const { show, setShow, dataViewUser } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("Admin");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (!isEmpty(dataViewUser)) {
      // updata sate
      setEmail(dataViewUser.email);
      setUsername(dataViewUser.username);
      setRole(dataViewUser.role);
      // setImage("");
      if (dataViewUser.image) {
        setPreviewImage(`data:image/jpeg;base64,${dataViewUser.image}`);
      }
    }
  }, [dataViewUser]);

  const handleHidenView = () => {
    setShow(false);
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const handSumbitUser = async (e) => {
    e.preventDefault();

    const isValidEmail = validateEmail(email);

    if (!isValidEmail) {
      toast.error("Email không hợp lệ");
      return;
    }
  };

  return (
    <>
      <Modal
        show={show}
        onHide={handleHidenView}
        animation={false}
        size="xl"
        backdrop="static"
        className="modal-add-user"
      >
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="row g-3" onSubmit={handSumbitUser}>
            <div className="col-md-6">
              <label className="form-label">Email</label>
              <input
                disabled
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">Username</label>
              <input
                type="text"
                className="form-control"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="col-md-4">
              <label className="form-label">Role</label>
              <select
                className="form-select"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="ADMIN">Admin</option>
                <option value="USER">User</option>
              </select>
            </div>
            <div className="col-md-12">
              <label className="form-label label-upload" htmlFor="labelUpload">
                <FaPlus /> Upload File Image
              </label>
              <input
                type="file"
                hidden
                id="labelUpload"
                // onChange={handleUploadImage}
              />
            </div>
            <div className="col-md-12 img-preview">
              {previewImage ? (
                <img src={previewImage} alt="Preview" />
              ) : (
                <span>Preview Image</span>
              )}
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleHidenView}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalViewData;
