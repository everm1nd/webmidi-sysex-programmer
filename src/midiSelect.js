import React from "react";
import WebMidi from "webmidi";

import { FormField, Select } from 'grommet';

class MidiSelect extends React.Component {
  state = {
    value: ""
  }

  _changeOutput({ value: midiInterface }) {
    this.setState({ value: midiInterface.name }, () => {
      this.props.onChange(midiInterface)
    })
  }

  render() {
    return (
      <FormField label="MIDI Interface">
        <Select
          options={WebMidi.outputs}
          children={({name}, index)=>{
            return <option value={index}>{name}</option>
          }}
          value={this.state.value}
          placeholder="select MIDI output"
          onChange={this._changeOutput.bind(this)}
          disabled={!this.props.active}
        />
      </FormField>
    )
  }
}

 export default MidiSelect;
