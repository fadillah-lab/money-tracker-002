// model.js
export default class Model {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem("task")) || [];
        this.MESSAGE = {
            invalidInput : "Activity must contain only letters (1–15 characters",
            validInput : "Activity added"
        }
    }

    getTasks() {
        return this.tasks;
    }

    addTask(task) {
        this.tasks.push(task);
        this._commit();
    }

    deleteTask(index) {
        this.tasks.splice(index, 1);
        this._commit();
    }

    updateTask(index, updatedTask) {
        this.tasks[index] = updatedTask;
        this._commit();
    }

    _commit() {
        localStorage.setItem("task", JSON.stringify(this.tasks));
    }
}