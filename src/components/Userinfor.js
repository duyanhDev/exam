import React from "react";

class Userinfo extends React.Component {
  state = {
    name: "Đặng Trịnh Duy Anh",
    address: "Bình Dương",
    age: 26,
  };

  handleOnchange = (e) => {
    console.log(e.target);
    this.setState({
      name: e.target.value,
    });
  };
  handleOnchangeAge = (e) => {
    console.log(e.target);
    this.setState({
      age: e.target.value,
    });
  };
  handleOnMoverOver = (event) => {
    console.log(event.pageX);
  };
  handleOnSubmit = (e) => {
    e.preventDefault();
    this.setState({
      ...this.state.name,
    });
    console.log("log state", this.state);
  };
  render() {
    const { name, address, age } = this.state;
    return (
      <>
        <p>Anh yêu đôn nhiều lắm chuppa chup ....</p>
        {Math.random()}
        <p>{name}</p>
        <p>{address}</p>
        <p>{age}</p>

        <button onMouseOver={(event) => this.handleOnMoverOver(event)}>
          Click me
        </button>

        <form onSubmit={(e) => this.handleOnSubmit(e)}>
          <input
            type="text"
            value={name}
            onChange={(e) => this.handleOnchange(e)}
          ></input>
          <input
            type="text"
            value={age}
            onChange={(e) => this.handleOnchangeAge(e)}
          ></input>
          <button>Submit</button>
        </form>
      </>
    );
  }
}

export default Userinfo;
