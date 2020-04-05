import React, { Component } from "react";
import { ConnectedManagement } from "./configure";

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

class App extends Component {
  state = {
    firstParagraph:
      "To stand up straight with your shoulders back is to accept the terrible responsibility of life, with eyes wide open. It means deciding to voluntarily transform the chaos of potential into the realities of habitable order. It means adopting the burden of self-conscious vulnerability, and accepting the end of the unconscious paradise of childhood, where finitude and mortality are only dimly comprehended. It means willingly undertaking the sacrifices necessary to generate a productive and meaningful reality (it means acting to please God, in the ancient language)",
    displayText: "",
    textToCopy:
      "To stand up straight with your shoulders back is to accept the terrible responsibility of life, with eyes wide open. It means deciding to voluntarily transform the chaos of potential into the realities of habitable order. It means adopting the burden of self-conscious vulnerability, and accepting the end of the unconscious paradise of childhood, where finitude and mortality are only dimly comprehended. It means willingly undertaking the sacrifices necessary to generate a productive and meaningful reality (it means acting to please God, in the ancient language)",
  };

  getRandomString = (type, num, paragraphs) => {
    const string = "";
    const separator = type == 2 ? " " : ". ";
    for (let i = 0; i < num; i++) {
      const randParagNum = Math.round(Math.random() * (paragraphs.length - 1)),
        randParag = paragraphs[randParagNum];
      const splitParag = randParag.split(separator),
        randSentenceNum = Math.round(Math.random() * (splitParag.length - 2)); //last one is an empty string so -2
      string = string + splitParag[randSentenceNum] + separator;
    }
    return string;
  };

  textFadeIn = () => {
    this.setState({
      textVisible: false,
    });

    const fadeIn = setTimeout(
      () =>
        this.setState({
          textVisible: true,
        }),
      10
    );
  };
  generateIpsum = (amount, type) => {
    const { paragraphs } = this.props;
    let generatedText, textToCopy;
    this.textFadeIn();

    switch (type) {
      case 0: {
        //paragraphs
        generatedText = [this.state.firstParagraph];
        textToCopy = generatedText;

        if (amount === 1) {
          this.setState({
            displayText: generatedText,
          });
        } else {
          for (let i = 1; i < amount; i++) {
            const randNum = Math.round(Math.random() * (paragraphs.length - 1));
            generatedText.push(paragraphs[randNum]);
            textToCopy = textToCopy + "\r\n \r\n" + paragraphs[randNum];
          }
          generatedText = generatedText.map((elem, index) => {
            return <GeneratedParagraph key={index} text={elem} />;
          });
          this.setState({
            displayText: generatedText,
            textToCopy: textToCopy,
          });
        }
        break;
      }
      case 1: {
        //sentences
        generatedText = this.getRandomString(type, amount, paragraphs);

        this.setState({
          displayText: <GeneratedParagraph text={generatedText} />,
          textToCopy: generatedText,
        });
        break;
      }
      case 2: {
        //words
        generatedText = this.getRandomString(type, amount, paragraphs);
        this.setState({
          displayText: <GeneratedParagraph text={generatedText} />,
          textToCopy: generatedText,
        });
        break;
      }
    }
  };

  componentDidMount() {
    this.props.fetchText();
    this.setState({
      displayText: this.state.firstParagraph,
      textVisible: true,
    });
  }

  render() {
    return (
      <div className="app_body">
        <TextOutput
          displayText={this.state.displayText}
          showText={this.state.textVisible}
        />
        <ConnectedManagement
          textToCopy={this.state.textToCopy}
          setData={this.generateIpsum}
        />
      </div>
    );
  }
}

export default App;
