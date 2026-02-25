// view.js
export default class View {
    constructor() {
        this.taskTable = document.getElementById("tableTask");
        this.form = document.getElementById("add-task");
        this.addActivity = document.getElementById("activity");
        this.addTime = document.getElementById("time");
        this.message = document.createElement("p");
        this.addActivity.after(this.message);

        this.progressFill = document.querySelector(".progress");
        this.progressText = document.createElement("p");
        document.querySelector(".checkpoint-bar").after(this.progressText);

        this.modalOverlay = document.getElementById("modalOverlay");
        this.editModal = document.getElementById("editModal");
        this.deleteModal = document.getElementById("deleteModal");

        this.editActivity = document.getElementById("editActivity");
        this.editTime = document.getElementById("editTime");
        this.saveEdit = document.getElementById("saveEdit");
        this.confirmDelete = document.getElementById("confirmDelete");

        this.closeButtons = document.querySelectorAll(".closeModal");
    }

    openEditModal(task) {
    this.modalOverlay.classList.remove("hidden");
    this.editModal.classList.remove("hidden");
    this.deleteModal.classList.add("hidden");

    this.editActivity.value = task.inputActivity;
    this.editTime.value = task.inputTime;
}

    openDeleteModal() {
        this.modalOverlay.classList.remove("hidden");
        this.deleteModal.classList.remove("hidden");
        this.editModal.classList.add("hidden");
    }

    closeModal() {
        this.modalOverlay.classList.add("hidden");
        this.editModal.classList.add("hidden");
        this.deleteModal.classList.add("hidden");
    }

    renderTasks(tasks) {
        this.taskTable.innerHTML = "";
        tasks.forEach((task, index) => {
            const tr = document.createElement("tr");
            tr.dataset.index = index;

            tr.innerHTML = `
                <td>${task.inputTime}</td>
                <td class="input-task">${task.inputActivity}</td>
                <td>
                    <div class="action-task">
                        <iconify-icon class="action delete" icon="famicons:trash-outline"></iconify-icon>
                        <iconify-icon class="action edit" icon="lucide:edit"></iconify-icon>
                        <input type="checkbox" class="finish">
                    </div>
                </td>
            `;
            this.taskTable.append(tr);
        });
    }

    updateProgress(tasks) {
        const total = tasks.length;
        const finished = document.querySelectorAll(".finish:checked").length;
        const percent = total === 0 ? 0 : Math.round((finished / total) * 100);

        this.progressFill.style.width = `${percent}%`;
        this.progressText.textContent = `Finished: ${percent}%`;
    }

    clearForm() {
        this.form.reset();
    }
}