import React, { useState } from 'react';
import axios  from 'axios';



const PostCreate = () => {
    const [title, setTitle] = useState('');
    const onSubmit = async (e) => {
        e.preventDefault();
        
        const resp = await axios.post('http://localhost/posts/create', { title });
        console.log(resp.data);

        setTitle('');
    };

    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input value={title} onChange={e => setTitle(e.target.value)} type="text" className="form-control" id="title" />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default PostCreate