import React, { useState } from 'react';

import "./registration-view.scss"

export function RegisterUser(props) {
    const [ username, setUsername ] = useState('');
    const [ password, setPassword ] = useState('');
    const [ email, setEmail ] = useState('');


    const registerSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, email);
        props.onRegister(username)
      };

      return (
        <form>
          <label>
            Username:
            <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
          </label>
          <button type="submit" onClick={registerSubmit}>Submit</button>
        </form>
      );
}

export default RegisterUser;