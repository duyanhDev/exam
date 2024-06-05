import { useEffect, useState } from "react";
import { getHistory } from "../../../services/apiService";
import moment from "moment";
const HistoryUser = () => {
  const [history, setHistory] = useState([]);
  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    let res = await getHistory();
    if (res && res.EC === 0) {
      let newData = res?.DT?.data?.map((item) => {
        return {
          total_correct: item.total_correct,
          total_questions: item.total_questions,
          name: item.quizHistory?.name ?? "",
          id: item.id,
          date: moment(item.createAt).utc().format("DD/MM/YYYY hh:mm:ss A"),
        };
      });
      if (newData.length > 7) {
        newData = newData.slice(newData.length - 7, newData.length);
      }
      setHistory(newData);
    }
  };
  console.log(history);
  return (
    <>
      <table class="table table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz Name</th>
            <th>total_questions</th>
            <th>Total Correct</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {history &&
            history.length > 0 &&
            history.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.total_questions}</td>
                  <td>{item.total_correct}</td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default HistoryUser;
