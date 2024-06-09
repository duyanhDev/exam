import { useState } from "react";
import { postUpdatePassword } from "../../../services/apiService";
import { toast } from "react-toastify";
import { useTranslation, Trans } from "react-i18next";
const ChangePassword = () => {
  const { t } = useTranslation();
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
        <label className="form-label">{t("Profile.CurrentPassword")}</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">{t("Profile.NewPassword")}</label>
        <input
          type="password"
          className="form-control"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
      </div>
      <div className="form-group">
        <label className="form-label">{t("Profile.ConfirmPassword")}</label>
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
