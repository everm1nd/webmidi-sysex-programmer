import React from "react";
import ReactDOM from "react-dom";

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
    parameters: [
      { number: 0 },
      { number: 1 },
      { number: 2 },
      { number: 3 },
      { number: 4 }
    ]
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

  _emitMidi(number, value) {
    const message = messageFactory.makeVoiceEditMessage(number, value);
    this.state.midiOutput.next(message);
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
        <ParameterList parameters={this.state.parameters} onChange={this._emitMidi.bind(this)} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
