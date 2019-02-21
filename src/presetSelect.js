import React from "react";
import WebMidi from "webmidi";

class PresetSelect extends React.Component {
  state = {
    presets: []
  }

  _presets() {
    return this.state.presets.map(({ name }, index) => (
      <option key={name} value={index}>{name}</option>
    ));
  }

  render() {
    return (
      <select name="preset" onChange={this.props.onChange}>
        {this._presets()}
      </select>
    )
  }
}

 export default PresetSelect;
