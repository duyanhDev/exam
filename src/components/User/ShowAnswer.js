import _ from "lodash";
import { useState } from "react";

import Lightbox from "react-awesome-lightbox";
const ShowAnswer = (props) => {
  const { data, index, dataModalResult } = props;
  console.log("fix checkss", dataModalResult);
  const [isPreviewImage, setiSPreviewImage] = useState(false);
  if (_.isEmpty(data)) {
    return <></>;
  }

  const handleHanleCheckbox = (e, aId, qID) => {
    // console.log("check ,", e.target.checked);
    props.handleCheckbox(aId, qID);
  };
  return (
    <>
      <h1>Duy Anh</h1>
      {data.image && (
        <div className="q-image">
          <img
            src={`data:image/jpeg;base64,${data.image}`}
            onClick={() => setiSPreviewImage(true)}
            alt="ảnh lỗi"
          />
          {isPreviewImage && (
            <Lightbox
              className="img_ligtbox"
              image={`data:image/jpeg;base64,${data.image}`}
              title={"Question Image"}
              onClose={() => setiSPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
      )}
      <div className="question">
        Question {index + 1} : {data.questionDescription}?
      </div>
      <div className="answer">
        {data.answers &&
          data.answers.length &&
          data.answers.map((a, index) => {
            return (
              <div key={`answer-${index}`} className="a-child">
                <div className="form-check">
                  <input
                    class="form-check-input"
                    type="checkbox"
                    checked={a.isSelected}
                    id="flexCheckDefault"
                    onChange={(e) =>
                      handleHanleCheckbox(e, a.id, data.questionId)
                    }
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexCheckDefault"
                  >
                    {a.description}
                  </label>
                </div>
              </div>
            );
          })}
      </div>
    </>
  );
};

export default ShowAnswer;
