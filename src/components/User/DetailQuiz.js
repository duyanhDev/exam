import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz, postSubmitQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
import ModalResult from "./ModalResult";
import RightContent from "./ContentQ/RightContent";
import ShowAnswer from "./ShowAnswer";
const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();

  const [dataQuiz, setDataQuiz] = useState([]);

  const [index, setIndex] = useState(0);

  // hiên modal

  const [isShowModalResult, setIsShowModalResult] = useState(false);

  // data Modal result

  const [dataModalResult, setDataModalResult] = useState("");

  const [isChecKShowModal, setIsCheckModal] = useState(false);

  const handleShowAnswer = () => {
    const showAnswer = dataModalResult.quizData;
    console.log(showAnswer);

    setIsCheckModal(true);
  };

  // mooxi laan quizID thay doi thi api thay doi
  useEffect(() => {
    fectQuestions();
  }, [quizId]);

  const fectQuestions = async () => {
    let res = await getDataQuiz(quizId);
    if (res && res.EC === 0) {
      let raw = res.DT;
      let data = _.chain(raw)
        // Group the elements of Array based on `color` property
        .groupBy("id")
        // `key` is group's name (color), `value` is the array of objects
        .map((value, key) => {
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }

            item.answers.isSelected = false;
            answers.push(item.answers);
          });

          return { questionId: key, answers, questionDescription, image };
        })
        .value();

      setDataQuiz(data);
    }
  };

  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleCheckbox = (answerID, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz); // react doesn't merge state

    let question = dataQuizClone.find(
      (item) => +item.questionId === +questionId
    );
    if (question && question.answers) {
      question.answers = question.answers.map((item) => {
        if (+item.id === +answerID) {
          item.isSelected = !item.isSelected;
        }
        return item;
      });
    }

    let index = dataQuizClone.findIndex(
      (item) => +item.questionId === +questionId
    );

    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
    }
  };

  // finish xử lí data

  const handleFinishQuiz = async () => {
    //   {
    //     "quizId": 1,
    //     "answers": [
    //         {
    //             "questionId": 1,
    //             "userAnswerId": [3]
    //         },
    //         {
    //             "questionId": 2,
    //             "userAnswerId": [6]
    //         }
    //     ]
    // }
    let payload = {
      quizId: +quizId,
      answers: [],
    };
    let answers = [];

    // todo

    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((question) => {
        let questionId = question.questionId;
        let userAnswerId = [];

        question.answers.forEach((a) => {
          if (a.isSelected === true) {
            userAnswerId.push(a.id);
          }
        });
        answers.push({
          questionId: +questionId,
          userAnswerId: userAnswerId,
        });
      });
      payload.answers = answers;
      console.log("final payload", payload);

      //sumbit Api

      let res = await postSubmitQuiz(payload);
      console.log("check res", res);
      if (res && res.EC === 0) {
        setDataModalResult({
          countCorrect: res.DT.countCorrect,
          countTotal: res.DT.countTotal,
          quizData: res.DT.quizData,
        });
        setIsShowModalResult(true);
      } else {
        alert("some thing wrongs");
      }
    }
  };

  return (
    <div className="detail-quiz-container">
      <div className="left-content">
        <div className="title">
          <h1 className="title-quiz">
            Quiz {quizId} {location?.state?.quizTitle}
            <hr></hr>
          </h1>
        </div>
        <div className="q-body">
          <img />
        </div>
        <div className="q-content">
          {isChecKShowModal ? (
            <ShowAnswer
              index={index}
              handleCheckbox={handleCheckbox}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
              dataModalResult={dataModalResult}
            />
          ) : (
            <Question
              index={index}
              handleCheckbox={handleCheckbox}
              data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
              dataModalResult={dataModalResult}
            />
          )}
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={handlePrev}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
          <button
            onClick={() => handleFinishQuiz()}
            className="btn btn-warning"
          >
            Finish
          </button>
        </div>
      </div>
      <div className="rigt-content">
        <RightContent
          dataQuiz={dataQuiz}
          handleFinishQuiz={handleFinishQuiz}
          setIndex={setIndex}
        />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataModalResult={dataModalResult}
        handleShowAnswer={handleShowAnswer}
      />
      <ShowAnswer />
    </div>
  );
};

export default DetailQuiz;
