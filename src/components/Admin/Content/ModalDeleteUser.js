import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteDataUser } from "../../../services/apiService";
import { toast } from "react-toastify";

function ModalDelteUser(props) {
  const { show, setShow, dataDelete } = props;

  const handleClose = () => {
    setShow(false);
  };

  const handeleteUser = async () => {
    try {
      const res = await deleteDataUser(dataDelete.id);
      console.log(res);
      if (res.DT && res.EC === 0) {
        toast.success(res.EM);
        // await props.fetchListUsers();
        props.setCurrentPage(1);
        await props.fetchListUsersWithPaginate(1);
        setShow(false);
      }
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Bạn có muốn tên người dùng có địa chỉ email = {dataDelete.email} này
          không
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handeleteUser}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalDelteUser;
