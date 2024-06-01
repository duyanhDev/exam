import React, { useEffect, useState } from "react";
import Select from "react-select";
import { toast } from "react-toastify";
import {
  getViewQuiz,
  getAllUsers,
  postAssingQuiz,
} from "../../../../services/apiService";
const AssignQuiz = (props) => {
  const [LisQuiz, setLisQuiz] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [ListUser, setLisUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState({});
  useEffect(() => {
    fectQuiz();
    fectUser();
  }, []);

  const fectQuiz = async () => {
    let res = await getViewQuiz();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name} `,
        };
      });

      setLisQuiz(newQuiz);
    }
  };
  const fectUser = async () => {
    let res = await getAllUsers();
    console.log(res);
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });

      setLisUser(newQuiz);
    }
  };

  const handleAssign = async () => {
    let res = await postAssingQuiz(selectedQuiz.value, selectedUser.value);
    if (res && res.EC === 0) {
      toast.success(res.EM);
    } else {
      toast.error(res.EM);
    }
  };
  return (
    <div className="assign-quiz-container row">
      <div className="col-6 form-group select-container ">
        <label>Select Quiz</label>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={LisQuiz}
          className="custom-select" // Thêm lớp tùy chỉnh cho Select
        />
      </div>
      <div className="col-6 form-group select-container">
        <label>Select Quiz</label>
        <Select
          defaultValue={selectedUser}
          onChange={setSelectedUser}
          options={ListUser}
          className="custom-select" // Thêm lớp tùy chỉnh cho Select
        />
      </div>
      <div
        className="btn  btn-warning mt-3 w-20"
        onClick={() => handleAssign()}
      >
        Assign
      </div>
    </div>
  );
};

export default AssignQuiz;
