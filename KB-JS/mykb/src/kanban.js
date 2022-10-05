import React, { Component } from "react";
import Task from "./task";
import TaskAdder from "./TaskAdder";
import emitter from "./event";

class Kanban extends Component {
  state = { tasks: this.props.tasks, selectTasks: [] };

  deleteTask = (task) => {
    this.state.tasks = this.state.tasks.filter((item) => {
      return task !== item;
    });
    this.setState({ ...this.state });
  };

  addTask = (task) => {
    this.setState({ tasks: this.state.tasks.concat(task) });
  };

  checkTack = (event) => {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    let selectTask = this.state.selectTasks;
    if (value === true) {
      selectTask = selectTask.concat(name);
    } else {
      selectTask = selectTask.filter((item) => {
        return item !== name;
      });
    }
    this.setState({ selectTasks: selectTask });
  };

  componentDidMount = () => {
    this.eventEmitter = emitter.addListener("move", (item, type) => {
      if (type === this.props.type) {
        this.setState({ tasks: this.state.tasks.concat(item) });
      }
    });
  };

  moveTask = (type) => {
    this.state.selectTasks.map((item) => {
      this.deleteTask(item);
    });
    emitter.emit("move", this.state.selectTasks, type);
    this.setState({ selectTasks: (this.state.selectTasks = []) });
  };

  render() {
    /**
     *筛选button按钮
     */
    let types = ["To Do", "In Progress", "Done"];
    let type = this.props.type;
    types = types.filter((item) => {
      return item !== type;
    });

    return (
      <div>
        <TaskAdder addTask={this.addTask} />

        <br />
        <div>
          {this.state.tasks.map((task, index) => {
            return (
              <Task
                key={index}
                name={task}
                checkTask={this.checkTack}
                deleteTask={this.deleteTask}
              />
            );
          })}
        </div>
        <br />

        {types.map((type) => {
          return (
            <button
              key={type}
              name={type}
              onClick={this.moveTask.bind(this, type)}
            >
              {type}
            </button>
          );
        })}
      </div>
    );
  }
}

export default Kanban;
