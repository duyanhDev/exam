import React, { useState } from "react";

// class AddUserInfo extends React.Component {
//   state = {
//     name: this.name,
//     address: "Bình Dương",
//     age: this.age,
//   };

//   handleOnchange = (e) => {
//     this.setState({
//       name: e.target.value,
//     });
//   };
//   handleOnchangeAge = (e) => {
//     this.setState({
//       age: e.target.value,
//     });
//   };
//   handleOnMoverOver = (event) => {
//     console.log(event.pageX);
//   };
//   handleOnSubmit = (e) => {
//     e.preventDefault();
//     this.props.handleAddNewUser({
//       id: Math.floor(Math.random() * 100 + 1) + "random",
//       name: this.state.name,
//       age: this.state.age,
//     });
//   };
//   render() {
//     const { name, address, age } = this.state;
//     return (
//       <>
//         <p>Anh yêu đôn nhiều lắm chuppa chup ....</p>
//         {Math.random()}
//         <p>{name}</p>
//         <p>{address}</p>
//         <p>{age}</p>

//         <button onMouseOver={(event) => this.handleOnMoverOver(event)}>
//           Click me
//         </button>

//         <form onSubmit={(e) => this.handleOnSubmit(e)}>
//           <input
//             type="text"
//             value={name}
//             onChange={(e) => this.handleOnchange(e)}
//           ></input>
//           <input
//             type="text"
//             value={age}
//             onChange={(e) => this.handleOnchangeAge(e)}
//           ></input>
//           <button>Submit</button>
//         </form>
//       </>
//     );
//   }
// }

const AddUserInfo = (props) => {
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [address, setAddress] = useState();
  const handleOnchangeName = (e) => {
    setName(e.target.value);
  };
  const handleOnchangeAge = (e) => {
    setAge(e.target.value);
  };
  const handleOnMoverOver = (event) => {
    console.log(event.pageX);
  };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    props.handleAddNewUser({
      id: Math.floor(Math.random() * 100 + 1) + "random",
      name: name,
      age: age,
    });
  };
  return (
    <>
      <p>Anh yêu đôn nhiều lắm chuppa chup ....</p>
      {Math.random()}
      <p>{name}</p>
      <p>{address}</p>
      <p>{age}</p>

      <button onMouseOver={(event) => handleOnMoverOver(event)}>
        Click me
      </button>

      <form onSubmit={(e) => handleOnSubmit(e)}>
        <input
          type="text"
          value={name}
          onChange={(e) => handleOnchangeName(e)}
        ></input>
        <input
          type="text"
          value={age}
          onChange={(e) => handleOnchangeAge(e)}
        ></input>
        <button>Submit</button>
      </form>
    </>
  );
};

export default AddUserInfo;
