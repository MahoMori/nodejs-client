import React, { useContext, useState, useCallback, useEffect } from "react";
import { HeartSpinner } from "react-spinners-kit";
import { useParams } from "react-router-dom";

import { UserContext } from "../context/UserContext";
import { ArticleContext } from "../context/ArticleContext";

const AddEditDelete = ({ editing }) => {
  const { _id } = useParams();
  const [articleContext, setArticleContext] = useContext(ArticleContext);
  const [loading, setLoading] = useState(false);

  const fetchArticle = useCallback(() => {
    setLoading(true);

    fetch(
      process.env.REACT_APP_BACKEND_ENDPOINT + `edit-delete-article/${_id}`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then(async (res) => {
      setLoading(false);

      if (res.ok) {
        const data = await res.json();
        setArticleContext((prev) => ({ ...prev, article: data }));
        setTitle(data.title);
        setContent(data.content);
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
    console.log("editing", editing);
    console.log("article", articleContext);

    if (editing) {
      fetchArticle();
    } else {
      articleContext.article = "adding mode";
    }
  }, []);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  // ----------- add -----------
  const handleAdd = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "add-article", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),

      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
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
          window.history.back();
        }
      })
      .catch((err) => {
        setError("Something went wrong. Please try again");
      });
  };

  // ----------- edit -----------
  const handleEdit = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "edit-article", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId: _id, title, content }),

      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
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
          window.history.back();
        }
      })
      .catch((err) => {
        setError("Something went wrong. Please try again");
      });
  };

  // ----------- delete -----------
  const handleDelete = (e) => {
    e.preventDefault();

    fetch(process.env.REACT_APP_BACKEND_ENDPOINT + "delete-article", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ articleId: _id }),

      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) {
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
          window.history.back();
        }
      })
      .catch((err) => {
        setError("Something went wrong. Please try again");
      });
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
        <div className="container">
          <form onSubmit={(e) => (editing ? handleEdit(e) : handleAdd(e))}>
            <button type="submit" className="button is-link add-edit-button">
              {editing ? "Edit" : "Add New Article"}
            </button>

            {error && (
              <p className="center">
                <span className="tag is-warning is-medium">{error}</span>
              </p>
            )}

            <div className="field">
              <label className="label">Title</label>
              <div className="control">
                <input
                  type="text"
                  className="input"
                  name="title"
                  defaultValue={editing ? articleContext.article.title : title}
                  required
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Content</label>
              <div className="control">
                <textarea
                  name="content"
                  className="textarea"
                  rows="10"
                  required
                  defaultValue={
                    editing ? articleContext.article.content : content
                  }
                  onChange={(e) => {
                    setContent(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
          </form>

          {editing && (
            <form onSubmit={handleDelete}>
              <button type="submit" className="button is-danger delete-button">
                Delete
              </button>
            </form>
          )}
        </div>
      )}
    </section>
  );
};

export default AddEditDelete;
