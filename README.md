# My To-Do List Application

A simple, responsive, and persistent To-Do Tracker built with pure HTML, CSS, and Vanilla JavaScript. This application allows users to add, edit, complete, and delete tasks, with all data saved directly in the browser's LocalStorage.

## Features

*   **Task Creation:** Easily add new tasks using an input field and an "Add Task" button.
*   **Task Editing:** Double-click on any task's text to make it editable. Press `Enter` or click outside to save changes.
*   **Task Completion:** Each task includes a checkbox to mark it as complete. Completed tasks are styled with a strikethrough.
*   **Task Deletion:** A dedicated "Delete" button for each task allows removal.
*   **Persistence:** All tasks and their completion status are automatically saved to and loaded from your browser's `LocalStorage`.
*   **Responsiveness:** The user interface is designed to look good and function well on various screen sizes (desktops, tablets, and mobile devices).
*   **No Backend:** A fully client-side application requiring no server or build tools.

## How to Use

1.  **Add a Task:** Type your task into the input field and click the "Add Task" button or press `Enter`.
2.  **Complete a Task:** Click the checkbox next to a task to mark it as complete or incomplete.
3.  **Edit a Task:** Double-click on the task's text. The text will become editable. Type your changes and press `Enter` or click anywhere else on the page to save.
4.  **Delete a Task:** Click the "Delete" button next to the task you wish to remove.

## Deployment

This application is designed for direct deployment on static hosting services like GitHub Pages.

To deploy on GitHub Pages:

1.  **Fork/Clone** this repository.
2.  **Push** the code to a GitHub repository.
3.  Go to your repository settings on GitHub.
4.  Navigate to the "Pages" section.
5.  Select the `main` branch (or your preferred branch) as the source for GitHub Pages.
6.  Your application will be live at `https://yourusername.github.io/your-repo-name/`.

## Technical Details

*   **HTML:** Structures the web page content.
*   **CSS:** Styles the application, including responsive design rules and the `.completed` class for strikethrough text.
*   **JavaScript:** Implements all dynamic functionality, including DOM manipulation, event handling, and `LocalStorage` management.
    *   A global function `editTask` is defined to handle initiating task text editing.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
