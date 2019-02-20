import React from "react";

import Parameter from "./parameter";

class ParameterList extends React.Component {
  render() {
    const parameters = this.props.parameters.map(parameter => {
      return <Parameter {...parameter} onChange={this.props.onChange} />
    })
    return <div>{parameters}</div>
  }
}

 export default ParameterList;
