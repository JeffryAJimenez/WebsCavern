import React, { Fragment, useState } from "react";
import { useMutation, useQuery, useEffect } from "@apollo/client";
import { Link, Redirect } from "react-router-dom";

//Mutation
import { loginUserMutation } from "../../queries/user_queries";
import { IsUserLoggedInQuery } from "../../queries/client_quieres";
import { isLoggedInVar } from "../../cache";

import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";

const Login = () => {
  const { data } = useQuery(IsUserLoggedInQuery);

  const [login, { loading, error }] = useMutation(loginUserMutation, {
    onCompleted({ login }) {
      localStorage.setItem("token", login.token);
      isLoggedInVar(true);
    },
  });

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({ variables: { email, password } });
    } catch (err) {
      console.log("Errors---", err);
    }
  };

  return data.isLoggedIn ? (
    <Redirect to='/posts' />
  ) : (
    <Fragment>
      <div className='showcase_logIn'>
        {loading ? <Spinner /> : null}

        {error ? <Alert payload={error.message} type={"danger"} /> : null}

        <div className='login_form_bg'>
          <form className='login_form' onSubmit={(e) => onSubmit(e)}>
            <h1>Sign Up Weeb</h1>
            <label htmlFor='input_email'>Email</label> <br></br>
            <input
              type='text'
              id='input_email'
              name='email'
              placeholder='Email'
              onChange={(e) => onChange(e)}
            ></input>{" "}
            <br></br>
            <label htmlFor='input_password'>Password</label>
            <br></br>
            <input
              type='password'
              id='input_password'
              name='password'
              placeholder='Password'
              onChange={(e) => onChange(e)}
            ></input>
            <br></br>
            <button type='submit'>SIGN UP</button>
            <p>
              Already a member? <Link to='/Login'>Log In!</Link>
            </p>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
