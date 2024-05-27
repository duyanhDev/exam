import { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { getDataQuiz } from "../../services/apiService";
import _ from "lodash";
import "./DetailQuiz.scss";
import Question from "./Question";
const DetailQuiz = (props) => {
  const params = useParams();
  const quizId = params.id;
  const location = useLocation();

  const [dataQuiz, setDataQuiz] = useState([]);

  const [index, setIndex] = useState(0);

  console.log("location", location);
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
          console.log("value", value, "key", key);
          let answers = [];
          let questionDescription,
            image = null;
          value.forEach((item, index) => {
            if (index === 0) {
              questionDescription = item.description;
              image = item.image;
            }

            item.answers.isSelect = false;
            answers.push(item.answers);
          });

          return { quizId: key, answers, questionDescription, image };
        })
        .value();

      setDataQuiz(data);
    }
  };
  console.log("check data ", dataQuiz);

  const handlePrev = () => {
    if (index - 1 < 0) return;
    setIndex(index - 1);
  };

  const handleNext = () => {
    if (dataQuiz && dataQuiz.length > index + 1) setIndex(index + 1);
  };

  const handleCheckbox = (answerID, questionId) => {
    let dataQuizClone = _.cloneDeep(dataQuiz);

    let question = dataQuizClone.find((item) => +item.quizId === +questionId);
    if (question && question.answers) {
      let b = question.answers.map((item) => {
        if (+item.id === +answerID) {
          item.isSelect = !item.isSelect;
        }
        return item;
      });
      question.answers = b;
      console.log(b);
    }

    let index = dataQuizClone.findIndex((item) => +item.quizId === +questionId);

    if (index > -1) {
      dataQuizClone[index] = question;
      setDataQuiz(dataQuizClone);
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
          <Question
            index={index}
            handleCheckbox={handleCheckbox}
            data={dataQuiz && dataQuiz.length > 0 ? dataQuiz[index] : []}
          />
        </div>
        <div className="footer">
          <button className="btn btn-secondary" onClick={handlePrev}>
            Prev
          </button>
          <button className="btn btn-primary" onClick={handleNext}>
            Next
          </button>
          <button className="btn btn-warning">Finish</button>
        </div>
      </div>
      <div className="rigt-content">count down</div>
    </div>
  );
};

export default DetailQuiz;
