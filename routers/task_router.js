const express = require('express');
const {readFileSync, writeFileSync} = require('fs');
const router = express.Router();

let tasks = [];
let string = readFileSync('task.json');
if(string.toString().length > 0) {
    tasks = JSON.parse(string);
}
// Get all tasks
router.get('/', (req, res) => {
    res.json({tasks:tasks});
});
// Get one task
router.get('/:id', (req, res) => {
   let id = req.params.id;
   let task = tasks.find(task => task.id == id);
   if (task != undefined) {
    res.json({task:task});
   }else {
    res.json({error: "Task not found"});
   }
});
// Create a task
router.post('/', (req, res) => {
    let lastIndex = tasks.length - 1;
    let lastId = tasks[lastIndex].id;
    let newTask = {
        id: lastId + 1,
        title: req.body.title,
        status: req.body.status
     }
     tasks.push(newTask);
     writeFileSync('task.json', JSON.stringify(tasks));
     res.json({task:newTask, message: "Task created successfully"});
});
// Update a task
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let index = tasks.findIndex(task => task.id == id);
    if (index != -1) {
        tasks[index].title = req.body.title;
        tasks[index].status = req.body.status;
        writeFileSync('task.json', JSON.stringify(tasks));
        res.json({message: "Task updated successfully"});
    } else {
        res.json({error: "Task not found"});
    }
});
// Delete a task
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let index = tasks.findIndex(task => task.id == id);
    if (index != -1) {
        tasks.splice(index, 1);
        writeFileSync('task.json', JSON.stringify(tasks));
        res.json({message: "Task deleted successfully"});
    } else {
        res.json({error: "Task not found"});
    }
});

module.exports = router;