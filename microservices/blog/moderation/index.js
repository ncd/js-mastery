const express = require('express');
const axios = require('axios');

const app = express();
app.use(express.json());

const handleEvent = async (type, data) => {
    if (type === 'CommentCreated') {
        const status = data.content.includes('orange') ? 'rejected' : 'approved';

        await axios.post('http://event-bus:4005/events', {
            type: 'CommentModerated',
            data: {
                ...data,
                status
            }
        });
    }
};

app.post('/events', async (req, res) => {
    const { type, data } = req.body;

    await handleEvent(type, data);
    res.send({});
});

app.listen(4003, async () => {
    console.log('Listening on 4003');

    const res = await axios.get('http://event-bus:4005/events');
    res.data.forEach(async event => {
        await handleEvent(event.type, event.data);
    });
});