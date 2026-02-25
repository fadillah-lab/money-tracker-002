// controller.js
import Model from "./model.js";
import View from "./view.js";

export default class Controller {
    constructor() {
        this.model = new Model();
        this.view = new View();
        this.currentIndex = null;

        this._init();
    }

    _init() {
        this.refresh();

        // ADD TASK
        this.view.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.addTask();
        });

        // TABLE CLICK (edit & delete)
        this.view.taskTable.addEventListener("click", (e) => {
            const row = e.target.closest("tr");
            if (!row) return;

            this.currentIndex = row.dataset.index;

            // DELETE → buka modal dulu
            if (e.target.closest(".delete")) {
                this.view.openDeleteModal();
            }

            // EDIT → buka modal edit
            if (e.target.closest(".edit")) {
                const task = this.model.getTasks()[this.currentIndex];
                this.view.openEditModal(task);
            }
        });

        // SAVE EDIT
    this.view.saveEdit.addEventListener("click", () => {
    const updatedActivity = this.view.editActivity.value.trim();
    const updatedTime = this.view.editTime.value;
    
    const regex = /^[A-Za-z]{1,15}$/;
    
    if (!regex.test(updatedActivity)) {
        this.view.message.textContent = this.model.MESSAGE.invalidInput;
        this.view.message.style.color = "red";
        return;
    }

    if (!updatedTime) {
        alert("Time required");
        return;
    }
    
    const updatedTask = {
        inputActivity: updatedActivity,
        inputTime: updatedTime
    };

    this.model.updateTask(this.currentIndex, updatedTask);
    this.refresh();
    this.view.closeModal();
});

        // CONFIRM DELETE
        this.view.confirmDelete.addEventListener("click", () => {
            this.model.deleteTask(this.currentIndex);
            this.refresh();
            this.view.closeModal();
        });

        // CLOSE MODAL (Cancel / No)
        this.view.closeButtons.forEach(btn => {
            btn.addEventListener("click", () => {
                this.view.closeModal();
            });
        });

        // CHECKBOX CHANGE
        this.view.taskTable.addEventListener("change", () => {
            this.view.updateProgress(this.model.getTasks());
        });
    }

    addTask() {
        const inputActivity = this.view.addActivity.value.trim();
        const inputTime = this.view.addTime.value;

        const regex = /^[A-Za-z]{1,15}$/;

        if (!regex.test(inputActivity)) {
        this.view.message.textContent = this.model.MESSAGE.invalidInput;
        this.view.message.style.color = "red";
        return;
        }

        if (!inputTime) {
        alert("Time required");
        return;
        }

        this.view.message.textContent = this.model.MESSAGE.validInput;
        this.view.message.style.color = "green";
        this.model.addTask({ inputActivity, inputTime });
        this.refresh();
        this.view.clearForm();
    }

    refresh() {
        this.view.renderTasks(this.model.getTasks());
        this.view.updateProgress(this.model.getTasks());
    }
}