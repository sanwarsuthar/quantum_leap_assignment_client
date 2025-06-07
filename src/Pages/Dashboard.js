import Layout from "../Components/Layout";
import { useEffect, useState } from "react";
import useRequest from "../hooks/useRequest";
import { useSelector } from "react-redux";


const Dashboard = () => {
  const { request, response, loading } = useRequest();
  const { id: userId } = useSelector((state) => state.auth);

  const [posts, setPosts] = useState([]);
  const [activePostId, setActivePostId] = useState(null);
  const [commentText, setCommentText] = useState("");
  const [editingComment, setEditingComment] = useState(null);

  // Fetch feed
  useEffect(() => {
    request("get", "posts/feed");
  }, []);

  useEffect(() => {
    if (response?.status && response.posts) {
      setPosts(response.posts);
    }
  }, [response]);

  // Like / Unlike a post
  const handleLike = (postId, liked) => {
    request("post", `posts/${postId}/like`);
    setPosts((prev) =>
      prev.map((p) =>
        p._id === postId
          ? {
              ...p,
              likedByUser: !liked,
              likes: liked ? p.likes - 1 : p.likes + 1,
            }
          : p
      )
    );
  };

  // Submit new or updated comment
  const handleCommentSubmit = (e, postId) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    if (editingComment) {
      request("put", `posts/comments/${editingComment._id}`, { text: commentText });
      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId 
            ? {
                ...post,
                comments: post.comments.map((c) =>
                  c._id === editingComment._id ? { ...c, text: commentText } : c
                ),
              }
            : post
        )
      );
      setEditingComment(null);
    } else {
      const newComment = {
        _id: Date.now(), // temporary ID
        text: commentText,
        user: { _id: userId },
      };

      request("post", `posts/${postId}/comments`, { text: commentText });

      setPosts((prev) =>
        prev.map((post) =>
          post._id === postId
            ? { ...post, comments: [...(post.comments || []), newComment] }
            : post
        )
      );
    }

    setCommentText("");
  };

  const handleEditComment = (comment) => {
    setEditingComment(comment);
    setCommentText(comment.text);
  };

  const handleDeleteComment = (postId, commentId) => {
    request("delete", `posts/comments/${commentId}`);
    setPosts((prev) =>
      prev.map((post) =>
        post._id === postId
          ? {
              ...post,
              comments: post.comments.filter((c) => c._id !== commentId),
            }
          : post
      )
    );
  };

  const toggleComments = (postId) => {
    setActivePostId((prev) => (prev === postId ? null : postId));
  };

  return (
    <Layout>
      <div className="container mt-5">
        <h4 className="mb-4">Feeds</h4>
        {loading && <div className="text-center mb-4">Loading...</div>}

        {posts.map((post) => (
          <div className="card mb-4 shadow-sm" key={post._id}>
            <div className="card-body">
              <h5 className="card-title">{post.title}</h5>
              <p className="card-text">{post.content}</p>

              <div className="d-flex justify-content-between align-items-center mb-3">
                {/* Left side: Total likes */}
                <div className="text-muted">
                  <span className="fw-semibold">Likes:</span> {post.likes}
                </div>

                {/* Right side: Action buttons */}
                <div className="d-flex gap-2">
                  <button
                    className={`btn btn-sm py-1 px-2 ${
                      post.likedByUser ? "btn-danger" : "btn-success"
                    }`}
                    onClick={() => handleLike(post._id, post.likedByUser)}
                  >
                    {post.likedByUser ? "Unlike" : "Like"}
                  </button>

                  <button
                    className="btn btn-sm btn-outline-secondary py-1 px-2"
                    onClick={() => toggleComments(post._id)}
                  >
                    {activePostId === post._id
                      ? "Hide Comments"
                      : "View Comments"}
                  </button>
                </div>
              </div>

              {activePostId === post._id && (
                <div className="mt-3">
                  <h6 className="mb-3">Comments</h6>

                  {post.comments?.length > 0 ? (
                    <ul className="list-group mb-3">
                      {post.comments.map((comment) => (
                        <li
                          key={comment._id}
                          className="list-group-item d-flex justify-content-between align-items-start"
                        >
                          <div>
                            <strong>
                              {comment.user?.email && comment.user?._id === userId ? "You" : comment.user?.email  }
                            </strong>
                            <p className="mb-1">{comment.text}</p>
                          </div>

                          {comment.user?._id === userId && (
                            <div className="d-flex gap-2">
                              <button
                                onClick={() => handleEditComment(comment)}
                                className="btn btn-outline-primary btn-sm py-1 px-2"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() =>
                                  handleDeleteComment(post._id, comment._id)
                                }
                                className="btn btn-outline-danger btn-sm py-1 px-2"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-muted">No comments yet.</p>
                  )}

                  <form
                    onSubmit={(e) => handleCommentSubmit(e, post._id)}
                    className="input-group"
                  >
                    <input
                      type="text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      className="form-control"
                      placeholder="Add a comment..."
                    />
                    <button type="submit" className="btn btn-primary">
                      {editingComment ? "Update" : "Comment"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default Dashboard;
