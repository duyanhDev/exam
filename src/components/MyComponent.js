import React from "react";

class MyComponent extends React.Component {
  state = {
    name: "Đặng Trịnh Duy Anh",
    address: "Bình Dương",
    age: 26,
  };
  // JSX
  render() {
    const { name, address, age } = this.state;
    return (
      <>
        <p>Anh yêu đôn nhiều lắm chuppa chup ....</p>
        {Math.random()}
        <p>{name}</p>
        <p>{address}</p>
        <p>{age}</p>
      </>
    );
  }
}

export default MyComponent;
