import React, { Component } from "react";

interface Props {
  addTaskWithoutTags: (task: string) => void;
}

class TaskAdder extends Component<Props> {
  saveHandler = (event: React.KeyboardEvent<HTMLInputElement>) => {
    let code: string = event.key;
    if (code === "Enter") {
      let task = (event.target as HTMLInputElement).value.trim();
      if (task === "") {
        window.alert("请输入内容");
        return;
      }
      this.props.addTaskWithoutTags(task);
      (event.target as HTMLInputElement).value = "";
    }
  };

  render() {
    return (
      <div>
        <input
          type="text"
          onKeyUp={this.saveHandler}
          className="form-control"
          placeholder="请输入任务"
        />
      </div>
    );
  }
}

export default TaskAdder;