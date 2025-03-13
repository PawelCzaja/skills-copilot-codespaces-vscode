// Create web server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');

app.use(bodyParser.json());

// Read the comments.json file
let data = fs.readFileSync('comments.json');
let comments = JSON.parse(data);

// Get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Get a comment by id
app.get('/comments/:id', (req, res) => {
    let id = req.params.id;
    let comment = comments[id];
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

// Add a comment
app.post('/comments', (req, res) => {
    let comment = req.body;
    let id = comments.length;
    comments.push(comment);
    saveComments();
    res.status(201).json(id);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
    let id = req.params.id;
    let comment = req.body;
    comments[id] = comment;
    saveComments();
    res.status(204).send();
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
    let id = req.params.id;
    if (comments[id]) {
        comments.splice(id, 1);
        saveComments();
        res.status(204).send();
    } else {
        res.status(404).send('Comment not found');
    }
});

// Save comments to the comments.json file
function saveComments() {
    let data = JSON.stringify(comments, null, 2);
    fs.writeFileSync('comments.json', data);
}

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000/comments');
});