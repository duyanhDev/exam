import ModelCreateUser from "./ModelCreateUser";
import "./ManageUser.scss";
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";
import TableUser from "./TableUser";
const ManageUsers = (props) => {
  const [showModalCreateuser, setShowCreteuser] = useState(false);
  const [listUsers, setListUsers] = useState([]);
  useEffect(() => {
    fetchListUsers();
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
    console.log("log get data", res);
  };

  const handleShowHidenModal = (value) => {
    setShowCreteuser(value);
  };
  return (
    <div className="manage-user-container">
      <div className="title">ManageUsers</div>
      <div className="users-content">
        <div className="btn-add-new">
          <button
            className=" btn btn-primary"
            onClick={() => setShowCreteuser(true)}
          >
            Add new user
          </button>
        </div>
        <div className="table-usres-container">
          <TableUser listUsers={listUsers} />
        </div>
        <ModelCreateUser
          show={showModalCreateuser}
          setShow={handleShowHidenModal}
          fetchListUsers={fetchListUsers}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
