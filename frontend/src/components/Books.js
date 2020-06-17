import React from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Book from "./Book";

const Books = ({ books }) => (
  <TransitionGroup>
    {books.map(book => (
      <CSSTransition key={book.id} timeout={1000} classNames="book">
        <Book title={book.title} author={book.author} />
      </CSSTransition>
    ))}
  </TransitionGroup>
);

Books.propTypes = {
  books: PropTypes.array.isRequired,
};

export default Books;
