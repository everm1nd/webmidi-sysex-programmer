import React from "react";

import Parameter from "./parameter";

import layout from "./layout";

class ControlsLayout extends React.Component {
  state = {
    layout
  }

  constructor() {
    super()
    this._renderGroup = this._renderGroup.bind(this)
    this._renderElement = this._renderElement.bind(this)
    this._renderParameter = this._renderParameter.bind(this)
  }

  _renderParameter(parameter, index) {
    const parameterValues = {
      number: parameter.number,
      value: this.props.parameters[parameter.number]
    }
    return <Parameter key={index} id={index} {...parameterValues} onValueChange={this.props.onChange} />
  }

  _renderGroup(group, parentIndex) {
    const elements = group.elements.map((element, index) => {
      return this._renderElement(element, `${parentIndex}/${index}`)
    })
    return <div key={parentIndex}>
      <p>{group.name}</p>
      {elements}
    </div>
  }

  _renderElement(element, parentIndex) {
    switch (element.type) {
      case 'group':
        return this._renderGroup(element, parentIndex)
        break;
      case 'parameter':
        return this._renderParameter(element, parentIndex)
        break;
      default:
        console.log('Unknown element type in layout', element)
        break;
    }
  }

  render() {
    const elements = this.state.layout.map(this._renderElement)
    return <div>{elements}</div>
  }
}

 export default ControlsLayout;
