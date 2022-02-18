import React, { useContext, useState, useCallback, useEffect } from "react";
import { HeartSpinner } from "react-spinners-kit";
import { Link } from "react-router-dom";

import { ArticleContext } from "../context/ArticleContext";

const Home = ({ token, setPath }) => {
  const [articleContext, setArticleContext] = useContext(ArticleContext);
  const [loading, setLoading] = useState(false);

  const fetchArticles = useCallback(() => {
    setLoading(true);
    fetch(process.env.REACT_APP_BACKEND_ENDPOINT, {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(async (res) => {
      setLoading(false);
      if (res.ok) {
        const data = await res.json();
        setArticleContext((prev) => ({ articles: data, ...prev }));
      } else {
        if (res.status === 401) {
          window.location.reload();
        } else {
          setArticleContext((prev) => ({ articles: null, ...prev }));
        }
      }
    });
  }, [setArticleContext]);

  useEffect(() => {
    fetchArticles();
  }, []);

  return (
    <section>
      <div className="center">
        <Link
          to={token === null ? "/login" : "/add-article"}
          className="button is-primary is-light"
          onClick={() => setPath("add-article")}
        >
          + Add New
        </Link>
      </div>

      <div className="container">
        {!articleContext.articles ? (
          <div className="container spinner-center">
            <HeartSpinner size={60} color="#ff7f50" loading={loading} />
          </div>
        ) : articleContext.articles === null ? (
          <h2>No Articles Yet</h2>
        ) : (
          articleContext.articles.map((article) => (
            <div className="box" key={article._id}>
              <h3 className="title is-4">{article.title}</h3>
              <div>
                {article.content.length > 200
                  ? article.content.slice(0, 200) + "..."
                  : article.content}
              </div>

              <div className="field is-grouped">
                <Link
                  to={`/view-article/${article._id}`}
                  className="button is-text"
                >
                  Read more
                </Link>
                <Link
                  to={
                    token === null
                      ? "/login"
                      : `/edit-delete-article/${article._id}`
                  }
                  className="button is-light"
                  onClick={() => setPath(`edit-delete-article/${article._id}`)}
                >
                  Edit
                </Link>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Home;
