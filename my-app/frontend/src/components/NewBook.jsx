import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ALL_AUTHORS_QUERY_NAME, ALL_BOOKS_QUERY_NAME, ALL_GENRES_QUERY_NAME, CREATE_BOOK } from '../queries'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  const [error, setError] = useState(null);

  const [createBook] = useMutation(CREATE_BOOK, {
    refetchQueries: [
      ALL_BOOKS_QUERY_NAME,
      ALL_AUTHORS_QUERY_NAME,
      ALL_GENRES_QUERY_NAME,
    ],
    onError: (err) => setError(err.message),
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()

    const { data } = await createBook({ variables: { title, author, published: Number.parseInt(published), genres } });
    if (!data) {
      return;
    }

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
    setError(null);
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      {error != null && (<div className='error'>Could not add book. {error}</div>)}
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            type="number"
            value={published}
            onChange={({ target }) => setPublished(target.value)}
          />
        </div>
        <div>
          <input
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook