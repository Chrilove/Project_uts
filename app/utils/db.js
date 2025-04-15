// utils/db.js

let comments = [];

export function getComments() {
  return comments;
}

export function addComment(comment) {
  comment.id = Date.now(); // Simple unique ID
  comments.push(comment);
  return comment;
}
