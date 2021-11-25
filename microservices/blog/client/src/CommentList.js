import React from 'react';

const CommentList = ({ comments }) => {
    const renderedComments = comments.map(comment => {
        let content;
        switch(comment.status) {
            case 'approved':
                content = comment.content;
                break;
            case 'pending':
                content = 'This comment is pending';
                break;
            default:
                content = 'This comment has been rejected';
        }

        return (
            <li key={comment.id}>{content}</li>
        );
    });

    return (
        <div>
            <div>{comments.length} comments</div>
            {renderedComments}
        </div>
    )
}

export default CommentList
