import React, { useContext, useState, useCallback, useEffect } from "react";
import { HeartSpinner } from "react-spinners-kit";
import { useParams } from "react-router-dom";
import { ArticleContext } from "../context/ArticleContext";

const ViewArticle = () => {
  const { _id } = useParams();
  const [articleContext, setArticleContext] = useContext(ArticleContext);
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const fetchArticle = useCallback(() => {
    setLoading(true);

    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + `view-article/${_id}`, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      setLoading(false);

      if (res.ok) {
        const data = await res.json();
        setArticleContext((prev) => ({ ...prev, article: data }));
      } else {
        if (res.status === 401) {
          window.location.reload();
        } else {
          setArticleContext((prev) => ({ ...prev, article: null }));
        }
      }
    });
  }, [setArticleContext]);

  useEffect(() => {
    fetchArticle();
  }, []);

  // ----------- add comment -----------
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    console.log("inside handlecommentsubmit");

    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "submit-comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId: _id, name, comment }),

      credentials: "include",
    })
      .then(async (res) => {
        console.log("inside comment then");

        if (!res.ok) {
          console.log("inside comment not ok");

          if (res.status === 401) {
            setError("Invalid inputs");
          } else if (res.status === 500) {
            const data = await res.json();
            if (data.message) {
              setError(
                data.message ||
                  "Something went wrong with the server. Please try again."
              );
            } else {
              setError("Something went wrong. Please try again");
            }
          } else {
            setError("Something went wrong. Please try again");
          }
        } else {
          console.log("inside comment ok");
        }
      })
      .catch((err) => {
        setError("Something went wrong. Please try again");
      });

    window.location.reload();
    setName("");
    setComment("");
  };

  return (
    <section>
      <div className="center top-button">
        <a href="/" className="button is-warning">
          ← Go Back To Main Page
        </a>
      </div>

      {!articleContext.article ? (
        <div className="container spinner-center">
          <HeartSpinner size={60} color="#ff7f50" loading={loading} />
        </div>
      ) : articleContext.article === null ? (
        <div className="container">Something went wrong. Please reload</div>
      ) : (
        <>
          <div className="container">
            <h3 className="title is-4">{articleContext.article.title}</h3>
            <div>{articleContext.article.content}</div>
          </div>

          <div className="container">
            <div>
              {articleContext.article.comments.length > 0 ? (
                articleContext.article.comments.map((comment) => (
                  <React.Fragment key={comment._id}>
                    <div className="columns">
                      <div className="column is-one-fifth">
                        <p className="title is-6">{comment.name}</p>
                      </div>
                      <div className="column">{comment.comment}</div>
                    </div>
                    <hr />
                  </React.Fragment>
                ))
              ) : (
                <div>No Comments Yet</div>
              )}
            </div>

            <div>
              <form onSubmit={handleCommentSubmit}>
                <div className="field">
                  <label className="label">Name</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      name="name"
                      value={name}
                      required
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                </div>

                <div className="field">
                  <label className="label">Write comment</label>
                  <div className="control">
                    <textarea
                      name="comment"
                      className="textarea"
                      value={comment}
                      required
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                </div>

                {error && (
                  <p className="center">
                    <span className="tag is-warning is-medium">{error}</span>
                  </p>
                )}

                <button
                  type="submit"
                  className="button is-success is-light submit-comment-button"
                >
                  Submit comment
                </button>
              </form>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ViewArticle;
