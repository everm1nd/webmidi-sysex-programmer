import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import "./styles.css";

import WebMidi from "webmidi";
import Parameter from "./parameter";
import messageFactory from './messageFactory'

class App extends React.Component {
  state = {
    parameter: 0,
    value: 63,
    midiOutput: null, // will be initialized in constructor
    midiOutputs: []
  };

  constructor() {
    super();
    WebMidi.enable(err => {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log("WebMidi enabled!");
        this.setState({ midiOutputs: WebMidi.outputs });
      }
    }, true);
  }

  _valueChange(event) {
    this.setState({ value: event.target.value });
  }

  _emitMidi(number, value) {
    console.log("output MIDI message:", number, value);
    this.state.midiOutput.send(0xf0, messageFactory.makeVoiceEditMessage(number, value));
  }

  _changeOutput(event) {
    const name = event.target.value;
    const midiOutput = WebMidi.getOutputByName(name);
    console.log("Switched MIDI output to", midiOutput.name);
    this.setState({ midiOutput });
  }

  render() {
    const midiOutputs = this.state.midiOutputs.map(midiOutput => {
      const name = midiOutput.name;
      return (
        <option key={name} value={name}>
          {name}
        </option>
      );
    });
    console.log("midi outs DOM", midiOutputs);
    return (
      <div className="App">
        <h1>WebMIDI</h1>
        <h2>An experiment with SysEx and WebMIDI</h2>
        <select name="output" onChange={this._changeOutput.bind(this)}>
          <option value="">select MIDI output</option>
          {midiOutputs}
        </select>
        <Parameter number="10" onChange={this._emitMidi.bind(this)} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
