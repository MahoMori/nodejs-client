import React from "react";

const AddEditDelete = () => {
  return (
    <section>
      <div className="center top-button">
        <a href="/" className="button is-warning">
          ← Go Back To Main Page
        </a>
      </div>

      <div className="container">
        {/* <% if(editing) { %> */}

        <form action="/edit-article" method="POST">
          <button type="submit" className="button is-link add-edit-button">
            Edit
          </button>
          <input type="hidden" name="articleId" value="<%= article._id %>" />

          {/* <% }else{ %> */}

          {/* <form action="/add-article" method="POST">
    <button type="submit" className="button is-primary add-edit-button">Add New Article</button> */}

          {/* <% } %> */}

          <div className="field">
            <label className="label">Title</label>
            <div className="control">
              <input
                type="text"
                className="input"
                name="title"
                value="<% if(editing) { %><%= article.title%><% } %>"
                required
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
                //   ><% if(editing) { %><%= article.content %><% } %></textarea>
              ></textarea>
            </div>
          </div>
        </form>

        {/* <% if(editing) { %> */}

        <form action="/delete-article" method="POST">
          <button type="submit" className="button is-danger delete-button">
            Delete
          </button>
          <input type="hidden" name="articleId" value="<%= article._id %>" />
        </form>

        {/* <% } %> */}
      </div>
    </section>
  );
};

export default AddEditDelete;
