import React, { useState } from "react";
import "./styles.css";

// Mock Comment Data (initial state)
const mockComments = [
  {
    id: 1,
    text: "Happy New Year folks! What are your resolutions this year?",
    replies: [
      {
        id: 2,
        text: "Same to you. I am planning to join a gym.",
        replies: [
          {
            id: 3,
            text: "I tried last year and gave up.",
            replies: [
              {
                id: 4,
                text: "Good on you, nothing is more important than good health.",
                replies: [],
              },
            ],
          },
        ],
      },
    ],
  },
];

// Counter for generating unique IDs
let idCounter = 4;

export default function CommentApp() {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");

  // Function to add a reply
  const addReply = (id, text) => {
    const addNestedReply = (commentList) => {
      return commentList.map((comment) => {
        // your code
        let replyData;
        if (comment.id === id) {
          replyData = {
            id: Date.now(),
            text,
            replies: [],
          };
          return {
            ...comment,
            replies: [...(comment?.replies || []), replyData],
          };
        }

        return { ...comment, replies: addNestedReply(comment.replies) };
      });
    };
    const updatedComments = addNestedReply(comments);
    // TODO: update state with new nested reply
    setComments(updatedComments);
  };

  // Function to add top-level comment
  const addComment = () => {
    // TODO: Your code
    if (newComment.trim()) {
      const commentToBeAdded = {
        id: idCounter + 1,
        text: newComment,
      };
      idCounter += 1;
      const updatedComment = [...comments, commentToBeAdded];
      setComments(updatedComment);
      setNewComment("");
    }
  };

  return (
    <div className="App">
      <h2>Comment Section</h2>
      <div className="new-comment">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Type a comment..."
          data-testid="new-comment-input"
        />
        <button data-testid="add-comment-btn" onClick={addComment}>
          Add Comment
        </button>
      </div>

      <div className="comments">
        {/* TODO: your code */}
        {comments.map((item) => {
          return <Comment comment={item} addReply={addReply} />;
        })}
      </div>
    </div>
  );
}

// Recursive Comment Component
const Comment = ({ comment, addReply }) => {
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleReply = () => {
    // TODO: Your code
    if (replyText.trim()) {
      addReply(comment.id, replyText);
      setReplyText("");
      setShowReplyInput(false);
    }
  };

  return (
    <div className="comment" data-testid={`comment-${comment.id}`}>
      <div>{comment.text}</div>
      <button
        onClick={() => setShowReplyInput(!showReplyInput)}
        data-testid={`reply-btn-${comment.id}`}
      >
        Add a reply
      </button>

      {showReplyInput && (
        <div className="reply-box">
          <input
            type="text"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            data-testid={`reply-input-${comment.id}`}
            placeholder="Type your reply..."
          />
          <button
            data-testid={`submit-reply-${comment.id}`}
            onClick={handleReply}
          >
            Submit
          </button>
        </div>
      )}

      <div className="replies">
        {/* TODO:your code */}
        {comment?.replies?.map((item) => {
          return <Comment comment={item} addReply={addReply} />;
        })}
      </div>
    </div>
  );
};
