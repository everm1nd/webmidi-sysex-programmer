import React from "react";
import parametersConfig from './parametersConfig'

class Parameter extends React.Component {
  constructor(props) {
    super();
    this.state = {
      config: parametersConfig.find((parameter) => parameter.id === parseInt(props.number))
    }
  }

  sliderValues(number, value) {
    const config = this.state.config;
    return {
      number,
      value: value || config.default || 0,
      min: config.min || 0,
      max: config.max || 127
    }
  }

  _numberChange({ target: { value: number }}) {
    this.props.onChange(this.props.id, { number });
  }

  _valueChange({ target: { value }}) {
    this.props.onChange(this.props.id, { value });
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
