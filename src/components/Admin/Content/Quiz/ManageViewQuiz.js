const ManageViewQuiz = (props) => {
  const { LisQuiz } = props;

  return (
    <>
      <div>List Quiz: </div>
      <table className="table table-hover table-bordered mt-2">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">type</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {LisQuiz &&
            LisQuiz.map((item, index) => {
              return (
                <tr key={`table-quizz ${index + 1}`}>
                  <td>{item.id}</td>
                  <td>{item.name}</td>
                  <td>{item.description}</td>
                  <td>{item.difficulty}</td>
                  <td style={{ display: "flex", gap: "20px" }}>
                    <button
                      className="btn btn-primary"
                      onClick={() => props.handelViewQuiz(item)}
                    >
                      View
                    </button>
                    <button
                      className="btn btn-warning"
                      onClick={() => props.handelEditQuiz(item)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger ml-3"
                      onClick={() => props.handledeleteQuiz(item)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </>
  );
};

export default ManageViewQuiz;
