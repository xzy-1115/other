import React, {Component,} from 'react';

class TaskAdder extends Component {

    saveHandler = (event) => {
        let code = event.keyCode;
        if (code === 13) {
            let task = event.target.value.trim();
            if (task === '') {
                window.alert('请输入内容');
                return;
            }
            this.props.addTask(task);
            event.target.value = '';
        }
    }
    render() {
        return (
            <div>
                <input type="text" onKeyUp={this.saveHandler} className="form-control" placeholder="请输入任务"/>
            </div>
        );
    }
}

export default TaskAdder;