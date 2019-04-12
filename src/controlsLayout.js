import React from "react";
import produce from "immer";

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
    this._handleTypeChange = this._handleTypeChange.bind(this)
  }

  _handleTypeChange(id, number) {
    // TODO: make this function more universal to work with complex nested layouts
    const [groupId, elementId] = id.split('/')
    const newState = produce(this.state, draftState => {
      draftState.layout[groupId].elements[elementId].number = number
    })
    this.setState(newState)
  }

  _renderParameter(parameter, index) {
    const parameterValues = {
      number: parameter.number,
      type: parameter.parameterType,
      value: this.props.parameters[parameter.number]
    }
    return <Parameter key={index} id={index} {...parameterValues} onTypeChange={this._handleTypeChange} onValueChange={this.props.onChange} />
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
