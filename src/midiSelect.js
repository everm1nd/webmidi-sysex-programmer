import React from "react";
import WebMidi from "webmidi";

class MidiSelect extends React.Component {
  _changeOutput({ target: { value: interfaceId } }) {
    this.props.onChange(WebMidi.outputs[interfaceId])
  }

  _midiOutputs() {
    return WebMidi.outputs.map(({ name }, index) => (
      <option key={name} value={index}>{name}</option>
    ));
  }

  render() {
    return (
      <select name="output" onChange={this._changeOutput.bind(this)} disabled={!this.props.active}>
        <option value="">select MIDI output</option>
        {this._midiOutputs()}
      </select>
    )
  }
}

 export default MidiSelect;
