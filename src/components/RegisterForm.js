import React, { useState } from 'react'

const RegisterForm = (props) => {
    const initialState = { username: "", password: ""}
    const [input, setInput] = useState(initialState);
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      const createdUserToken = await props.signUp(input);
  
      if (createdUserToken) {
        props.history.push("/renta");
      } else {
        props.history.push("/");
      }
      
      setInput(initialState);
    };
    
    const handleChange = (e) => {
      setInput({ ...input, [e.target.name]: e.target.value });
    };
  
    return (
      <>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          <label htmlFor="username">Name: </label>
          <input
            id="username"
            name="username"
            value={input.username}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <label htmlFor="password">Password: </label>
          <input
            id="password"
            name="password"
            type="password"
            value={input.password}
            onChange={handleChange}
            required
          />
          <br />
          <br />
          <input type="submit" value="Add a reason to celebrate" />
        </form>
      </>
    );
  };

export default RegisterForm