import React from "react";
import ReactDOM from "react-dom";

import "./styles.css";

import WebMidi from "webmidi";
import Parameter from "./parameter";
import MidiSelect from "./midiSelect";
import messageFactory from './messageFactory'

class App extends React.Component {
  state = {
    midiActive: false,
    midiOutput: null // will be set later by midiSelect component
  }

  constructor() {
    super();
    WebMidi.enable(err => {
      if (err) {
        console.log("WebMidi could not be enabled.", err);
      } else {
        console.log("WebMidi enabled!");
        this.setState({ midiActive: true });
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

  _changeOutput(midiOutput) {
    console.log("Switched MIDI output to", midiOutput);
    this.setState({ midiOutput });
  }

  render() {
    return (
      <div className="App">
        <h1>WebMIDI</h1>
        <h2>An experiment with SysEx and WebMIDI</h2>
        <MidiSelect active={this.state.midiActive} onChange={this._changeOutput.bind(this)} />
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
