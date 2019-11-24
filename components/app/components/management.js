import React, { Component } from "react";

export default class Management extends Component {
  state = {
    numberOf: 5,
    type: ["paragraphs", "sentences", "words"],
    selected: "0"
  };

  handleNumChange = e => {
    this.setState({
      [e.target.name]: e.target.value.replace(/\D/g, "") //remove non digit characters
    });
    if (Number(e.target.value) > 20) {
      this.setState({
        [e.target.name]: 20
      });
    } else if (Number(e.target.value) < 0) {
      this.setState({
        [e.target.name]: 0
      });
    }
  };

  handleOptionChange = e => {
    this.setState({
      selected: e.target.value
    });
  };

  copyIpsum = () => {
    console.log(this.props)
    if (document.querySelectorAll(".tempInput").length === 0) {
      let tempInput = document.createElement("textarea");

      tempInput.classList.add("tempInput");
      tempInput.style.position = "absolute";
      tempInput.style.opacity = "0";
      document.body.appendChild(tempInput);

      tempInput.setAttribute("wrap", "hard");
      tempInput.value = this.props.textToCopy;
      tempInput.select();
      document.execCommand("copy");
      document.body.removeChild(tempInput);
    }
  };

  generateClick = () => {
    const { numberOf, selected } = this.state;
    this.props.setData(numberOf, Number(selected));
  };

  render() {
    return (
      <div className="app_management">
        <div className="app_generate">
          <input
            type="text"
            name="numberOf"
            value={this.state.numberOf}
            onChange={this.handleNumChange}
          />
          <select
            value={this.state.selected}
            onChange={this.handleOptionChange}
          >
            <option value="0">{this.state.type[0]}</option>
            <option value="1">{this.state.type[1]}</option>
            <option value="2">{this.state.type[2]}</option>
          </select>
          <button onClick={this.generateClick}>Generate!</button>
        </div>
        <button onClick={this.copyIpsum}>
          <i className="far fa-copy" /> Copy
        </button>
      </div>
    );
  }
}
