import React, { Component } from 'react';

class Animation extends Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }
  
    render() {
      return (
        <div>
          <canvas ref={this.canvasRef} />
        </div>
      );
    }
  }

export default Animation; 
  