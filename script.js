// Global array to store tasks
let tasks = [];

// Prepopulated data (from initialTasks.json)
const initialTasks = [
  { "id": 1, "text": "Pay Weekly Bills", "scope": "Weekly", "completed": false },
  { "id": 2, "text": "Daily Standup Meeting", "scope": "Daily", "completed": true }
];

// Helper functions for LocalStorage
const saveTasksToLocalStorage = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const loadTasksFromLocalStorage = () => {
  const storedTasks = localStorage.getItem('tasks');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  } else {
    // Prepopulate if LocalStorage is empty or no tasks are present
    tasks = initialTasks;
    saveTasksToLocalStorage(); // Save initial tasks to LocalStorage
  }
};

// Function to generate a unique ID
const generateId = () => {
  return tasks.length > 0 ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
};

// Function to create a single task item DOM element
const createTaskElement = (task) => {
  const listItem = document.createElement('li');
  listItem.setAttribute('data-id', task.id);
  listItem.className = 'task-item';
  if (task.completed) {
    listItem.classList.add('completed');
  }

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => toggleTaskCompletion(task.id));

  const taskTextSpan = document.createElement('span');
  taskTextSpan.className = 'task-text';
  taskTextSpan.textContent = task.text;
  taskTextSpan.addEventListener('click', (event) => window.editTask(task.id, event.target));

  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.className = 'delete-btn';
  deleteButton.addEventListener('click', () => deleteTask(task.id));

  listItem.appendChild(checkbox);
  listItem.appendChild(taskTextSpan);
  listItem.appendChild(deleteButton);

  return listItem;
};

// Function to render all tasks to the DOM
const renderTasks = () => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = ''; // Clear existing tasks
  tasks.forEach(task => {
    taskList.appendChild(createTaskElement(task));
  });
};

// Add new task function
const addTask = () => {
  const newTaskInput = document.getElementById('new-task-input');
  const taskText = newTaskInput.value.trim();

  if (taskText !== '') {
    const newTask = {
      id: generateId(),
      text: taskText,
      scope: "General", // Default scope for newly added tasks
      completed: false
    };
    tasks.push(newTask);
    saveTasksToLocalStorage();
    renderTasks();
    newTaskInput.value = ''; // Clear input field
  }
};

// Toggle task completion status
const toggleTaskCompletion = (id) => {
  const taskIndex = tasks.findIndex(task => task.id === id);
  if (taskIndex > -1) {
    tasks[taskIndex].completed = !tasks[taskIndex].completed;
    saveTasksToLocalStorage();
    renderTasks(); // Re-render to apply/remove .completed class and update checkbox state
  }
};

// Delete task function
const deleteTask = (id) => {
  tasks = tasks.filter(task => task.id !== id);
  saveTasksToLocalStorage();
  renderTasks(); // Re-render to remove the task from the display
};

// Global function for task editing
// Clicking the task text transforms it into an editable input field.
// Saves on 'Enter' key press or 'blur' event.
window.editTask = (id, taskTextSpan) => {
  // If an input is already present, prevent creating another one
  if (taskTextSpan.querySelector('input.edit-input')) {
    return;
  }

  const currentText = taskTextSpan.textContent;
  const editInput = document.createElement('input');
  editInput.type = 'text';
  editInput.value = currentText;
  editInput.className = 'edit-input'; // For potential styling

  // Replace the span's content with the input field
  taskTextSpan.innerHTML = ''; // Clear original text
  taskTextSpan.appendChild(editInput);
  editInput.focus();

  const saveEditedTask = () => {
    const newText = editInput.value.trim();
    // Only update if text has changed and is not empty
    if (newText !== '' && newText !== currentText) {
      const taskIndex = tasks.findIndex(task => task.id === id);
      if (taskIndex > -1) {
        tasks[taskIndex].text = newText;
        saveTasksToLocalStorage();
        renderTasks(); // Re-render to update the display with new text
      }
    } else {
      // If text is empty or unchanged, revert to original text display
      renderTasks(); // Re-render the task list to revert the specific span to its original state (or previous content)
    }
    // Remove event listeners to prevent memory leaks if not re-rendering completely
    editInput.removeEventListener('blur', saveEditedTask);
    editInput.removeEventListener('keypress', handleKeyPress);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      editInput.blur(); // Trigger blur to save the changes
    }
  };

  editInput.addEventListener('blur', saveEditedTask);
  editInput.addEventListener('keypress', handleKeyPress);
};

// Initialize the application when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  loadTasksFromLocalStorage(); // Load tasks from storage or prepopulate
  renderTasks(); // Display tasks

  // Event listeners for adding tasks
  document.getElementById('add-task-btn').addEventListener('click', addTask);
  document.getElementById('new-task-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  });
});
