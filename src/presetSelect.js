import React from "react";
import WebMidi from "webmidi";
import config from "./presets"

class PresetSelect extends React.Component {
  state = {
    currentPreset: undefined,
    presets: config
  }

  _presets() {
    return this.state.presets.map(({ name }, index) => (
      <option key={name} value={index}>{name}</option>
    ));
  }

  _onChange({ target: { value: presetId }}) {
    this.setState({ currentPreset: config[presetId] })
  }

  _onLoad() {
    this.props.onLoad(this.state.currentPreset)
  }

  render() {
    return (
      <div>
        <select name="preset" onChange={this._onChange.bind(this)}>
          <option value=""># NEW PRESET #</option>
          {this._presets()}
        </select>
        <button type="button" onClick={this._onLoad.bind(this)}>Load</button>
        <button type="button" onClick={this.props.onSave}>Save</button>
      </div>
    )
  }
}

 export default PresetSelect;
