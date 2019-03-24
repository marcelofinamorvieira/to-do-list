import React, { Component } from "react";
import { connect } from "react-redux";
import { addReminder, deleteReminder, clearReminders } from "./actions";
import moment from "moment";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: "",
            date: null
        }
    }

    addReminder() {
        this.props.addReminder(this.state.text.charAt(0).toUpperCase() + this.state.text.slice(1), this.state.date);
        this.setState({ text: "" });
        document.getElementById("task-field").value = "";
    }

    deleteReminder(id) {
        document.getElementById("task-field").focus();
        document.getElementById(id.toString()).className += " deleting"
        setTimeout(() => this.props.deleteReminder(id), 500);
    }

    completeTask(id) {
        document.getElementById("task-field").focus();
        document.getElementById(id).className += " completed list-group-item-success";
    }

    renderReminders() { //probably should make a new component for this section
        return (
            <ul className="list-group">
                {
                    this.props.reminders.map((reminder) => {
                        return (
                            <li id={reminder.id.toString()} key={reminder.id} className="list-group-item">
                                <div className="item">
                                    <h5 className="list-item">{reminder.text}</h5>
                                    <h6 className="list-item">{moment(new Date(reminder.date)).fromNow()}</h6>
                                    <div className="list-item buttons">
                                        <button type="button" className="btn btn-success btn-outline" onClick={() => this.completeTask(reminder.id.toString())}>&#x2714;</button>
                                        <button id="delete-button" type="button" className="btn btn-danger btn-outline" onClick={() => this.deleteReminder(reminder.id)}>&#x2326;</button>
                                    </div>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        )
    }

    render() {
        return (
            <div className="App">
                <h1>To Do List</h1>
                <a href="https://github.com/marcelofinamorvieira/to-do-list" target="__blank">Github Repository</a>
                <form>
                    <input id="task-field" className="form-control" type="text" placeholder="Type your task"
                        onChange={(event) => this.setState({ text: event.target.value })}
                        onKeyPress={(event) => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                this.addReminder();
                            }
                        }}
                    />
                    <input className="form-control" type="datetime-local" onChange={(event) => this.setState({date: event.target.value})}
                    onKeyPress={(event) => {
                        if (event.key === "Enter") {
                            event.preventDefault();
                            this.addReminder();
                        }
                    }} />
                    <button type="button" className="btn btn-primary" onClick={() => this.addReminder()}>Add Task</button>
                </form>
                {this.renderReminders()}
                <button id="delete-all-button" type="button" className="btn btn-danger" onClick={() => this.props.clearReminders()}>Delete All Reminders</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        reminders: state
    }
}

export default connect(mapStateToProps, { addReminder, deleteReminder, clearReminders })(App);