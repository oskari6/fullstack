import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderDirection: OrderDirection
    $orderBy: AllRepositoriesOrderBy
    $searchKeyword: String
  ) {
    repositories(
      orderDirection: $orderDirection
      orderBy: $orderBy
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          createdAt
          description
          forksCount
          fullName
          id
          ownerName
          name
          ratingAverage
          reviewCount
          stargazersCount
          watchersCount
          openIssuesCount
          url
          ownerAvatarUrl
          language
          userHasReviewed
        }
      }
    }
  }
`;

export const GET_ME = gql`
  query Me(
    $includeReviews: Boolean = false
    $first: Int
    $after: String
  ) {
    me {
      id
      username
      reviews(first: $first, after: $after) @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
            repository {
              url
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query Repository($id: ID!, $first: Int, $after: String) {
    repository(id: $id) {
      createdAt
      description
      forksCount
      fullName
      id
      ownerName
      name
      ratingAverage
      reviewCount
      stargazersCount
      watchersCount
      openIssuesCount
      url
      ownerAvatarUrl
      language
      userHasReviewed
      reviews(first: $first, after: $after) {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
        pageInfo {
          endCursor
          hasNextPage
        }
      }
    }
  }
`;
