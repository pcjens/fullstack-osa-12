import { useQuery } from "@apollo/client"
import { ALL_BOOKS, ME } from "../queries"
import { useEffect, useState } from "react"

const Recommendations = (props) => {
  const [favoriteGenre, setFavoriteGenre] = useState(null);

  const meQuery = useQuery(ME);
  const booksQuery = useQuery(ALL_BOOKS, {
    variables: { genre: favoriteGenre },
  })

  useEffect(() => {
    if (meQuery.data?.me) {
      setFavoriteGenre(meQuery.data.me.favoriteGenre);
    }
  }, [meQuery.data]);

  if (!props.show) {
    return null
  }

  if (booksQuery.loading || meQuery.loading) {
    return <div>Loading books and user preferences...</div>
  } else if (booksQuery.error) {
    return <div className="error">{booksQuery.error.message}</div>
  } else if (meQuery.error) {
    return <div className="error">{meQuery.error.message}</div>
  }

  const { allBooks: books } = booksQuery.data

  return (
    <div>
      <h2>recommendations</h2>

      <div>
        books in your favorite genre <strong>{favoriteGenre}</strong>
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

export default Recommendations
