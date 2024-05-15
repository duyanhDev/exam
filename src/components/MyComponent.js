import React, { useState } from "react";
import AddUserinfo from "./AddUserInfo";
import DisplayInfor from "./DisplayInfor";
// class MyComponent extends React.Component {
//   // JSX
//   state = {
//     listUser: [
//       {
//         id: 1,
//         name: "Duy Anh",
//         age: 30,
//       },
//       {
//         id: 2,
//         name: "Eric",
//         age: 20,
//       },
//       {
//         id: 3,
//         name: "Thảo",
//         age: 35,
//       },
//     ],
//   };

//   handleAddNewUser = (todo) => {
//     this.setState({
//       listUser: [...this.state.listUser, todo],
//     });
//   };
//   handleDeleteUser = (user) => {
//     let listUserClone = this.state.listUser;
//     listUserClone = listUserClone.filter((item) => {
//       return item.id !== user;
//     });
//     this.setState({
//       listUser: listUserClone,
//     });
//   };
//   render() {
//     const test = "Duy Anh";
//     console.log(typeof test);
//     const { listUser } = this.state;

//     return (
//       <>
//         <AddUserinfo handleAddNewUser={this.handleAddNewUser} />
//         <br></br>
//         <DisplayInfor
//           listUser={listUser}
//           handleDeleteUser={this.handleDeleteUser}
//         />
//       </>
//     );
//   }
// }

const MyComponent = () => {
  const [listUser, setListUsers] = useState([
    {
      id: 1,
      name: "Duy Anh",
      age: 30,
    },
    {
      id: 2,
      name: "Eric",
      age: 20,
    },
    {
      id: 3,
      name: "Thảo",
      age: 35,
    },
  ]);

  const handleAddNewUser = (todo) => {
    setListUsers([...listUser, todo]);
  };

  const handleDeleteUser = (user) => {
    let listUserClone = listUser;
    listUserClone = listUserClone.filter((item) => {
      return item.id !== user;
    });
    setListUsers(listUserClone);
  };

  const handleUpdateUserList = (updatedList) => {
    setListUsers(updatedList);
  };
  return (
    <>
      <AddUserinfo handleAddNewUser={handleAddNewUser} />
      <br></br>
      <DisplayInfor
        listUser={listUser}
        handleDeleteUser={handleDeleteUser}
        handleUpdateUserList={handleUpdateUserList}
      />
    </>
  );
};

export default MyComponent;
