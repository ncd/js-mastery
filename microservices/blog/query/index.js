const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(express.json());
app.use(cors());

const posts = {};

const handleEvent = (type, data) => {
    if (type === 'PostCreated') {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
    }
    if (type === 'CommentCreated') {
        const { postId, id, content, status } = data;
        posts[postId].comments.push({ id, content, status });
    }
    if (type === 'CommentUpdated') {
        const { postId, id, content, status } = data;
        const comment = posts[postId].comments.find(comment => comment.id === id);
        comment.content = content;
        comment.status = status;
    }
};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/events', (req, res) => {
    const { type, data } = req.body;
    console.log('Received Event', req.body);
    
    handleEvent(type, data);

    res.send({});
});

app.listen(4002, async () => {
    console.log('Listening on port 4002');

    const res = await axios.get('http://event-bus:4005/events');
    res.data.forEach(event => {
        handleEvent(event.type, event.data);
    });
});