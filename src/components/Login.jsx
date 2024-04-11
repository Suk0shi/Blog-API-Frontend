import Header from './Header'
import { useState } from 'react';

function Login() {
  
  const [message, setMessage] = useState();

    const handleSubmit = (e) => {
        e.preventDefault();

      const formData = new FormData(e.target);
      const payload = Object.fromEntries(formData);
      
      fetch(`https://bl0gapi.adaptable.app/log-in`, {
        method: 'Post', 
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload),
      })
      .then((response) => {
        if (response.status !== 200) {
          throw new Error(response.statusText);
        }

        return response.json();
      })
      .then((response) => {
        let token = response.token;
        localStorage.setItem("SavedToken", 'Bearer ' + token);
        setMessage('Logged in');
      })
      .catch((err) => {
        setMessage(err.toString());
      });
    }

    return (
      <>
        <Header ></Header>
        <form action="https://bl0gapi.adaptable.app/log-in" method="POST" onSubmit={handleSubmit}>
            <label htmlFor="username"> Username </label>
            <input type="text" name='username' placeholder='username'/>
            <label htmlFor="password"> Password </label>
            <input type="password" name='password' placeholder='password'/>
            <button>Log In</button>
        </form>
        <p>{message}</p>
      </>
    )
  }
  
  export default Login