# Task Manager Application

This is a simple Task Management Application that allows users to create, read, update, and delete tasks. The project demonstrates proficiency in both front-end and back-end development.

## Features
- Display a list of tasks
- Add new tasks with title, description, and due date
- View detailed information of each task
- Edit existing tasks
- Delete tasks
- Responsive design for desktop and mobile devices

## Technologies Used
- Front-end: React, Material-UI
- Back-end: Node.js, Express

## Setup and Installation

### Prerequisites
- Node.js
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/vansh029/Task-Management-APP.git
   cd Task-Management-APP
2. Dependencies:

bash
- npm install
- npm i axios
- npm install express body-parser cors
- npm install @mui/material @emotion/react @emotion/styled
- npm i @mui/icons-material

### Run the backend server:

- cd backend
- node server.js

### Run the frontend:

- npm run dev
- Open http://localhost:3000 with your browser to see the result.

### API Endpoints

    GET /api/tasks: Retrieve all tasks
    POST /api/tasks: Create a new task
    GET /api/tasks/:id: Retrieve a task by its ID
    PUT /api/tasks/:id: Update a task
    DELETE /api/tasks/:id: Delete a task

### Error Handling
The application includes error handling for invalid inputs and server errors. Proper status codes are returned with error messages. 

### Version Control
This project uses Git for version control. You can clone the repository and see the commit history for changes.

### Additional Notes

- Design Choices: Used Material-UI for a modern, responsive UI and custom CSS for fine-tuned styling.
- Challenges Faced: Managing state in React and ensuring seamless asynchronous operations between front-end and back-end.
- Future Improvements: Implement user authentication, integrate a persistent database, and add enhanced task management features.
