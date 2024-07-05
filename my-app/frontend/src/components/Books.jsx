import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ALL_GENRES } from "../queries"
import { useState } from "react"

const Books = (props) => {
  const [genreFilter, setGenreFilter] = useState('');

  const booksQuery = useQuery(ALL_BOOKS, {
    variables: genreFilter ? { genre: genreFilter } : {},
  })
  const genresQuery = useQuery(ALL_GENRES);

  if (!props.show) {
    return null
  }

  if (booksQuery.loading || genresQuery.loading) {
    return <div>Loading books...</div>
  } else if (booksQuery.error) {
    return <div className="error">{booksQuery.error.message}</div>
  } else if (genresQuery.error) {
    return <div className="error">{genresQuery.error.message}</div>
  }

  const { allBooks: books } = booksQuery.data
  const genresWithDupes = genresQuery.data.allBooks
    .reduce((arr, book) => arr.concat(book.genres), [])
  const genres = [...new Set(genresWithDupes)];

  return (
    <div>
      <h2>books</h2>

      <div>
        filter by genre:
        <select value={genreFilter} onChange={({ target }) => setGenreFilter(target.value)}>
          <option></option>
          {genres.map((genre) => (<option key={genre}>{genre}</option>))}
        </select>
      </div>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
