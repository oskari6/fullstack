import { ALL_BOOKS } from "../components/queries";

export const addBookToCache = (cache, bookToAdd) => {
  cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
    const bookExists = allBooks.some((book) => book.id === bookToAdd.id);

    if (bookExists) {
      return { allBooks };
    }

    return {
      allBooks: allBooks.concat(bookToAdd),
    };
  });
};
