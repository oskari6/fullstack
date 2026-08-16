const typeDefs = `
  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
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

  type Author {
    id: ID!
    name: String!
    born: Int
    bookCount: Int!
  }

  type AuthorLite {
    name: String!
    born: Int
  }

  type Book {
    title: String!
    published: Int!
    author: AuthorLite!
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
`;

module.exports = typeDefs;
