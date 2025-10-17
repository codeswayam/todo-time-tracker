# To-Do Tracker

A simple, static To-Do Tracker web application built with HTML, CSS, and Vanilla JavaScript. This application allows users to add, edit, complete, and delete tasks, with all data persisting locally in the browser's LocalStorage.

## Features

*   **Add New Tasks:** Quickly add new tasks to your list.
*   **Edit Tasks:** Double-click on any task text to edit its content. Changes are saved on Enter key press or when the focus leaves the task.
*   **Mark as Complete:** Check the box next to a task to mark it as completed. Completed tasks are visually distinguished with a strikethrough.
*   **Data Persistence:** All tasks, including their text and completion status, are saved in your browser's LocalStorage, ensuring your list remains intact even after closing and reopening the browser.
*   **Initial Data Prepopulation:** If you open the application with an empty To-Do list (e.g., first-time use or after clearing LocalStorage), a set of default tasks will be automatically loaded to get you started.
*   **Responsive Design:** The application is designed to be fully responsive, providing a consistent user experience across various screen sizes.

## How to Use

1.  **Add a Task:** Type your task into the input field at the top and click the "Add Task" button or press Enter.
2.  **Edit a Task:** Double-click on the text of any existing task. The text will become editable. Type your changes and press Enter or click away to save.
3.  **Complete a Task:** Click the checkbox next to a task to toggle its completion status.
4.  **Delete a Task:** Click the "Delete" button next to a task to remove it from the list.

## Project Structure

*   `index.html`: The main HTML file structuring the web page.
*   `style.css`: Contains all the CSS rules for styling the application.
*   `script.js`: Implements all the core logic for task management, LocalStorage interaction, and user interaction.
*   `LICENSE`: Contains the MIT License details.
*   `README.md`: This file, providing information about the project.

## Technologies Used

*   HTML5
*   CSS3
*   Vanilla JavaScript

## Deployment

This is a static web application, perfectly suited for deployment on platforms like GitHub Pages. Simply push the code to a GitHub repository, and enable GitHub Pages from the repository settings.
