const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [AuthorLite!]!
    me: User
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
    favoriteGenre: String
  }

  type AuthorLite {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type Author {
    id: ID!
    name: String!
    born: Int
    books: [String!]!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Mutation {
    addBook(
      title: String!
      author: String!
      published: Int!
      genres: [String!]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
      favoriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

    _resetDatabase: Boolean
  }

  type Subscription {
    bookAdded: Book!
  }
`;

module.exports = typeDefs;
