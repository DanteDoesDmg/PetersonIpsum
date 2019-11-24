import Management from "./components/management";
import App from "./app";
import { changeMessage, fetchText } from "./actions";
import { connect } from "react-redux";

export const ConnectedManagement = connect(
  state => {
    const { textToCopy } = state;
    return {};
  },
  dispatch => {
    return {
      changeMessage: message => dispatch(changeMessage(message))
    };
  }
)(Management);

export const ConnectedApp = connect(
  state => {
    const { paragraphs } = state.app;
    return { paragraphs: paragraphs };
  },
  dispatch => {
    return {
      fetchText:()=> dispatch(fetchText())
    };
  },
)(App);
