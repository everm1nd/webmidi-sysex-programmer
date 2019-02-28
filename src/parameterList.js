import React from "react";

import Parameter from "./parameter";

class ParameterList extends React.Component {
  render() {
    const components = this.props.parameters.map((parameter, index) => {
      return <Parameter key={index} id={index} {...parameter} onChange={this.props.onChange} />
    })
    return <div>{components}</div>
  }
}

 export default ParameterList;
