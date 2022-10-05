import React, { Component } from "react";
import Task from "./task";
import TaskAdder from "./TaskAdder";
import emitter from "./event";

interface Props {
  tasks: Array<TaskTag>;
  type: string;
}
interface TaskTag {
  id: number
  name: string;
  tags: Array<string>;
}
interface State {
  tasks: Array<TaskTag>;
  selectTasks: Array<TaskTag>;
}

class Kanban extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { tasks: props.tasks, selectTasks: [] };
  }

  deleteTask=(name: string)=> {
    this.state = {
      ...this.state,
      tasks: this.state.tasks.filter((item) => {
        return name !== item.name;
      }),
    };
    this.setState({ ...this.state });
  }

  addTask=(task: TaskTag)=> {
    this.setState({ tasks: [...this.state.tasks,task] });
  }

  addTaskWithoutTags=(name: string) =>{
    let length= this.state.tasks.length
    this.addTask({id:length+1,name: name, tags: [] });
  }

  checkTack=(event: React.ChangeEvent<HTMLInputElement>)=> {
    const target = event.target;
    const value = target.checked;
    const name = target.name;
    let selectTask = this.state.selectTasks;
    let task = this.state.tasks.filter((task) => {
      return task.name === name;
    });
    if (value) {
      selectTask = selectTask.concat(task);
    } else {
      selectTask = selectTask.filter((item) => {
        return item.name !== name;
      });
    }
    this.setState({ selectTasks: selectTask });
  }

  componentDidMount=()=> {
    emitter.addListener("move", (item, type) => {
      if (type === this.props.type) {
        this.setState({ tasks: this.state.tasks.concat(item) });
      }
    });
  }

  moveTask=(type: string)=> {
    return()=>{
      this.state.selectTasks.map((item) => {
        return this.deleteTask(item.name);
      });
      emitter.emit("move", this.state.selectTasks, type);
      this.setState({ selectTasks: [] });
    }
  }

  addTags=(name: string, tag: string) =>{
    this.setState({
      tasks: this.state.tasks.map((task) => {
        if (task.name === name) {
          return { id:task.id,name: name, tags: task.tags.concat(tag) };
        } else {
          return task;
        }
      }),
    });
  }

  dragOver=(event:React.DragEvent<HTMLDivElement>)=>{
    event.preventDefault();
}

  dropTasks=(event:React.DragEvent<HTMLDivElement>)=>{
    event.preventDefault();
    let task = event.dataTransfer.getData("text");
    let length=this.state.tasks.length
    this.addTask({id:length+1,name:task,tags:[]})
  }

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
        <TaskAdder addTaskWithoutTags={this.addTaskWithoutTags} />

        <br />
        <div onDrop={this.dropTasks} onDragOver={this.dragOver}>
          {this.state.tasks.map((task) => {
            return (
                <Task
                    key={task.name}
                    name={task.name}
                    tags={task.tags}
                    addTags={this.addTags}
                    checkTask={this.checkTack}
                    deleteTask={this.deleteTask}
                />
            );
          })}
        </div>
        <br />
        {types.map((type,id) => {
          return (
            <button
              key={id}
              name={type}
              onClick={this.moveTask(type)}
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
