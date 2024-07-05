import { useMutation, useQuery } from "@apollo/client"
import { ALL_AUTHORS, EDIT_AUTHOR } from "../queries"
import { useState } from "react"

const Authors = ({ show, loggedIn }) => {
  const [editName, setEditName] = useState('')
  const [editBorn, setEditBorn] = useState('')

  const authorQuery = useQuery(ALL_AUTHORS)
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  if (!show) {
    return null
  }

  if (authorQuery.loading) {
    return <div>Loading authors...</div>
  } else if (authorQuery.error) {
    return <div className="error">{authorQuery.error.message}</div>
  }

  const { allAuthors: authors } = authorQuery.data

  const submit = async (event) => {
    event.preventDefault()

    const setBornTo = Number.parseInt(editBorn)
    await editAuthor({ variables: { name: editName, setBornTo } })

    setEditBorn('');
    setEditName('');
  };

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {loggedIn && (<div>
        <h3>Set birthyear</h3>
        <form onSubmit={submit}>
          <div>
            Name: <select
              value={editName}
              onChange={({ target }) => setEditName(target.value)}>
              <option></option>
              {authors.map((author) => (
                <option key={author.name}>{author.name}</option>
              ))}
            </select>
          </div>
          <div>
            Born: <input type="number"
              value={editBorn}
              onChange={({ target }) => setEditBorn(target.value)} />
          </div>
          <button type="submit">Save</button>
        </form>
      </div>)}
    </div>
  )
}

export default Authors
