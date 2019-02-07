import React from "react";
import WebMidi from "webmidi";

class MidiSelect extends React.Component {
  state = {
    midiOutputs: [],
    midiOutputId: 0 // select first interface from the list
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      midiOutputs: nextProps.active ? WebMidi.outputs : []
    })
  }

  _changeOutput(event) {
    const interfaceId = event.target.value;
    this.setState({
      midiOutputId: interfaceId
    }, () => this.props.onChange(WebMidi.outputs[this.state.midiOutputId]))
  }

  _midiOutputs() {
    return this.state.midiOutputs.map(({ name }, index) => (
      <option key={name} value={index}>{name}</option>
    ));
  }

  render() {
    return (
      <select name="output" onChange={this._changeOutput.bind(this)} disabled={!this.props.active}> // value={this.state.midiOutputId}
        <option value="">select MIDI output</option>
        {this._midiOutputs()}
      </select>
    )
  }
}

 export default MidiSelect;
