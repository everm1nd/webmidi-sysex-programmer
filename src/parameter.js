import React from "react";

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
    return (
      <div>
        <div>
          <input
            type="number"
            min="0"
            max="255"
            step="1"
            value={this.state.number}
            onChange={this._numberChange.bind(this)}
          />
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

module.exports = Parameter;
