import "./ManageQuiz.scss";
import Select from "react-select";
import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { postCreateQuiz, getViewQuiz } from "../../../../services/apiService";
import { toast } from "react-toastify";
import Accordion from "react-bootstrap/Accordion";
import ManageViewQuiz from "./ManageViewQuiz";
import ManagelUpdateQuiz from "./ManagelUpdateQuiz";
import MangageDeleteQuiz from "./MangageDeleteQuiz";
import ManageShowQuiz from "./ManageShowQuiz";

const options = [
  { value: "EASY", label: "EASY" },
  { value: "MEDIUM", label: "MEDIUM" },
  { value: "HARD", label: "HARD" },
];

const ManageQuiz = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState("EASY");
  const [image, setImage] = useState(null);

  const [previewImage, setPreviewImage] = useState("");

  const [show, setShow] = useState(false);

  const [showDelete, setShowDelete] = useState(false);

  const [dataUpdateQuiz, setDataUpdateQuiz] = useState([]);

  const [dataQuizClear, setDataDelteQuiz] = useState([]);

  const [LisQuiz, setLisQuiz] = useState([]);

  const [showView, setShowView] = useState(false);

  const [showDataView, setDataShow] = useState([]);

  const handleChanefile = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setPreviewImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  // save quiz

  const handleSaveQuiz = async () => {
    if (!name || !description) {
      toast.error("Name or description is require");
      return;
    }
    let res = await postCreateQuiz(description, name, type?.value, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
    setName("");
    setDescription("");
    setImage(null);
    setPreviewImage("");
    await fectQuiz();
  };
  // view quzi

  const handelViewQuiz = (item) => {
    setDataShow(item);
    setShowView(true);
  };

  // update
  const handelEditQuiz = (item) => {
    setShow(true);
    setDataUpdateQuiz(item);
  };

  // delete

  const handledeleteQuiz = (item) => {
    console.log(item);
    setDataDelteQuiz(item);
    setShowDelete(true);
  };

  // get api

  useEffect(() => {
    fectQuiz();
  }, []);

  const fectQuiz = async () => {
    let res = await getViewQuiz();
    console.log("res table", res);
    if (res && res.EC === 0) {
      setLisQuiz(res.DT);
    }
  };
  return (
    <div className="quiz-container">
      <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>ManageQuiz</Accordion.Header>
          <Accordion.Body>
            <hr />
            <div className="add-new">
              <fieldset className="border rounded-3 p-3">
                <legend className="float-none w-auto px-3">Add New Quiz</legend>
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
                <div className="form-floating">
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
                    defaultValue={type}
                    onChange={setType}
                    options={options}
                  />
                </div>
                <div className="more-action">
                  <div className="col-md-12">
                    <label
                      className="form-label label-upload mb-1"
                      htmlFor="labelUpload"
                    >
                      <FaPlus /> Upload File Quiz
                    </label>
                    <input
                      type="file"
                      hidden
                      id="labelUpload"
                      onChange={(e) => handleChanefile(e)}
                    />
                  </div>

                  <div className="col-md-12 img-preview">
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" />
                    ) : (
                      <span>No file</span>
                    )}
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-warning"
                      onClick={() => handleSaveQuiz()}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </fieldset>
            </div>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>

      <div className="list-detail">
        <ManageViewQuiz
          handelViewQuiz={handelViewQuiz}
          handelEditQuiz={handelEditQuiz}
          handledeleteQuiz={handledeleteQuiz}
          LisQuiz={LisQuiz}
        />
        <ManagelUpdateQuiz
          show={show}
          setShow={setShow}
          dataUpdateQuiz={dataUpdateQuiz}
          fectQuiz={fectQuiz}
        />

        <MangageDeleteQuiz
          show={showDelete}
          setShow={setShowDelete}
          dataQuizClear={dataQuizClear}
          fectQuiz={fectQuiz}
        />

        <ManageShowQuiz
          show={showView}
          setShow={setShowView}
          datashow={showDataView}
        />
      </div>
    </div>
  );
};

export default ManageQuiz;
