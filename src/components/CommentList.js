// src/components/CommentList.js
import React from 'react';

function CommentList({ comments }) {
  return (
    <div>
      {comments.map(comment => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <p>Note: {comment.rating}</p>
          <p>Posté par: {comment.User.username}</p>
        </div>
      ))}
    </div>
  );
}

export default CommentList;
