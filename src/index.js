import React from "react";
import ReactDOM from "react-dom";

import _ from "lodash";

import "./styles.css";

import WebMidi from "webmidi";
import ControlsLayout from "./controlsLayout";
import MidiSelect from "./midiSelect";
import PresetSelect from "./presetSelect"
import messageFactory from './messageFactory'
import midiBridge from "./midiBridge";

// this is a midiOutput mock that just discards messages
const midiOutputMock = {
  next: () => {}
}

class App extends React.Component {
  state = {
    midiEnabled: false,
    midiOutput: midiOutputMock,
    parameters: {}
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

  _sendParameter({ number, value }) {
    const message = messageFactory.makeVoiceEditMessage(number, value || 0);
    this.state.midiOutput.next(message);
  }

  _onParameterChange({ number, value }) {
    const updatedState = _.merge({}, this.state, { parameters: { [number]: value } })
    this.setState(updatedState, () => {
      this._sendParameter({ number, value })
    })
  }

  _changeOutput(midiOutput) {
    console.log("Switched MIDI output to", midiOutput);
    const bridge = midiBridge(midiOutput);
    this.setState({ midiOutput: bridge });
  }

  _loadPreset({ parameters }) {
    console.log('Loaded preset: ', parameters);
    this.setState({ parameters }, () => {
      Object.entries(this.state.parameters).forEach((entry) => {
        this._sendParameter({ number: entry[0], value: entry[1] })
      })
    })
  }

  render() {
    return (
      <div className="App">
        <h1>WebMIDI</h1>
        <h2>An experiment with SysEx and WebMIDI</h2>
        <MidiSelect active={this.state.midiEnabled} onChange={this._changeOutput.bind(this)} />
        <PresetSelect parameters={this.state.parameters} onLoad={this._loadPreset.bind(this)} />
        <ControlsLayout parameters={this.state.parameters} onChange={this._onParameterChange.bind(this)} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
