import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useTranslation } from "react-i18next";

const ModalResult = (props) => {
  const { show, setShow, dataModalResult, handleShowAnswer } = props;
  const handleClose = () => setShow(false);
  const { t } = useTranslation();
  const point = 10 / Number(dataModalResult.countTotal);
  const result = point * Number(dataModalResult.countCorrect);

  return (
    <>
      <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>KẾT QUẢ BÀI LÀM</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            {/* {t("quiz.total-question")}: */}
            <b>Count Total: {dataModalResult.countTotal} </b>
          </div>
          <div>
            {/* {t("quiz.total-correct")}: */}
            <b>Count Correct: {dataModalResult.countCorrect} </b>
          </div>
          <div>
            {/* {t("quiz.total-correct")}: */}

            <b>
              Points: {Number.isInteger(result) ? result : result.toFixed(2)}
            </b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              handleClose();
              handleShowAnswer();
            }}
          >
            {/* {t("quiz.show-answer")} */}
            ShowAnswer
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
