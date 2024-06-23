const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // Set port as per your requirement

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample tasks data
const tasks = [
  {
    id: 1,
    title: "Task 1",
    description: "Description of Task 1",
    dueDate: "2024-06-25",
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description of Task 2",
    dueDate: "2024-06-26",
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description of Task 3",
    dueDate: "2024-06-26",
  },
  {
    id: 4,
    title: "Task 4",
    description: "Description of Task 4",
    dueDate: "2024-06-26",
  },
  {
    id: 5,
    title: "Task 5",
    description: "Description of Task 5",
    dueDate: "2024-06-26",
  },
  {
    id: 6,
    title: "Task 6",
    description: "Description of Task 6",
    dueDate: "2024-06-26",
  },
  {
    id: 7,
    title: "Task 7",
    description: "Description of Task 7",
    dueDate: "2024-06-26",
  },
  {
    id: 8,
    title: "Task 8",
    description: "Description of Task 8",
    dueDate: "2024-06-26",
  },
  {
    id: 9,
    title: "Task 9",
    description: "Description of Task 9",
    dueDate: "2024-06-26",
  },
  {
    id: 10,
    title: "Task 10",
    description: "Description of Task 10",
    dueDate: "2024-06-26",
  },
];

// Route to render HTML page with tasks
app.get("/", (req, res) => {
  const tasksList = tasks
    .map(
      (task) => `
    <div>
      <h3>Title: ${task.title}</h3>
      <p>Description: ${task.description}</p>
      <p>Due Date: ${task.dueDate}</p>
    </div>
  `
    )
    .join("");

  const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Task List</title>
    </head>
    <body>
      <h1>Task List</h1>
      ${tasksList}
    </body>
    </html>
  `;

  res.send(html);
});

// API routes for tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

app.post("/api/tasks", (req, res) => {
  const { title, description, dueDate } = req.body;
  const newTask = { id: tasks.length + 1, title, description, dueDate };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.put("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, dueDate } = req.body;
  const taskToUpdate = tasks.find((task) => task.id === id);
  if (!taskToUpdate) {
    return res.status(404).json({ message: "Task not found" });
  }
  taskToUpdate.title = title;
  taskToUpdate.description = description;
  taskToUpdate.dueDate = dueDate;
  res.json(taskToUpdate);
});

app.delete("/api/tasks/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((task) => task.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Task not found" });
  }
  const deletedTask = tasks.splice(index, 1);
  res.json(deletedTask[0]);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});