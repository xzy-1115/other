import React, { Component } from "react";

class Task extends Component {
  handleDelete = () => {
    this.props.deleteTask(this.props.name);
  };

  render() {
    return (
      <div>
        <li className="list-group-item">
          <input
            name={this.props.name}
            type="checkbox"
            onChange={this.props.checkTask}
          />
          <span>{this.props.name}</span>
          <button
            className="btn-danger btn-xs pull-right"
            onClick={this.handleDelete.bind(this)}
          >
            &times;
          </button>
        </li>
      </div>
    );
  }
}

export default Task;
