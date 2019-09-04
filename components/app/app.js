import React, { Component } from "react";
import ReactDOM from "react-dom";

class GeneratedParagraph extends Component {
  render() {
    return (
      <p className="fadeIn" style={{ paddingBottom: "20px" }}>
        {this.props.text}
      </p>
    );
  }
}

class TextOutput extends Component {
  render() {
    return (
      <div className="text_output">
        {this.props.showText ? this.props.displayText : null}
      </div>
    );
  }
}

class Management extends Component {
  state = {
    numberOf: 5,
    type: ["paragraphs", "sentences", "words"],
    selected: "0"
  };

  handleNumChange = e => {
    this.setState({
      [e.target.name]: e.target.value.replace(/\D/g, "")
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

class App extends Component {
  state = {
    firstParagraph:
      "To stand up straight with your shoulders back is to accept the terrible responsibility of life, with eyes wide open. It means deciding to voluntarily transform the chaos of potential into the realities of habitable order. It means adopting the burden of self-conscious vulnerability, and accepting the end of the unconscious paradise of childhood, where finitude and mortality are only dimly comprehended. It means willingly undertaking the sacrifices necessary to generate a productive and meaningful reality (it means acting to please God, in the ancient language)",
    displayText: "",
    apiUrl: "https://petersonipsum.firebaseio.com/biblical.json",
    paragraphs: [],
    textToCopy:
      "To stand up straight with your shoulders back is to accept the terrible responsibility of life, with eyes wide open. It means deciding to voluntarily transform the chaos of potential into the realities of habitable order. It means adopting the burden of self-conscious vulnerability, and accepting the end of the unconscious paradise of childhood, where finitude and mortality are only dimly comprehended. It means willingly undertaking the sacrifices necessary to generate a productive and meaningful reality (it means acting to please God, in the ancient language)",
    textVisible: false
  };

  getRandomString = (type, num, paragraphs) => {
    let string = "";
    let separator = type == 2 ? " " : ". ";
    for (let i = 0; i < num; i++) {
      let randParagNum = Math.round(Math.random() * (paragraphs.length - 1)),
        randParag = paragraphs[randParagNum];
      let splitParag = randParag.split(separator),
        randSentenceNum = Math.round(Math.random() * (splitParag.length - 2)); //last one is an empty string so -2
      string = string + splitParag[randSentenceNum] + separator;
    }
    return string;
  };

  textFadeIn = () => {
    this.setState({
      textVisible: false
    });

    let fadeIn = setTimeout(
      () =>
        this.setState({
          textVisible: true
        }),
      10
    );
  };
  generateIpsum = (number, type) => {
    const { paragraphs } = this.state;
    let generatedText, textToCopy;
    this.textFadeIn();

    switch (type) {
      case 0: {
        //paragraphs
        generatedText = [this.state.firstParagraph];
        textToCopy = generatedText;

        if (number === 1) {
          this.setState({
            displayText: generatedText
          });
        } else {
          for (let i = 1; i < number; i++) {
            let randNum = Math.round(Math.random() * (paragraphs.length - 1));
            generatedText.push(paragraphs[randNum]);
            textToCopy = textToCopy + "\r\n \r\n" + paragraphs[randNum];
          }
          generatedText = generatedText.map((elem, index) => {
            return <GeneratedParagraph key={index} text={elem} />;
          });
          this.setState({
            displayText: generatedText,
            textToCopy: textToCopy
          });
        }
        break;
      }
      case 1: {
        //sentences
        generatedText = this.getRandomString(type, number, paragraphs);

        this.setState({
          displayText: (
            <GeneratedParagraph
              key={index}
              text={generatedText}
            />
          ),
          textToCopy: generatedText
        });
        break;
      }
      case 2: {
        //words
        generatedText = this.getRandomString(type, number, paragraphs);
        this.setState({
          displayText: (
            <GeneratedParagraph
              key={index}
              text={generatedText}
            />
          ),
          textToCopy: generatedText
        });
        break;
      }
    }
  };

  componentDidMount() {
    this.setState({
      displayText: this.state.firstParagraph,
      textVisible: true
    });
    fetch(this.state.apiUrl)
      .then(response => response.json())
      .then(data => {
        this.setState({
          paragraphs: data.paragraphs
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div className="app_body">
        <TextOutput
          displayText={this.state.displayText}
          showText={this.state.textVisible}
        />
        <Management
          textToCopy={this.state.textToCopy}
          setData={this.generateIpsum}
        />
      </div>
    );
  }
}

export default App;
