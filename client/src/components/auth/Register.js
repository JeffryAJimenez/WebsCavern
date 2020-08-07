import React, { Fragment, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { Link, Redirect } from "react-router-dom";

//Mutation
import { resgisterUserMutation } from "../../queries/user_queries";
import { IsUserLoggedInQuery } from "../../queries/client_quieres";

import Alert from "../layout/Alert";
import Spinner from "../layout/Spinner";
import { isLoggedInVar } from "../../cache";

const Register = () => {
  const { data: isLoggedIn } = useQuery(IsUserLoggedInQuery);

  const [
    resgisterUser,
    { data, loading: loading_SignUp, error: error_SignUp },
  ] = useMutation(resgisterUserMutation);

  const [formData, setFormData] = useState({
    username: "",
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const { username, name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await resgisterUser({
        variables: {
          username: username,
          name: name,
          email: email,
          password: password,
          password2: password2,
        },
      });

      console.log(data);
    } catch (error) {
      console.log("Errors---", error);
    }
  };

  return isLoggedIn.isLoggedIn ? (
    <Redirect to='/posts' />
  ) : (
    <Fragment>
      <div className='showcase_logIn'>
        {loading_SignUp ? <Spinner /> : null}

        {error_SignUp ? (
          <Alert payload={error_SignUp.message} type={"danger"} />
        ) : null}

        {data ? (
          <Alert
            payload={`Account created! Welcome to the Cavern ${data.signup.username}`}
            type={"success"}
          />
        ) : null}

        <div className='login_form_bg'>
          <form className='login_form' onSubmit={(e) => onSubmit(e)}>
            <h1>Sign Up Weeb</h1>
            <label htmlFor='input_usernamel'>Username</label> <br></br>
            <input
              type='text'
              id='input_username'
              name='username'
              placeholder='Username'
              onChange={(e) => onChange(e)}
            ></input>{" "}
            <br></br>
            <label htmlFor='input_name'>Name</label> <br></br>
            <input
              type='text'
              id='input_name'
              name='name'
              placeholder='Name'
              onChange={(e) => onChange(e)}
            ></input>{" "}
            <br></br>
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
            <label htmlFor='input_confirm_password'>Confirm Password</label>
            <br></br>
            <input
              type='password'
              id='input_confirm_password'
              name='password2'
              placeholder='Confirm Password'
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

export default Register;
