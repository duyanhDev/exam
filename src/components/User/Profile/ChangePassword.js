import { useState } from "react";
import { postUpdatePassword } from "../../../services/apiService";
import { toast } from "react-toastify";
const ChangePassword = () => {
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [ChangePassword, setChangePassword] = useState("");
  const handleUpdatePassword = async () => {
    let res = await postUpdatePassword(password, newPassword);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };

  return (
    <div className="container-password">
      <div className="form-group">
        <label className="form-label">Current Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">New Password</label>
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">Confirm Password</label>
        <input
          type="password"
          className="form-control"
          value={ChangePassword}
          onChange={(e) => setChangePassword(e.target.value)}
        />
      </div>
      <div className="btn">
        <button
          className="btn btn-warning"
          onClick={() => handleUpdatePassword()}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default ChangePassword;
