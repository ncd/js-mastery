const express = require('express');
const { randomBytes } = require('crypto');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    const postId = req.params.id;
    const comments = commentsByPostId[postId];
    res.send(comments || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;
    const comments = commentsByPostId[req.params.id] || [];
    comments.push({
        id: commentId,
        content,
        status: 'pending'
    })
    commentsByPostId[req.params.id] = comments;
    await axios.post('http://event-bus:4005/events', { 
        type: 'CommentCreated',
        data: {
            postId: req.params.id,
            id: commentId,
            content,
            status: 'pending'
        }
    });
    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    console.log('Received event', req.body.type);
    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const comment = commentsByPostId[data.postId].find(c => c.id === data.id);
        comment.status = data.status;

        await axios.post('http://event-bus:4005/events', {
            type: 'CommentUpdated',
            data: {
                postId : data.postId,
                ...comment
            }
        });
    }
    
    res.send({});
});

app.listen(4001, () => {
    console.log('Listening on port 4001');
});
