import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import _ from "lodash";
import { useSelector } from "react-redux";
import { postUpdateProfile } from "../../../services/apiService";
import "./UpdateUser.scss";

const UpdateUser = () => {
  const accout = useSelector((state) => state.user.accout);
  console.log(accout);

  const handleUploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [image, setImage] = useState("");
  const [role, setRole] = useState("Admin");
  const [previewImage, setPreviewImage] = useState("");

  useEffect(() => {
    if (accout && !_.isEmpty(accout)) {
      setEmail(accout.email);
      setUsername(accout.username);
      setRole(accout.role);
      if (accout.image) {
        setPreviewImage(`data:image/jpeg;base64,${accout.image}`);
      }
    }
  }, [accout]);

  const handleSumbitUpdate = async () => {
    let res = await postUpdateProfile(username, image);
    if (res && res.EC === 0) {
      setUsername(res.DT.username);
      setImage(res.DT.image);
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <>
      <form>
        <div className="form-container">
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              disabled
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              disabled
              className="form-select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="ADMIN">Admin</option>
              <option value="USER">User</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>
        <div className="col-md-12">
          <label className="form-label label-upload" htmlFor="labelUpload">
            <FaPlus /> Upload File Image
          </label>
          <input
            type="file"
            hidden
            id="labelUpload"
            onChange={handleUploadImage}
          />
        </div>
        <div className="img-preview">
          {previewImage ? (
            <img src={previewImage} alt="Preview" className="img_update" />
          ) : (
            <span>Preview Image</span>
          )}
        </div>

        <button
          className="btn btn-warning"
          type="button"
          onClick={() => handleSumbitUpdate()}
        >
          Save
        </button>
      </form>
    </>
  );
};

export default UpdateUser;
