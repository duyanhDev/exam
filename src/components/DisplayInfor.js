import React, { useState } from "react";
import "./DisplayInfor.scss";

const DisplayInfor = (props) => {
  const [isCheck, setCheck] = useState(true);
  const [editTodo, setEditTodo] = useState({});

  const handleIsCheckShowHide = () => {
    setCheck(!isCheck);
  };

  const { listUser } = props;

  const handleEditUser = (user) => {
    setEditTodo(user); // Bắt đầu chỉnh sửa người dùng
  };

  const handleSaveEdit = () => {
    // Tìm chỉ số của người dùng được chỉnh sửa trong mảng listUser
    const editedIndex = listUser.findIndex((user) => user.id === editTodo.id);

    // Tạo một bản sao của mảng listUser
    const updatedListUser = [...listUser];

    // Cập nhật thông tin của người dùng trong mảng sao chép
    updatedListUser[editedIndex] = editTodo;

    // Cập nhật state listUser và reset editTodo
    props.handleUpdateUserList(updatedListUser);
    setEditTodo({});
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditTodo({ ...editTodo, [name]: value }); // Cập nhật thuộc tính name của editTodo
  };

  return (
    <div>
      <div>
        <span onClick={handleIsCheckShowHide}>{isCheck ? "Show" : "Hide"}</span>
      </div>
      {isCheck && (
        <div>
          {listUser.map((user, index) => (
            <div
              key={user.id}
              style={{ color: user.age > 28 ? "green" : "red" }}
            >
              <h1>
                {index + 1}-{user.name}{" "}
              </h1>
              {editTodo.id === user.id && ( // Chỉ hiển thị trường nhập liệu khi chỉnh sửa
                <input
                  type="text"
                  name="name"
                  value={editTodo.name || ""}
                  onChange={handleInputChange}
                />
              )}
              <button onClick={() => props.handleDeleteUser(user.id)}>
                Delete
              </button>
              {editTodo.id === user.id ? ( // Hiển thị nút Lưu khi chỉnh sửa, và chỉnh sửa người dùng khác
                <button onClick={handleSaveEdit}>Save</button>
              ) : (
                <button onClick={() => handleEditUser(user)}>Edit</button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DisplayInfor;
