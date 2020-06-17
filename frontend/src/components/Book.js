import React from "react";
import PropTypes from "prop-types";

const Book = ({ title, author }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{author}</p>
  </div>
);

Book.propTypes = {
  title: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
};

export default Book;
