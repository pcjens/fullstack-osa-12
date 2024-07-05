import { useApolloClient, useMutation } from '@apollo/client'
import { useState } from 'react'
import { LOGIN, ME_QUERY_NAME } from '../queries'

const Login = ({ show, setToken, setPage, prevPage }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const apolloClient = useApolloClient();

  const [login] = useMutation(LOGIN, {
    onError: (err) => setError(err.message),
  });

  if (!show) {
    return null;
  }

  const submit = async (event) => {
    event.preventDefault();

    const { data } = await login({ variables: { username, password } });
    if (!data) {
      return;
    }
    const { login: { value: token } } = data;
    setToken(token);
    localStorage.setItem('books-login-token', token);
    apolloClient.refetchQueries({ include: [ME_QUERY_NAME] });
    setPage(prevPage);

    setUsername('');
    setPassword('');
    setError(null);
  }

  return (
    <div>
      {error != null && (<div className='error'>Login failed! {error}</div>)}
      <form onSubmit={submit}>
        <div>
          Username:
          <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          Password:
          <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>Login</button>
      </form>
    </div>
  )
};

export default Login;
