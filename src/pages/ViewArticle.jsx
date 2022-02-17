import React, { useContext, useState, useCallback, useEffect } from "react";
import { HeartSpinner } from "react-spinners-kit";
import { useParams } from "react-router-dom";
import { ArticleContext } from "../context/ArticleContext";

const ViewArticle = () => {
  const { _id } = useParams();
  const [articleContext, setArticleContext] = useContext(ArticleContext);
  const [loading, setLoading] = useState(false);

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

  const [commentName, setCommentName] = useState("");
  const [comment, setComment] = useState("");

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    // fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "users/signup", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ firstName, lastName, username: email, password }),

    //   // cookie
    //   credentials: "include",
    // })
    //   .then(async (res) => {
    //     // setIsSubmitting(false)
    //     if (!res.ok) {
    //       if (res.status === 401) {
    //         setError("Invalid inputs");
    //       } else if (res.status === 500) {
    //         const data = await res.json();
    //         if (data.message) {
    //           setError(
    //             data.message ||
    //               "Something went wrong with the server. Please try again."
    //           );
    //         } else {
    //           setError("Something went wrong. Please try again");
    //         }
    //       } else {
    //         setError("Something went wrong. Please try again");
    //       }
    //     } else {
    //       const data = await res.json();
    //       setUserContext((prev) => ({ ...prev, token: data.token }));
    //       console.log("signup successful");
    //     }
    //   })
    //   .catch((err) => {
    //     // setIsSubmitting(false);
    //     setError("Something went wrong. Please try again");
    //   });

    setCommentName("");
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
              {/* <% if(article.comments.length > 0) { %>
          <% for(let comment of article.comments) { const newComment = comment.comment.split('\r\n') %>
            <div className="columns">
              <div className="column is-one-fifth">
                <p className="title is-6"><%= comment.name %></p>
              </div>
              <div className="column">
                <% for(let nc of newComment) { %>
                  <%= nc %>
                  <br>
                <% } %>
              </div>
            </div>
            <hr>
          <% } %>
        <% }else{%>
          <div>No Comments Yet</div>
          <hr>
        <% } %> */}
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
                      value={commentName}
                      required
                      onChange={(e) => setCommentName(e.target.value)}
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

                <input
                  type="hidden"
                  name="articleId"
                  value="<%= article._id %>"
                />
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
