import React, { Component } from "react";

interface Props {
  tags: Array<string>;
  name: string;
  checkTask: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteTask: (task: string) => void;
  addTags: (name: string, tag: string) => void;
}

class Task extends Component<Props> {
  handleDelete = () => {
    this.props.deleteTask(this.props.name);
  };

  handleAdd = () => {
    let label = prompt("请输入内容");
    if (label == null) {
      window.alert("你按了[取消]按钮");
      return;
    }
    this.props.addTags(this.props.name, label);
  };


  render() {
    let color = () => {
      let R = Math.floor(Math.random() * 255);
      let G = Math.floor(Math.random() * 255);
      let B = Math.floor(Math.random() * 255);
      return { background: "rgb(" + R + "," + G + "," + B + ")" };
    };

    return (
      <div>
        <li className="list-group-item" >
          <input
            name={this.props.name}
            type="checkbox"
            onChange={this.props.checkTask}
          />
          <span onClick={this.handleAdd}>{this.props.name}</span>
          <button
            className="btn-danger btn-xs pull-right"
            onClick={this.handleDelete.bind(this)}
          >
            &times;
          </button>
          <div>
            {this.props.tags.map((tag) => {
              return <span style={color()}>{tag}</span>;
            })}
          </div>
        </li>
      </div>
    );
  }
}

export default Task;