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
              <Kanban type="To Do" tasks={[{ id:1,name: "睡觉", tags: [] }]} />
            </div>
          </div>

          <div className="col-md-4">
            <div className="panel panel-default">
              <h2 className="text-center">In Progress</h2>
              <Kanban
                type="In Progress"
                tasks={[{id:1,name: "吃饭", tags: [] }]}
              />
            </div>
          </div>

          <div className="col-md-4">
            <div className="panel panel-default">
              <h2 className="text-center">Done</h2>
              <Kanban type="Done" tasks={[{id:1,name: "学习", tags: [] }]} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
