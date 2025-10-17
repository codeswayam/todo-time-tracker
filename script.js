document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
    const newTaskInput = document.getElementById('newTaskInput');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = []; // Array to hold task objects {id, text, completed}

    /**
     * Loads tasks from LocalStorage and renders them.
     */
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(task => addTaskToDOM(task));
        }
    }

    /**
     * Saves the current tasks array to LocalStorage.
     */
    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    /**
     * Adds a new task element to the DOM.
     * @param {object} task - The task object {id, text, completed}.
     */
    function addTaskToDOM(task) {
        // Create list item for the task
        const listItem = document.createElement('li');
        listItem.setAttribute('data-id', task.id);
        if (task.completed) {
            listItem.classList.add('completed');
        }

        // Create checkbox
        const checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));

        // Create task text span with contentEditable for editing
        const taskText = document.createElement('span');
        taskText.classList.add('task-text');
        taskText.textContent = task.text;
        taskText.setAttribute('contentEditable', 'false'); // Initially not editable
        taskText.addEventListener('dblclick', () => editTask(task.id, taskText));
        taskText.addEventListener('blur', () => saveEditedTask(task.id, taskText));
        taskText.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault(); // Prevent new line on Enter
                taskText.blur(); // Trigger blur to save
            }
        });

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', () => deleteTask(task.id));

        // Append elements to the list item
        listItem.appendChild(checkbox);
        listItem.appendChild(taskText);
        listItem.appendChild(deleteBtn);

        // Append list item to the task list
        taskList.appendChild(listItem);
    }

    /**
     * Adds a new task based on user input.
     */
    function addTask() {
        const text = newTaskInput.value.trim();
        if (text === '') return; // Don't add empty tasks

        // Create a unique ID for the task
        const newTaskId = Date.now().toString(); 
        const newTask = { id: newTaskId, text: text, completed: false };
        tasks.push(newTask); // Add to tasks array
        saveTasks(); // Persist tasks
        addTaskToDOM(newTask); // Add to DOM

        newTaskInput.value = ''; // Clear input field
    }

    /**
     * Toggles the completion status of a task.
     * @param {string} id - The ID of the task to toggle.
     */
    function toggleTaskCompletion(id) {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            saveTasks(); // Persist tasks
            
            // Update DOM class for strikethrough effect
            const listItem = taskList.querySelector(`li[data-id="${id}"]`);
            if (listItem) {
                listItem.classList.toggle('completed', tasks[taskIndex].completed);
            }
        }
    }

    /**
     * Deletes a task from the list.
     * @param {string} id - The ID of the task to delete.
     */
    function deleteTask(id) {
        // Remove from tasks array
        tasks = tasks.filter(task => task.id !== id);
        saveTasks(); // Persist tasks

        // Remove from DOM
        const listItem = taskList.querySelector(`li[data-id="${id}"]`);
        if (listItem) {
            listItem.remove();
        }
    }

    /**
     * Global function to initiate task editing.
     * Sets the task text span to be contentEditable.
     * @param {string} id - The ID of the task being edited.
     * @param {HTMLElement} taskTextElement - The span element containing the task text.
     */
    window.editTask = function(id, taskTextElement) {
        taskTextElement.setAttribute('contentEditable', 'true');
        taskTextElement.focus(); // Focus the element for editing
        // Select all text for easier editing
        const range = document.createRange();
        range.selectNodeContents(taskTextElement);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    };

    /**
     * Saves the edited task text.
     * @param {string} id - The ID of the task to save.
     * @param {HTMLElement} taskTextElement - The span element containing the task text.
     */
    function saveEditedTask(id, taskTextElement) {
        taskTextElement.setAttribute('contentEditable', 'false'); // Disable editing
        const newText = taskTextElement.textContent.trim();
        
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            if (newText === '') { // If task text is emptied, delete the task
                deleteTask(id);
            } else if (tasks[taskIndex].text !== newText) { // Only update if text has changed
                tasks[taskIndex].text = newText;
                saveTasks(); // Persist tasks
            }
        }
    }

    // Event listeners
    addTaskBtn.addEventListener('click', addTask);
    newTaskInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            addTask();
        }
    });

    // Initial load of tasks when the page loads
    loadTasks();
});
