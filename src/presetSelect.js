import React from "react";
import defaultPresets from "./presets"

const STORAGE_KEY = 'presets'

class PresetSelect extends React.Component {
  constructor() {
    super();
    this.state = {
      presetId: undefined,
      presets: this._loadPresets()
    }
  }

  componentDidMount() {
    this.props.onLoad(this.state.presets[0]) // this will load first preset
  }

  _loadPresets() {
    const presets = JSON.parse( localStorage.getItem(STORAGE_KEY))
    if (presets == null) {
      console.log('Initialising presets storage...');
      localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultPresets))
      return defaultPresets
    } else {
      console.log('Loaded presets:', presets);
      return presets
    }
  }

  _presets() {
    return this.state.presets.map(({ name }, index) => (
      <option key={index} value={index}>{name}</option>
    ));
  }

  _onChange({ target: { value: presetId }}) {
    this.setState({ presetId })
  }

  _onLoad() {
    this.props.onLoad(this.state.presets[this.state.presetId])
  }

  _onSave() {
    let newPresets = this.state.presets
    if (this.state.presetId) {
      newPresets[this.state.presetId].parameters = this.props.parameters;
    } else {
      newPresets.push({
        name: 'New Preset',
        parameters: this.props.parameters
      })
    }
    this.setState({
      presets: newPresets,
      presetId: this.state.presetId || this.props.parameters.length // switch to new preset after it's saved
    }, () => {
      console.log('Saving presets...', this.state.presets);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state.presets))
    })
  }

  render() {
    return (
      <div>
        <select name="preset" value={this.state.presetId} onChange={this._onChange.bind(this)}>
          <option value=""># NEW PRESET #</option>
          {this._presets()}
        </select>
        <button type="button" onClick={this._onLoad.bind(this)}>Load</button>
        <button type="button" onClick={this._onSave.bind(this)}>Save</button>
      </div>
    )
  }
}

 export default PresetSelect;
