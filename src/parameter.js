import React from "react";
import parametersConfig from './parametersConfig'

import _ from "lodash"

class Parameter extends React.Component {
  _getConfig() {
    return parametersConfig.find((parameter) => parameter.id === parseInt(this.props.number))
  }

  sliderValues(number, value) {
    const config = this._getConfig()
    return {
      number,
      value: value || config.default || 0,
      min: config.min || 0,
      max: config.max || 127
    }
  }

  _numberChange({ target: { value: number }}) {
    this.props.onTypeChange(this.props.id, parseInt(number))
  }

  _valueChange({ target: { value }}) {
    const parameter = _.pick(this.sliderValues(this.props.number, parseInt(value)), ['number', 'value'])
    this.props.onValueChange(parameter);
  }

  _parameters() {
    return parametersConfig.map((parameter) => (
        <option key={parameter.id} value={parameter.id}>{parameter.name}</option>
    ))
  }

  render() {
    const params = this.sliderValues(this.props.number, this.props.value)
    return (
      <div>
        <div className="parameter">
          <select
            value={params.number}
            onChange={this._numberChange.bind(this)}
          >
            {this._parameters()}
          </select>
          <input
            type="range"
            min={params.min}
            max={params.max}
            value={params.value}
            onChange={this._valueChange.bind(this)}
          />
        <label>{params.value}</label>
        </div>
      </div>
    );
  }
}

 export default Parameter;
