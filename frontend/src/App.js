import React, { useEffect, useState } from "react";
import { useSubscription } from "@apollo/react-hooks";
import gql from "graphql-tag";

import Books from "./components/Books";

const bookAddedSubscription = gql`
  subscription {
    bookAdded {
      id
      title
      author
    }
  }
`;

const App = () => {
  const [books, setBooks] = useState([]);
  const { data } = useSubscription(bookAddedSubscription);

  useEffect(() => {
    if (data) {
      setBooks(oldBooks => [data.bookAdded, ...oldBooks]);
    }
  }, [data]);

  return <Books books={books} />;
};

export default App;
