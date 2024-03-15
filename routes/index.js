const express = require('express');
const router = express.Router()

router.get("/hello", (req, res) => {
  res.send("hello contact routing")
})

// Import required modules

const bodyParser = require('body-parser');

// Create an instance of Express
const app = express();

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Sample data (in-memory storage)
let tasks = [];

// Define routes and API endpoints

// Get all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// Create a new task
app.post('/api/tasks', (req, res) => {
  const { title, description } = req.body;
  const newTask = { id: tasks.length + 1, title, description };
  tasks.push(newTask);
  res.status(201).json(newTask);
  res.send("hello contact routing")
});

// Get a specific task by ID
app.get('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const task = tasks.find(task => task.id === taskId);
  if (!task) {
    return res.status(404).json({ message: 'Task not found' });
  }
  res.json(task);
});

// Update a task by ID
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const { title, description } = req.body;
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks[taskIndex] = { ...tasks[taskIndex], title, description };
  res.json(tasks[taskIndex]);
});

// Delete a task by ID
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(task => task.id === taskId);
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  tasks.splice(taskIndex, 1);
  res.status(204).end();
});




module.exports = router