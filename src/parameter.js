import React from "react";
import parametersConfig from './parametersConfig'

class Parameter extends React.Component {
  constructor(props) {
    super();
    this.state = this._initialStateFromConfig(props.number)
  }

  _initialStateFromConfig(number) {
    const config = parametersConfig.find((parameter) => parameter.id === parseInt(number))
    return {
      number,
      value: config.default || 0,
      min: config.min || 0,
      max: config.max || 127
    }
  }

  _numberChange({ target: { value: parameterNumber }}) {
    this.setState(this._initialStateFromConfig(parameterNumber));
  }

  _valueChange({ target: { value }}) {
    this.setState({ value }, state => {
      this.props.onChange(parseInt(this.state.number), parseInt(this.state.value));
    });
  }

  _parameters() {
    return parametersConfig.map((parameter) => (
        <option key={parameter.id} value={parameter.id}>{parameter.name}</option>
    ))
  }

  render() {
    return (
      <div>
        <div className="parameter">
          <select
            value={this.state.number}
            onChange={this._numberChange.bind(this)}
          >
            {this._parameters()}
          </select>
          <input
            type="range"
            min={this.state.min}
            max={this.state.max}
            value={this.state.value}
            onChange={this._valueChange.bind(this)}
          />
          <label>{this.state.value}</label>
        </div>
      </div>
    );
  }
}

 export default Parameter;
