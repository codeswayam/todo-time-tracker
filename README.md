# To-Do Tracker

This is a simple, responsive To-Do Tracker web application built using HTML, CSS, and vanilla JavaScript. It allows users to add, manage, edit, and track the completion status of their tasks. The application leverages `LocalStorage` to ensure tasks persist across browser sessions, making it an ideal candidate for deployment on platforms like GitHub Pages.

## Features

*   **Task Management:** Add new tasks to your list.
*   **Task Editing:** Click on a task's text to transform it into an editable input field, allowing for quick modifications. Press `Enter` or click outside to save changes.
*   **Completion Tracking:** Each task includes a checkbox to mark it as completed or incomplete. Completed tasks are visually styled with a strikethrough.
*   **Persistent Storage:** All tasks and their completion statuses are saved in your browser's `LocalStorage`, ensuring your list is preserved even if you close and reopen the application.
*   **Prepopulated Tasks:** If no tasks are found in `LocalStorage`, the application automatically loads a set of default tasks to get you started.
*   **Responsiveness:** The user interface is designed to adapt gracefully to various screen sizes, providing a consistent experience on desktops, tablets, and mobile devices.

## How to Use

1.  **Add a Task:** Type your new task into the input field at the top and click the "Add Task" button or press `Enter`.
2.  **Edit a Task:** Click directly on the text of any existing task. The text will turn into an editable input. Type your changes and press `Enter` or click anywhere else on the page to save.
3.  **Mark as Complete:** Click the checkbox next to a task to toggle its completion status. Completed tasks will have a line through them.
4.  **Delete a Task:** Click the 'X' button next to a task to remove it from the list.

## Deployment (GitHub Pages)

This application is designed for easy deployment on GitHub Pages:

1.  **Create a Repository:** Host your project files (`index.html`, `style.css`, `script.js`, `LICENSE`, `README.md`) in a GitHub repository.
2.  **Enable GitHub Pages:** Go to your repository's "Settings" tab, then navigate to "Pages" in the left sidebar.
3.  **Choose Branch:** Select the branch (e.g., `main` or `master`) where your code resides and specify the `/ (root)` folder as the source.
4.  **Save:** Click "Save" and GitHub Pages will deploy your application. A link to your live site will be provided within a few minutes.

## Technologies Used

*   HTML5
*   CSS3
*   Vanilla JavaScript

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
