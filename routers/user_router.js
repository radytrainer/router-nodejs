const express = require('express');
const {readFileSync, writeFileSync} = require('fs');
const router = express.Router();

let users = [];
let string = readFileSync('user.json');
if(string.toString().length > 0) {
    users = JSON.parse(string);
}
// Get all users
router.get('/', (req, res) => {
    res.json({users:users});
});
// Get one user
router.get('/:id', (req, res) => {
   let id = req.params.id;
   let user = users.find(user => user.id == id);
   if (user != undefined) {
    res.json({user:user});
   }else {
    res.json({error: "user not found"});
   }
});
// Create a user
router.post('/', (req, res) => {
    let lastIndex = users.length - 1;
    let lastId = users[lastIndex].id;
    let newuser = {
        id: lastId + 1,
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
     }
     users.push(newuser);
     writeFileSync('user.json', JSON.stringify(users));
     res.json({user:newuser, message: "user created successfully"});
});
// Update a user
router.put('/:id', (req, res) => {
    let id = req.params.id;
    let index = users.findIndex(user => user.id == id);
    if (index != -1) {
        users[index].title = req.body.title;
        users[index].status = req.body.status;
        writeFileSync('user.json', JSON.stringify(users));
        res.json({message: "user updated successfully"});
    } else {
        res.json({error: "user not found"});
    }
});
// Delete a user
router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let index = users.findIndex(user => user.id == id);
    if (index != -1) {
        users.splice(index, 1);
        writeFileSync('user.json', JSON.stringify(users));
        res.json({message: "user deleted successfully"});
    } else {
        res.json({error: "user not found"});
    }
});

module.exports = router;