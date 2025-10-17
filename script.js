document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('newTaskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    const initialTasks = [
        {
            "id": 1,
            "text": "Pay Weekly Bills",
            "scope": "Weekly", // Keeping scope for potential future use, though not directly used in this update
            "completed": false
        },
        {
            "id": 2,
            "text": "Daily Standup Meeting",
            "scope": "Daily",
            "completed": true
        }
    ];

    // --- LocalStorage Functions ----
    const saveTasks = () => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    };

    const loadTasks = () => {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
        } else {
            // Pre-populate if LocalStorage is empty
            tasks = initialTasks;
            saveTasks(); // Save initial tasks to LocalStorage
        }
    };

    // --- Task Rendering --- 
    const renderTasks = () => {
        taskList.innerHTML = ''; // Clear current list
        tasks.forEach(task => {
            const taskItem = createTaskElement(task);
            taskList.appendChild(taskItem);
        });
    };

    const createTaskElement = (task) => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.dataset.id = task.id; // Store task ID for easy reference

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));

        const taskTextSpan = document.createElement('span');
        taskTextSpan.className = 'task-text';
        taskTextSpan.textContent = task.text;
        taskTextSpan.setAttribute('contenteditable', 'false'); // Initially not editable
        taskTextSpan.addEventListener('dblclick', () => editTask(task.id, taskTextSpan)); // Global editTask call

        const deleteButton = document.createElement('button');
        deleteButton.className = 'delete-button';
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', () => deleteTask(task.id));

        li.appendChild(checkbox);
        li.appendChild(taskTextSpan);
        li.appendChild(deleteButton);

        return li;
    };

    // --- CRUD Operations --- 
    const addTask = () => {
        const text = taskInput.value.trim();
        if (text === '') {
            alert('Task cannot be empty!');
            return;
        }

        const newTask = {
            id: Date.now(), // Simple unique ID
            text: text,
            completed: false
        };

        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = ''; // Clear input
    };

    const toggleTaskCompletion = (id) => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex > -1) {
            tasks[taskIndex].completed = !tasks[taskIndex].completed;
            saveTasks();
            renderTasks(); // Re-render to apply/remove .completed class
        }
    };

    // MANDATORY GLOBAL FUNCTION
    window.editTask = (id, taskTextElement) => {
        const taskIndex = tasks.findIndex(task => task.id === id);
        if (taskIndex === -1) return;

        // Set contenteditable and focus
        taskTextElement.setAttribute('contenteditable', 'true');
        taskTextElement.focus();
        
        // Place cursor at the end
        const range = document.createRange();
        const sel = window.getSelection();
        range.selectNodeContents(taskTextElement);
        range.collapse(false); // Collapse to the end
        sel.removeAllRanges();
        sel.addRange(range);


        const saveChanges = () => {
            const newText = taskTextElement.textContent.trim();
            if (newText === '') {
                // If text is empty, revert to original or prompt user
                taskTextElement.textContent = tasks[taskIndex].text; // Revert
                alert('Task text cannot be empty. Reverting to original.');
            } else if (newText !== tasks[taskIndex].text) {
                tasks[taskIndex].text = newText;
                saveTasks();
                // No need to re-render all tasks, just the current element is updated
            }
            taskTextElement.setAttribute('contenteditable', 'false');
            // Remove event listeners after saving
            taskTextElement.removeEventListener('blur', blurHandler);
            taskTextElement.removeEventListener('keydown', keydownHandler);
        };

        const blurHandler = () => saveChanges();
        const keydownHandler = (event) => {
            if (event.key === 'Enter') {
                event.preventDefault(); // Prevent new line
                saveChanges();
            }
        };

        // Add listeners for saving
        taskTextElement.addEventListener('blur', blurHandler, { once: true });
        taskTextElement.addEventListener('keydown', keydownHandler, { once: true });
    };

    const deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        saveTasks();
        renderTasks();
    };

    // --- Event Listeners --- 
    addTaskButton.addEventListener('click', addTask);
    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    // --- Initialization --- 
    loadTasks();
    renderTasks();
});
