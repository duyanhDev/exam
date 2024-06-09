import { useEffect, useState } from "react";
import { getHistory } from "../../../services/apiService";
import moment from "moment";
import ReactPaginate from "react-paginate";
import _, { result } from "lodash";
const HistoryUser = () => {
  const itemsPerPage = 6;
  const [currentPage, setCurrentPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  const [history, setHistory] = useState([]);

  useEffect(() => {
    fetchHistory();
  }, [itemOffset]);

  const fetchHistory = async () => {
    let res = await getHistory();
    if (res && res.EC === 0) {
      let newData = res?.DT?.data?.map((item) => {
        return {
          total_correct: item.total_correct,
          total_questions: item.total_questions,
          name: item.quizHistory?.name ?? "",
          id: item.id,
          result: (10 / +item.total_questions) * item.total_correct,
          date: moment(item.createAt).format("DD/MM/YYYY hh:mm:ss A"),
        };
      });
      newData = _.orderBy(newData, ["id"], ["desc"]);
      const endOffset = itemOffset + itemsPerPage;
      setHistory(newData.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(newData.length / itemsPerPage));
    }
  };

  const handlePageClick = (event) => {
    const newOffset =
      (event.selected * itemsPerPage) % (pageCount * itemsPerPage);
    setItemOffset(newOffset);
    setCurrentPage(event.selected);
  };

  return (
    <>
      <table className="table table-hover table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz Name</th>
            <th>Total Questions</th>
            <th>Total Correct</th>
            <th>Points</th>
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
                  <td>
                    {Number.isInteger(item.result)
                      ? item.result
                      : item.result.toFixed(2)}
                  </td>
                  <td>{item.date}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={pageCount}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
          forcePage={currentPage}
        />
      </div>
    </>
  );
};

export default HistoryUser;
