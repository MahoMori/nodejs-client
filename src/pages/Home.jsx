import React, { useContext, useState, useCallback, useEffect } from "react";
import { HeartSpinner } from "react-spinners-kit";
import { Link } from "react-router-dom";
import { ArticleContext } from "../context/ArticleContext";

const Home = () => {
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
        setArticleContext((prev) => ({ ...prev, articles: data }));
      } else {
        if (res.status === 401) {
          window.location.reload();
        } else {
          setArticleContext((prev) => ({ ...prev, articles: null }));
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
        <a href="/add-article" className="button is-primary is-light">
          + Add New
        </a>
      </div>

      <div className="container">
        {/* <% if(articles.length > 0) { const reversed = articles.reverse() %> */}

        {!articleContext.articles ? (
          <div>
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
                  ? article.content.slice(0, 200)
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
                  to={`/edit-delete-article/${article._id}`}
                  className="button is-light"
                >
                  Edit
                </Link>

                {/* <a
                  href={`/view-article/${article._id}`}
                  className="button is-text"
                >
                  Read more
                </a>
                <a
                  href={`/edit-delete-article/${article._id}`}
                  className="button is-light"
                >
                  Edit
                </a> */}
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default Home;
