import ModelCreateUser from "./ModelCreateUser";
import ModelUpdateUser from "./ModalUpdateUser";
import ModalViewData from "./ModalViewData";
import "./ManageUser.scss";
import { useEffect, useState } from "react";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService";
import ModalDelteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";
const ManageUsers = (props) => {
  const [showModalCreateuser, setShowCreteuser] = useState(false);

  // ẩn hiện update
  const [showModalUpdateUser, setModalUpdateUser] = useState(false);

  const [showViewModal, setViewModal] = useState(false);

  const [dataUpdate, setDataUpdate] = useState({});

  const [dataViewUser, setDataViewUser] = useState({});

  const [deteteUser, setDeleteUser] = useState(false);

  const [dataDelete, setDataDelete] = useState([]);

  const [pageCount, setPageCount] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);

  const handleClickBtnUpdateUser = (user) => {
    setModalUpdateUser(true);
    setDataUpdate(user);
  };

  const LIMIT_USER = 3;

  const handleClickView = (user) => {
    setViewModal(true);
    setDataViewUser(user);
  };

  const [listUsers, setListUsers] = useState([]);
  // render lại api
  useEffect(() => {
    fetchListUsersWithPaginate(1);
  }, []);

  const fetchListUsers = async () => {
    let res = await getAllUsers();
    if (res.EC === 0) {
      setListUsers(res.DT);
    }
  };

  const fetchListUsersWithPaginate = async (page) => {
    let res = await getUserWithPaginate(page, LIMIT_USER);
    if (res.EC === 0) {
      setPageCount(res.DT.totalPages);
      setListUsers(res.DT.users);
    }
  };

  const handleShowHidenModal = (value) => {
    setShowCreteuser(value);
  };
  const handleClickBHideUpdateUser = () => {
    setModalUpdateUser(false);
  };
  const handleHidenView = () => {
    setViewModal(false);
  };

  // reset cập nhật
  const resetUpdateDate = () => {
    setDataUpdate("");
  };

  // delete xóa
  const handleDeleteUser = (user) => {
    setDeleteUser(true);
    setDataDelete(user);
  };

  const handleHidenDelete = () => {
    setDeleteUser((prev) => !prev);
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
          <TableUserPaginate
            listUsers={listUsers}
            handleClickBtnUpdateUser={handleClickBtnUpdateUser}
            handleClickView={handleClickView}
            handleDeleteUser={handleDeleteUser}
            fetchListUsersWithPaginate={fetchListUsersWithPaginate}
            pageCount={pageCount}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
        <ModelCreateUser
          show={showModalCreateuser}
          setShow={handleShowHidenModal}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModelUpdateUser
          show={showModalUpdateUser}
          setShow={handleClickBHideUpdateUser}
          dataUpdate={dataUpdate}
          resetUpdateDate={resetUpdateDate}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
        <ModalViewData
          show={showViewModal}
          setShow={handleHidenView}
          dataViewUser={dataViewUser}
        />

        <ModalDelteUser
          show={deteteUser}
          setShow={handleHidenDelete}
          dataDelete={dataDelete}
          fetchListUsersWithPaginate={fetchListUsersWithPaginate}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default ManageUsers;
