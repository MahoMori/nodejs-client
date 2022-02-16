import React from "react";

const classNameName = () => {
  return (
    <section>
      <div className="center top-button">
        <a href="/" className="button is-warning">
          ← Go Back To Main Page
        </a>
      </div>

      <div className="container">
        {/* <h3 className="title is-4"><%= article.title %></h3>
    <div><%= article.content %></div> */}
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
          <form action="/submit-comment" method="POST">
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input type="text" className="input" name="name" required />
              </div>
            </div>

            <div className="field">
              <label className="label">Write comment</label>
              <div className="control">
                <textarea
                  name="comment"
                  className="textarea"
                  required
                ></textarea>
              </div>
            </div>

            <input type="hidden" name="articleId" value="<%= article._id %>" />
            <button
              type="submit"
              className="button is-success is-light submit-comment-button"
            >
              Submit comment
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default classNameName;
