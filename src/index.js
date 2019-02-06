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
        this.setState({
          midiOutputs: WebMidi.outputs,
          midiOutputId: 0 // default to the first output in the list
        });
      }
    }, true);
  }

  _valueChange(event) {
    this.setState({ value: event.target.value });
  }

  _currentMidiOutput() {
    return this.state.midiOutputs[this.state.midiOutputId]
  }

  _emitMidi(number, value) {
    console.log("output MIDI message:", number, value);
    this._currentMidiOutput().send(0xf0, messageFactory.makeVoiceEditMessage(number, value));
  }

  _changeOutput(event) {
    const midiOutputId = event.target.value;
    console.log("Switched MIDI output to", this.state.midiOutputs[midiOutputId]);
    this.setState({ midiOutputId });
  }

  _midiOutputs() {
    return this.state.midiOutputs.map(({ name }, index) => (
      <option key={name} value={index}>{name}</option>
    ));
  }

  render() {
    return (
      <div className="App">
        <h1>WebMIDI</h1>
        <h2>An experiment with SysEx and WebMIDI</h2>
        <select name="output" value={this.state.midiOutputId} onChange={this._changeOutput.bind(this)}>
          <option value="">select MIDI output</option>
          {this._midiOutputs()}
        </select>
        <Parameter number="0" onChange={this._emitMidi.bind(this)} />
        <Parameter number="1" onChange={this._emitMidi.bind(this)} />
        <Parameter number="2" onChange={this._emitMidi.bind(this)} />
        <Parameter number="3" onChange={this._emitMidi.bind(this)} />
        <Parameter number="12" onChange={this._emitMidi.bind(this)} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
