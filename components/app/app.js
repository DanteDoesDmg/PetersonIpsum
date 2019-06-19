import React, {Component} from "react";


class TextOutput extends Component {


    render() {
        return <div className='text_output'>{this.props.displayText}</div>
    }
}

class Management extends Component {
    state = {
        numberOf: 1,
        type: ['paragraphs', 'sentences', 'words'],
        selected: 0,
    };

    handleNumChange = (e) => {

        this.setState({
            [e.target.name]: e.target.value.replace(/\D/g, '')
        });
        if (Number(e.target.value) > 20) {
            this.setState({
                [e.target.name]: 20,
            })
        } else if (Number(e.target.value) < 0) {
            this.setState({
                [e.target.name]: 0,
            })
        }
    };

    handleOptionChange = (e) => {
        this.setState({
            selected: e.target.value,
        })
    };

    copyIpsum = () => {

        if (document.querySelectorAll('.tempInput').length === 0) {
            let copiedIpsum = document.querySelector('.text_output');
            let tempInput = document.createElement('input');

            tempInput.classList.add('tempInput');
            tempInput.style.position = 'absolute';
            tempInput.style.opacity = '0';
            document.body.appendChild(tempInput);

            tempInput.setAttribute('value', copiedIpsum.innerHTML);
            tempInput.select();
            document.execCommand('copy');
            document.body.removeChild(tempInput);

        }
    };

    render() {

        return <div className='app_management'>
            <div className='app_generate'>
                <input type='text' name='numberOf' value={this.state.numberOf} onChange={this.handleNumChange}/>
                <select value={this.state.selected} onChange={this.handleOptionChange}>
                    <option value='0'>{this.state.type[0]}</option>
                    <option value='1'>{this.state.type[1]}</option>
                    <option value='2'>{this.state.type[2]}</option>
                </select>
                <button>Generate!</button>
            </div>
            <button onClick={this.copyIpsum}><i className="far fa-copy"></i> Copy</button>
        </div>

    }
}

class App extends Component {
    state = {
        displayText: 'To stand up straight with your shoulders back is to accept the terrible responsibility of life, with eyes wide open. It means deciding to voluntarily transform the chaos of potential into the realities of habitable order. It means adopting the burden of self-conscious vulnerability, and accepting the end of the unconscious paradise of childhood, where finitude and mortality are only dimly comprehended. It means willingly undertaking the sacrifices necessary to generate a productive and meaningful reality (it means acting to please God, in the ancient language)'
    };

    render() {
        return (<div className='app_body'>
            <TextOutput displayText={this.state.displayText}/>
            <Management/>
        </div>)
    }
}

export default App