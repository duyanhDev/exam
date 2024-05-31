import React, { useState } from "react";
import Select from "react-select";
import "./Questions.scss";
import { FaPlus, FaMinus } from "react-icons/fa";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

const Questions = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});

  const [questions, setQuesttion] = useState([
    {
      id: uuidv4(),
      desciption: "questions 1",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          desciption: "answer 1",
          isCorrect: false,
        },
      ],
    },
  ]);

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        desciption: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            desciption: "",
            isCorrect: false,
          },
        ],
      };
      setQuesttion([...questions, newQuestion]);
    }
    if (type === "REMOVE") {
      let questionClone = _.cloneDeep(questions);
      questionClone = questionClone.filter((item) => {
        return item.id !== id;
      });
      setQuesttion(questionClone);
    }
  };

  const handleAddRemoveAnwser = (type, questionid, answersid) => {
    console.log("type, questionId,anwers", type, questionid, answersid);
    let questionClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        desciption: "",
        isCorrect: false,
      };

      let index = questionClone.findIndex((item) => item.id === questionid);
      questionClone[index].answers.push(newAnswer);
      setQuesttion(questionClone);
      console.log("index", index);
    }
    if (type === "REMOVE") {
      let index = questionClone.findIndex((item) => item.id === questionid);
      questionClone[index].answers = questionClone[index].answers.filter(
        (item) => {
          return item.id !== answersid;
        }
      );
      setQuesttion(questionClone);
    }
  };
  console.log("question:", questions);
  return (
    <div className="questions-container">
      <div className="title">
        <h1>Questions</h1>
      </div>

      <div className="add-new-question">
        <div className="col-6 form-group">
          <label>Select Quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={options}
          />
        </div>
        <div className="mt-3">Add questions:</div>

        {questions &&
          questions.length > 0 &&
          questions.map((item, index) => {
            return (
              <div className="mb-3" key={`index ${index + 1}`}>
                <div className="question-content">
                  <div className="form-floating description ">
                    <input
                      type="text"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      value={item.questions}
                    />
                    <label htmlFor="floatingInput">
                      Question {index + 1} Description
                    </label>
                  </div>
                  <div className="group_upload">
                    <label className="label-up" htmlFor="labelUpload">
                      <RiImageAddFill /> Upload Image
                    </label>
                    <input type={"file"} hidden id="labelUpload" />
                    <span>No file is upload</span>
                  </div>
                  <div className="btn-add">
                    <span>
                      <FaPlus
                        className="icon-add"
                        onClick={() => handleAddRemoveQuestion("ADD")}
                      />
                    </span>
                    {questions.length > 1 && (
                      <span>
                        <FaMinus
                          className="icon-remove"
                          onClick={() =>
                            handleAddRemoveQuestion("REMOVE", item.id)
                          }
                        />
                      </span>
                    )}
                  </div>
                </div>
                {item.answers &&
                  item.answers.length > 0 &&
                  item.answers.map((answers, index) => {
                    return (
                      <div className="q-answer" key={`anser ${index + 1}`}>
                        <div className="answers-content">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="flexCheckDefault"
                          />
                        </div>
                        <div className="form-floating answser-name ">
                          <input
                            type="text"
                            className="form-control iscorrect"
                            id="floatingInput"
                            placeholder="name@example.com"
                            value={answers.desciption}
                          />
                          <label htmlFor="floatingInput ">
                            Answer {index + 1}
                          </label>
                        </div>
                        <div className="btn-group">
                          <span
                            className="icon-size"
                            onClick={() =>
                              handleAddRemoveAnwser("ADD", item.id)
                            }
                          >
                            <AiOutlinePlusSquare className="icon-add" />
                          </span>
                          {item.answers.length > 1 && (
                            <span
                              className="icon-size"
                              onClick={() =>
                                handleAddRemoveAnwser(
                                  "REMOVE",
                                  item.id,
                                  answers.id
                                )
                              }
                            >
                              <AiOutlineMinusSquare className="icon-remove" />
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Questions;
