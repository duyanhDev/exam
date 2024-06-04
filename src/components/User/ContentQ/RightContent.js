import { useRef } from "react";
import CoutDown from "./CoutDown";

const RightContent = (props) => {
  const { dataQuiz } = props;
  const refDiv = useRef([]);
  const onTimeup = () => {
    props.handleFinishQuiz();
  };

  const getClassQuestion = (question, index) => {
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => {
        return a.isSelected === true;
      });
      if (isAnswered) {
        return "question-item selected";
      }
    }
    return "question-item";
  };

  const handleCheckColor = (question, index) => {
    props.setIndex(index);
    if (refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "question-item clicked") {
          item.className = "question-item ";
        }
      });
    }
    if (question && question.answers.length > 0) {
      let isAnswered = question.answers.find((a) => {
        return a.isSelected === true;
      });
      if (isAnswered) {
        return;
      }
    }
    refDiv.current[index].className = "question-item clicked";
  };

  return (
    <>
      <div className="main-timer">
        <CoutDown onTimeup={onTimeup} />
      </div>
      <div className="main-question">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => {
            return (
              <div
                className={getClassQuestion(item, index)}
                key={`data-${index}`}
                onClick={() => handleCheckColor(item, index)}
                ref={(element) => (refDiv.current[index] = element)}
              >
                {index + 1}
              </div>
            );
          })}
      </div>
    </>
  );
};

export default RightContent;
