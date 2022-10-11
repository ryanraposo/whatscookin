import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

import Button from 'react-bootstrap/Button';


const Login = (props) => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();
  
    try {
      const { data } = await login({
        variables: { ...formState }
      });
    
      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className='d-flex flex-row justify-content-center mb-4 mt-4'>
      <div className='col-12 col-md-6'>
        <div className='card'>
          <h4 className='card-header'>Login</h4>
          <div className='card-body'>
            <form className="auth-form" onSubmit={handleFormSubmit}>
              <input
                className='form-input'
                placeholder='Your email'
                name='email'
                type='email'
                id='email'
                value={formState.email}
                onChange={handleChange}
              />
              <input
                className='form-input'
                placeholder='******'
                name='password'
                type='password'
                id='password'
                value={formState.password}
                onChange={handleChange}
              />
              <br/>
              <Button className="mt-3" variant="primary" type="submit">Submit</Button>
            </form>
            {error && <div>Login failed</div>}
          </div>
        </div>
      </div>
    </main>
  );
};


export default Login;
