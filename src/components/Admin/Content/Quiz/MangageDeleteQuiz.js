import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { delteQuizData } from "../../../../services/apiService";
import { toast } from "react-toastify";

function MangageDeleteQuiz(props) {
  const { show, setShow, dataQuizClear } = props;
  const handleClose = () => {
    setShow(false);
  };

  const handeleteUser = async () => {
    try {
      const res = await delteQuizData(dataQuizClear.id);
      console.log(res);
      if (res.DT && res.EC === 0) {
        toast.success(res.EM);
        // await props.fetchListUsers();
        // props.setCurrentPage(1);
        // await props.fetchListUsersWithPaginate(1);
        setShow(false);
        await props.fectQuiz();
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
          Bạn có muốn xóa cái Quiz <b>{dataQuizClear.name}</b> này không ?
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

export default MangageDeleteQuiz;
