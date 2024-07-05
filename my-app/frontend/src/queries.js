import { gql } from '@apollo/client'

const BOOK_DETAILS_FRAGMENT = gql`
    fragment BookDetails on Book {
        title
        author {
            name
        }
        published
        id
    }
`

export const ALL_AUTHORS_QUERY_NAME = 'AllAuthors'
export const ALL_AUTHORS = gql`
    query ${ALL_AUTHORS_QUERY_NAME} {
        allAuthors {
            name
            id
            born
            bookCount
        }
    }
`

export const ALL_BOOKS_QUERY_NAME = 'AllBooks'
export const ALL_BOOKS = gql`
    query ${ALL_BOOKS_QUERY_NAME}($genre: String) {
        allBooks(genre: $genre) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS_FRAGMENT}
`

export const ALL_GENRES_QUERY_NAME = 'AllGenres'
export const ALL_GENRES = gql`
    query ${ALL_GENRES_QUERY_NAME} {
        allBooks {
            genres
        }
    }
`

export const ME_QUERY_NAME = 'Me'
export const ME = gql`
    query ${ME_QUERY_NAME} {
        me {
            username
            favoriteGenre
        }
    }
`

export const CREATE_BOOK = gql`
    mutation createBook(
        $title: String!
        $author: String!
        $published: Int!
        $genres: [String!]!
    ) {
        addBook(
            title: $title
            author: $author
            published: $published
            genres: $genres
        ) {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS_FRAGMENT}
`

export const EDIT_AUTHOR = gql`
    mutation editAuthor(
        $name: String!
        $setBornTo: Int
    ) {
        editAuthor(
            name: $name
            setBornTo: $setBornTo
        ) {
            name
            id
            born
            bookCount
        }
    }
`

export const LOGIN = gql`
    mutation login(
        $username: String!
        $password: String!
    ) {
        login(
            username: $username
            password: $password
        ) {
            value
        }
    }
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded {
            ...BookDetails
        }
    }
    ${BOOK_DETAILS_FRAGMENT}
`
