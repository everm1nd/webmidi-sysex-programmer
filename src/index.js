import React from "react";
import ReactDOM from "react-dom";

import _ from "lodash";

import "./styles.css";

import WebMidi from "webmidi";
import ParameterList from "./parameterList";
import MidiSelect from "./midiSelect";
import messageFactory from './messageFactory'
import midiBridge from "./midiBridge";

class App extends React.Component {
  state = {
    midiEnabled: false,
    midiOutput: null, // will be set later by midiSelect component
    parameters: {
      0: { value: 0 },
      1: { value: 0 },
      2: { value: 0 },
      3: { value: 0 },
      4: { value: 0 }
    }
  }

  constructor() {
    super();
    WebMidi.enable(err => {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log("WebMidi enabled!");
        this.setState({ midiEnabled: true });
      }
    }, true);
  }

  _onParameterChange(number, value) {
    const updatedState = Object.assign({}, this.state, { parameters: { [number]: { value } } })
    this.setState(updatedState, (newState) => {
      const message = messageFactory.makeVoiceEditMessage(number, value);
      newState.midiOutput.next(message);
    })
  }

  _changeOutput(midiOutput) {
    console.log("Switched MIDI output to", midiOutput);
    const bridge = midiBridge(midiOutput);
    this.setState({ midiOutput: bridge });
  }

  render() {
    return (
      <div className="App">
        <h1>WebMIDI</h1>
        <h2>An experiment with SysEx and WebMIDI</h2>
        <MidiSelect active={this.state.midiEnabled} onChange={this._changeOutput.bind(this)} />
        <ParameterList parameters={this.state.parameters} onChange={this._onParameterChange.bind(this)} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
