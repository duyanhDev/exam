import React, { useEffect, useState } from "react";
import Select from "react-select";
import "./QuizQA.scss";
import { FaPlus, FaMinus } from "react-icons/fa";
import { AiOutlinePlusSquare, AiOutlineMinusSquare } from "react-icons/ai";
import { RiImageAddFill } from "react-icons/ri";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";
import Lightbox from "react-awesome-lightbox";

import {
  getViewQuiz,
  postCreateNewQuestionForQuiz,
  postCreateNewAnswerForQuestion,
  getQuizWithQA,
} from "../../../../services/apiService";

const QuizQA = (props) => {
  const [selectedQuiz, setSelectedQuiz] = useState({});
  const [isVaidQuestion, setiSValidQuestion] = useState(false);
  const [isVaidAnswer, setisVaidAnswer] = useState(false);

  const inittQuestion = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      isVaidQuestion: false,
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
          isVaidAnswer: false,
        },
      ],
    },
  ];
  const [questions, setQuesttion] = useState(inittQuestion);

  const [isPreviewImage, setiSPreviewImage] = useState(false);

  const [dataImagePreview, setDataImagePreview] = useState({
    title: "",
    url: "",
  });

  // gọi api Questions

  const [LisQuiz, setLisQuiz] = useState([]);

  useEffect(() => {
    fectQuiz();
  }, []);

  const fectQuiz = async () => {
    let res = await getViewQuiz();
    if (res && res.EC === 0) {
      let newQuiz = res.DT.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description} `,
        };
      });

      setLisQuiz(newQuiz);
    }
  };

  useEffect(() => {
    if (selectedQuiz && selectedQuiz.value) {
      fectQuizWithQA();
    }
  }, [selectedQuiz]);

  const urltoFile = (url, filename, mimeType) => {
    return fetch(url)
      .then((res) => res.arrayBuffer())
      .then((buf) => new File([buf], filename, { type: mimeType }));
  };

  //Usage example:

  const fectQuizWithQA = async () => {
    let res = await getQuizWithQA(selectedQuiz.value);
    console.log(res);

    if (res && res.EC === 0) {
      // convertbase 64
      let newQA = [];
      for (let i = 0; i < res.DT.qa.length; i++) {
        let q = res.DT.qa[i];
        if (q.imageFile) {
          q.imageName = `Question-${q.id}.png`;
          q.imageFile = await urltoFile(
            `data:image/png;base64,${q.imageFile}`,
            `Question-${q.id}.png`,
            `image/png`
          );
        }
        newQA.push(q);
      }
      console.log("check qa", newQA);
      setQuesttion(newQA);
    }
  };

  const handleAddRemoveQuestion = (type, id) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        imageName: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
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
    let questionClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      let index = questionClone.findIndex((item) => item.id === questionid);
      questionClone[index].answers.push(newAnswer);
      setQuesttion(questionClone);
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

  const handleOnchange = (type, questionsId, value) => {
    if (type === "QUESTION") {
      let questionClone = _.cloneDeep(questions);
      let index = questionClone.findIndex((item) => item.id === questionsId);
      if (index > -1) {
        questionClone[index].description = value;
        setQuesttion(questionClone);
      }
    }
  };

  const handleOnchangeFileQuestion = (questionsId, e) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionsId);
    if (index > -1 && e.target && e.target.files && e.target.files[0]) {
      questionClone[index].imageFile = e.target.files[0];
      questionClone[index].imageName = e.target.files[0].name;
      setQuesttion(questionClone);
    }
  };

  const handleAnwserQuestion = (type, answersid, questionsId, value) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionsId);
    if (index > -1) {
      questionClone[index].answers = questionClone[index].answers.map(
        (answers) => {
          if (answers.id === answersid) {
            if (type === "CHECKBOX") {
              answers.isCorrect = value;
            }
            if (type === "INPUT") {
              answers.description = value;
            }
          }
          return answers;
        }
      );

      setQuesttion(questionClone);
    }
  };
  const handleSumbitQuestionForQuiz = async () => {
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz!");
      return;
    }

    // validate answer
    let isVaidAnswer = true;
    let indexQ = 0,
      indexA = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isVaidAnswer = false;
          indexA = j;

          break;
        }
      }
      indexQ = i;
      if (isVaidAnswer === false) break;
    }

    if (isVaidAnswer === false) {
      for (const question of questions) {
        for (const answer of question.answers) {
          answer.isVaidAnswer = true;
          setisVaidAnswer(answer.isVaidAnswer);
        }
      }
      toast.error(`Not empty Answer ${indexA + 1} at question ${indexQ + 1}`);

      return;
    }
    // validate question

    let isVaildQ = true;
    let indexQ1 = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isVaildQ = false;
        indexQ1 = i;
        break;
      }
    }

    if (isVaildQ === false) {
      questions.isVaidAnswer = true;
      setiSValidQuestion(questions.isVaidAnswer);
      toast.error(`Not empty description for Question ${indexQ1 + 1}`);
      return;
    }

    for (const question of questions) {
      const q = await postCreateNewQuestionForQuiz(
        +selectedQuiz.value,
        question.description,
        question.imageFile
      );

      //sumbit answer
      for (const answer of question.answers) {
        await postCreateNewAnswerForQuestion(
          answer.description,
          answer.isCorrect,
          q.DT.id
        );
      }
    }
    toast.success("Create question and answer  succcced!");
    setQuesttion(inittQuestion);
  };

  const handlePreviewImage = (questionsId) => {
    let questionClone = _.cloneDeep(questions);
    let index = questionClone.findIndex((item) => item.id === questionsId);

    if (index > -1) {
      setDataImagePreview({
        url: URL.createObjectURL(questionClone[index].imageFile),
        title: questionClone[index].imageName,
      });
      setiSPreviewImage(true);
    }
  };

  return (
    <div className="questions-container">
      <div className="title"></div>

      <div className="add-new-question">
        <div className="col-6 form-group select-container">
          <label>Select Quiz</label>
          <Select
            defaultValue={selectedQuiz}
            onChange={setSelectedQuiz}
            options={LisQuiz}
            className="custom-select" // Thêm lớp tùy chỉnh cho Select
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
                    {isVaidQuestion ? (
                      <input
                        type="text"
                        className="form-control is-invalid"
                        // placeholder="name@example.com"
                        value={item.questions}
                        onChange={(e) =>
                          handleOnchange("QUESTION", item.id, e.target.value)
                        }
                      />
                    ) : (
                      <input
                        type="text"
                        className="form-control"
                        // placeholder="name@example.com"
                        value={item.description}
                        onChange={(e) =>
                          handleOnchange("QUESTION", item.id, e.target.value)
                        }
                      />
                    )}
                    <label>Question {index + 1} Description</label>
                  </div>
                  <div className="group_upload">
                    <label className="label-up" htmlFor={`${item.id}`}>
                      <RiImageAddFill /> Upload Image
                    </label>
                    <input
                      type={"file"}
                      hidden
                      id={`${item.id}`}
                      onChange={(e) => handleOnchangeFileQuestion(item.id, e)}
                    />
                    <span>
                      {item.imageName ? (
                        <span
                          style={{ cursor: "pointer" }}
                          onClick={() => handlePreviewImage(item.id)}
                        >
                          {item.imageName}
                        </span>
                      ) : (
                        "No file is upload"
                      )}
                    </span>
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
                            checked={answers.isCorrect}
                            onChange={(e) =>
                              handleAnwserQuestion(
                                "CHECKBOX",
                                answers.id,
                                item.id,
                                e.target.checked
                              )
                            }
                          />
                        </div>
                        <div className="form-floating answser-name ">
                          {isVaidAnswer ? (
                            <input
                              type="text"
                              className="form-control iscorrect is-invalid"
                              id="floatingInput"
                              placeholder="name@example.com"
                              value={answers.description}
                              onChange={(e) =>
                                handleAnwserQuestion(
                                  "INPUT",
                                  answers.id,
                                  item.id,
                                  e.target.value
                                )
                              }
                            />
                          ) : (
                            <input
                              type="text"
                              className="form-control iscorrect"
                              id="floatingInput"
                              placeholder="name@example.com"
                              value={answers.description}
                              onChange={(e) =>
                                handleAnwserQuestion(
                                  "INPUT",
                                  answers.id,
                                  item.id,
                                  e.target.value
                                )
                              }
                            />
                          )}
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

        {questions && questions.length > 0 && (
          <div>
            <button
              className="btn btn-warning"
              onClick={() => handleSumbitQuestionForQuiz()}
            >
              Save Question
            </button>
          </div>
        )}
        {isPreviewImage === true && (
          <Lightbox
            image={dataImagePreview.url}
            title={dataImagePreview.title}
            onClose={() => setiSPreviewImage(false)}
          ></Lightbox>
        )}
      </div>
    </div>
  );
};

export default QuizQA;
