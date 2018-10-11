import React from "react";
import parametersConfig from './parametersConfig'

class Parameter extends React.Component {
  constructor(props) {
    super();
    this.state = {
      number: props.number,
      value: 63
    };
  }

  _numberChange(event) {
    this.setState({ number: event.target.value });
  }

  _valueChange(event) {
    this.setState({ value: event.target.value }, state => {
      this.props.onChange(this.state.number, this.state.value);
    });
  }

  render() {
    const parameters = parametersConfig.map((parameter) => {
      return <option key={parameter.id} value={parameter.id}>{parameter.name}</option>
    })
    return (
      <div>
        <div>
          <select
            value={this.state.number}
            onChange={this._numberChange.bind(this)}
          >
            {parameters}
          </select>
          <input
            type="range"
            min="0"
            max="127"
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
