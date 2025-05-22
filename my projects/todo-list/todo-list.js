const form = document.getElementById("todo-form");
const input = document.getElementById("task-input");
const list = document.getElementById("task-list");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const taskText = input.value.trim();
    if (taskText === "") return;

    const li = document.createElement("li");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-check");

    // Create span for task text
    const span = document.createElement("span");
    span.textContent = taskText;

    // Add checkbox toggle effect
    checkbox.addEventListener("change", function () {
        if (checkbox.checked) {
            span.classList.add("checked");
        } else {
            span.classList.remove("checked");
        }
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete-btn");

    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    // Add elements to list item
    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);
    list.appendChild(li);

    input.value = "";
});

