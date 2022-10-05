import React from "react";
import Kanban from "./kanban";
import "bootstrap/dist/css/bootstrap.css";
class App extends React.Component {
  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-4">
            <div className="panel panel-default">
              <h2 className="text-center">To Do</h2>
              <Kanban type="To Do" tasks={["Sleeping"]} />
            </div>
          </div>

          <div className="col-md-4">
            <div className="panel panel-default">
              <h2 className="text-center">In Progress</h2>
              <Kanban type="In Progress" tasks={["Eating"]} />
            </div>
          </div>

          <div className="col-md-4">
            <div className="panel panel-default">
              <h2 className="text-center">Done</h2>
              <Kanban type="Done" tasks={["Coding"]} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
