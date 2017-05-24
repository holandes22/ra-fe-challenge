import React, { Component} from "react";


class Draggable extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isDragging: false,
      x: parseInt(props.x) || 0,
      y: parseInt(props.y) || 0
    };

    // I need to bind the handlers to be able to have this in it's
    // scope.
    // Also, I save the bound methods to be able to remove the listeners
    // after dragging ends
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.boundHandleMouseUp = this.handleMouseUp.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    let isDragging = this.state.isDragging;

    if (isDragging && !prevState.isDragging) {

      document.addEventListener("mousemove", this.boundHandleMouseMove);
      document.addEventListener("mouseup", this.boundHandleMouseUp);

    } else if (!isDragging && prevState.isDragging) {

      document.removeEventListener("mousemove", this.boundHandleMouseMove);
      document.removeEventListener("mouseup", this.boundHandleMouseUp);

    }

  }

  handleMouseDown(e) {
    e.preventDefault();

    this.setState({
      isDragging: true,
      x: e.pageX,
      y: e.pageY
    });

  }

  handleMouseUp(e) {
    e.preventDefault();
    this.setState({ isDragging: false });

    let x = this.state.x + "", y = this.state.y + "";

    this.props.handlePositionChange({x, y});
  }

  handleMouseMove(e) {
    e.preventDefault();

    if (!this.state.isDragging) {
      return;
    }

    this.setState({
      x: e.pageX,
      y: e.pageY
    });

  }

  render() {
    let divStyle = {
      top: this.state.y,
      left: this.state.x
    };

    return (
      <div onMouseDown={(e) => this.handleMouseDown(e)} className="draggable" style={divStyle}>
        {this.props.children}
      </div>
    );
  }
}

export default Draggable;
