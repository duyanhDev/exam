import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlus } from "react-icons/fa";
import { toast } from "react-toastify";
import _, { isEmpty } from "lodash";
import Select from "react-select";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageShowQuiz = (props) => {
  const { show, setShow, datashow } = props;

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState({ value: "EASY", label: "EASY" });
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  const handleClose = () => {
    setShow(false);
    setName("");
    setDescription("");
    setType({ value: "EASY", label: "EASY" });
    setImage(null);
    setPreviewImage("");
  };

  useEffect(() => {
    if (!isEmpty(datashow)) {
      setName(datashow.name);
      setDescription(datashow.description);
      setType(options.find((option) => option.value === datashow.difficulty));
      if (datashow.image) {
        setPreviewImage(`data:image/jpeg;base64,${datashow.image}`);
      }
    }
  }, [datashow]);

  const handleUploadImage = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
      setImage(e.target.files[0]);
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      animation={false}
      size="xl"
      backdrop="static"
      className="modal-add-user"
    >
      <Modal.Header closeButton>
        <Modal.Title>Update Quiz</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="add-new">
          <fieldset className="border rounded-3 p-3">
            <legend className="float-none w-auto px-3">Update Quiz</legend>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="your quiz name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label htmlFor="floatingInput">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <label htmlFor="floatingPassword">Description</label>
            </div>
            <div className="my-3">
              <Select
                value={type}
                onChange={(selectedOption) => setType(selectedOption)}
                options={options}
              />
            </div>
            <div className="more-action mb-3">
              <label
                className="form-label label-upload mb-1"
                htmlFor="labelUpload1"
              >
                <FaPlus /> Upload File Quiz
              </label>
              <input
                type="file"
                hidden
                id="labelUpload1"
                onChange={handleUploadImage}
              />
              <div className="img-preview mt-2">
                {previewImage ? (
                  <img src={previewImage} alt="Preview" />
                ) : (
                  <span>No file</span>
                )}
              </div>
            </div>
          </fieldset>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ManageShowQuiz;
