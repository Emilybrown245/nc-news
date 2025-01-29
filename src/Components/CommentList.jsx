import {useState, useEffect} from 'react'
import CommentCard from './CommentCard'
import {useParams} from 'react-router'
import Button from 'react-bootstrap/Button'
import axios from 'axios'
import Collapsible from './Collapsible'
import { fetchCommentsByArticleId, postComment, deleteComment } from '../api'; 


function CommentList ({article_id, updateArticleCommentCount, user}) {
    const { comment_id } = useParams();
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isLoadingCommentId, setIsLoadingCommentId] = useState(0)
    const [deletedComment, setDeletedComment] = useState("")
   
    const loggedInUser = user

    useEffect(() => {
        const loadComments = async () => {
            try {
                const commentsData = await fetchCommentsByArticleId(article_id);
                setComments(commentsData);
                updateArticleCommentCount(commentsData.length);
            } catch (err) {
                setError("Failed to load comments.");
            }
        };
        loadComments();
    }, [article_id, updateArticleCommentCount]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const newPostedComment = await postComment(article_id, loggedInUser, newComment);
            setComments((prevComments) => [newPostedComment, ...prevComments]);
            setNewComment("");
            updateArticleCommentCount((count) => count + 1);
        } catch (err) {
            setError("Failed to post comment. Try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const handleDelete = async (comment_id) => {
        setIsLoadingCommentId(comment_id);
        try {
            await deleteComment(comment_id);
            setComments((prevComments) => prevComments.filter((comment) => comment.comment_id !== comment_id));
            setDeletedComment("Comment has been successfully deleted.");
            updateArticleCommentCount((count) => count - 1);
        } catch (err) {
            setError("Failed to delete comment. Try again.");
        } finally {
            setIsLoadingCommentId(0);
        }
    };

return (
    <div className="comments-section">
        {error && <p>{error}</p>}
        <ul className="comments-list">
            <div className="comment-item">
                <form onSubmit={handleSubmit}>
                    <label htmlFor="post-comment" className="comment-text">
                        Comment:
                        <input
                            type="text"
                            id="post-comment"
                            required
                            placeholder="Write a comment"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                        />
                    </label>
                    <Button className="post-comment-btn" type="submit" disabled={isLoading}>
                        <span className="post-btn-text">{isLoading ? "Posting..." : "Post"}</span>
                    </Button>
                </form>
            </div>

            {deletedComment && <div className="deleted-comment-message"><p>{deletedComment}</p></div>}

            <Collapsible initialCount={10}>
                {comments.map((comment) => (
                    <li key={comment.comment_id}>
                        <CommentCard comment={comment} user={user} />
                        {comment.author === loggedInUser && (
                            <Button
                                className="delete-button"
                                onClick={() => handleDelete(comment.comment_id)}
                                disabled={isLoadingCommentId === comment.comment_id}
                            >
                                {isLoadingCommentId === comment.comment_id ? "Deleting..." : "Delete"}
                            </Button>
                        )}
                    </li>
                ))}
            </Collapsible>
        </ul>
    </div>
);
}


export default CommentList