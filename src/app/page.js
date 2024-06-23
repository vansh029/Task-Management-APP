"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
} from "@mui/material";
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Info as InfoIcon,
} from "@mui/icons-material";

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const addTask = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/tasks", {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
      });
      const newTask = res.data;
      setTasks([...tasks, newTask]);
      console.log("New task added:", newTask);
      setFormData({ title: "", description: "", dueDate: "" });
      setOpenDialog(false); // Close dialog after adding task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        title: formData.title,
        description: formData.description,
        dueDate: formData.dueDate,
      });
      const updatedTask = res.data;
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
      console.log("Task updated:", updatedTask);
      setFormData({ title: "", description: "", dueDate: "" });
      setIsEditing(false);
      setCurrentTaskId(null);
      setOpenDialog(false); // Close dialog after updating task
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`);
      setTasks(tasks.filter((task) => task.id !== id));
      console.log("Task deleted:", id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEditing) {
      await updateTask(currentTaskId);
    } else {
      await addTask();
    }
  };

  const editTask = (task) => {
    setFormData({
      title: task.title,
      description: task.description,
      dueDate: task.dueDate,
    });
    setIsEditing(true);
    setCurrentTaskId(task.id);
    setOpenDialog(true); // Open dialog for editing task
  };

  const handleOpenDialog = () => {
    setFormData({ title: "", description: "", dueDate: "" });
    setIsEditing(false);
    setOpenDialog(true); // Open dialog for adding task
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const viewTaskDetails = (task) => {
    setSelectedTask(task);
    setOpenDetailsDialog(true);
  };

  return (
    <Container maxWidth="lg" style={{ marginTop: "50px" }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{
          marginBottom: "20px",
          fontWeight: "bolder",
          textAlign: "center",
        }}
      >
        Task List
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell style={{ fontWeight: "bolder" }}>Title</TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>
                    Description
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>
                    Due Date
                  </TableCell>
                  <TableCell style={{ fontWeight: "bolder" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell>{task.title}</TableCell>
                    <TableCell>{task.description}</TableCell>
                    <TableCell>{task.dueDate}</TableCell>
                    <TableCell>
                      <IconButton
                        color="primary"
                        aria-label="edit task"
                        onClick={() => editTask(task)}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="secondary"
                        aria-label="delete task"
                        onClick={() => deleteTask(task.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="view task details"
                        onClick={() => viewTaskDetails(task)}
                      >
                        <InfoIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleOpenDialog}
            style={{ marginTop: "20px" }}
          >
            Add Task
          </Button>

          <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>{isEditing ? "Edit Task" : "Add Task"}</DialogTitle>
            <DialogContent>
              <form onSubmit={handleSubmit}>
                <TextField
                  label="Title"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                />
                <TextField
                  label="Description"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                />
                <TextField
                  label="Due Date"
                  type="date"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Cancel</Button>
              <Button
                onClick={handleSubmit}
                variant="contained"
                color={isEditing ? "secondary" : "primary"}
              >
                {isEditing ? "Update" : "Add"}
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>
      </Grid>

      {/* Task Details Dialog */}
      <Dialog
        open={openDetailsDialog}
        onClose={() => setOpenDetailsDialog(false)}
      >
        <DialogTitle>Task Details</DialogTitle>
        <DialogContent>
          {selectedTask && (
            <div>
              <Typography variant="h6">{selectedTask.title}</Typography>
              <Typography variant="subtitle1">Description:</Typography>
              <Typography>{selectedTask.description}</Typography>
              <Typography variant="subtitle1">Due Date:</Typography>
              <Typography>{selectedTask.dueDate}</Typography>
            </div>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDetailsDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default App;