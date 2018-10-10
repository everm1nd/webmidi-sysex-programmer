import React from "react";
import ReactDOM from "react-dom";
import _ from "lodash";

import "./styles.css";

import WebMidi from "webmidi";
import Parameter from "./parameter";

const makeSysEx = (param = 0x02, value = 0x00) => {
  // Format Info from Yamaha TX81Z Manual:
  // Voice Edit Parameters (VCED)
  // 11110000 F0h Exclusive
  // 01000011 43h I.D.number(Yamaha)
  // 0001nnnn 1nh Basic receive channel
  // 0ggggghh ggggg = Group number, hh = Subgroup number
  // 0ppppppp ppppppp = Parameter number
  // 0ddddddd ddddddd = Data
  // 11110111 F7h End Of Exclusive
  const message = [
    // I comment the first byte out as it's added in .send function
    // 0xF0, // start of System Exclusive message
    0x43, // Yamaha vendor ID
    0x11, // MIDI channel
    0b0010010, // ggggg = Group number, hh = Subgroup number.
    param,
    value,
    0xf7 // End Of System Exclusive message
  ];
  return message;
};

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
    this.state.midiOutput.send(0xf0, makeSysEx(number, value));
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
