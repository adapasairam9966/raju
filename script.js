const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date');
const categoryInput = document.getElementById('category');
const priorityInput = document.getElementById('priority');
const addTaskButton = document.getElementById('add-task');
const taskList = document.getElementById('task-list');
const filterAllButton = document.getElementById('filter-all');
const filterCompletedButton = document.getElementById('filter-completed');
const filterPendingButton = document.getElementById('filter-pending');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
addTaskButton.addEventListener('click', () => {
    const taskText = taskInput.value;
    const dueDate = dueDateInput.value;
    const category = categoryInput.value;
    const priority = priorityInput.value;

    if (taskText) {
        const task = {
            id: Date.now(),
            text: taskText,
            dueDate: dueDate,
            category: category,
            priority: priority,
            completed: false
        };

        tasks.push(task);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
});
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
function renderTasks(filter = 'all') {
    taskList.innerHTML = '';

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'pending') return !task.completed;
        return true;
    });

    filteredTasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');
        if (task.completed) {
            taskItem.classList.add('completed');
        }

        taskItem.innerHTML = `
            <div class="task-details">
                <p>${task.text} - Due: ${task.dueDate || 'No due date'}</p>
                <p>Category: ${task.category}, Priority: ${task.priority}</p>
            </div>
            <div class="task-actions">
                <button onclick="toggleTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
                <button onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;

        taskList.appendChild(taskItem);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });
    saveTasks();
    renderTasks();
}


function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}


filterAllButton.addEventListener('click', () => renderTasks('all'));
filterCompletedButton.addEventListener('click', () => renderTasks('completed'));
filterPendingButton.addEventListener('click', () => renderTasks('pending'));
renderTasks();