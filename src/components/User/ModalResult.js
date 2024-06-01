import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { toast } from "react-toastify";

function ModalResult(props) {
  const { show, setShow, dataModalResult } = props;
  console.log("check data dataModalResult", dataModalResult);

  const handleClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Show Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            Total Questions:<b> {dataModalResult.countTotal}</b>
          </div>
          <div>
            Total correct answer: <b>{dataModalResult.countCorrect}</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Show answers
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ModalResult;
