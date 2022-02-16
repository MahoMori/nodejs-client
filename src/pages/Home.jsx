import React from "react";

const Home = () => {
  return (
    <section>
      <div className="center">
        <a href="/add-article" className="button is-primary is-light">
          + Add New
        </a>
      </div>
      <div className="container">
        {/* <% if(articles.length > 0) { const reversed = articles.reverse() %> */}
        {/* <% for(let article of reversed) { %> */}
        <div className="box">
          {/* <h3 className="title is-4"><%= article.title %></h3> */}
          <div>
            {/* <% if(article.content.length > 200) { %>
              <%= article.content.slice(0,200) %>...
            <% }else{ %>
              <%= article.content %>
            <% } %> */}
          </div>

          <div className="field is-grouped">
            <form action="/like-dislike-article" method="POST">
              <input
                type="hidden"
                name="articleId"
                value="<%= article._id %>"
              />
              {/* <% if(article.isLiked) { %>
                <button type="submit" className="fav-button">
                  <ion-icon name="star"></ion-icon>
                </button>
              <% }else{ %>
                <button type="submit" className="fav-button">
                  <ion-icon name="star-outline"></ion-icon>
                </button>
              <% } %> */}
            </form>

            <a
              href="/view-article/<%= article._id %>"
              className="button is-text"
            >
              Read more
            </a>
            <a
              href="/edit-delete-article/<%= article._id %>"
              className="button is-light"
            >
              Edit
            </a>
          </div>
        </div>
        {/* <% } %>
    <% }else{ %>
      <h2>No Articles Yet</h2>
    <% } %> */}
      </div>
    </section>
  );
};

export default Home;
