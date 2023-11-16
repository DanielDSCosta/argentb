import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { setToken } from "../stores/user.store";
import { login } from "../services/users";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    const formValues = Object.fromEntries(data.entries());

    try {
      const response = await login(formValues.email, formValues.password);

      dispatch(setToken(response.body.token));
      navigate("/user");
    } catch (e) {
      // handle errors
    }
  };

  return (
    <main class="main bg-dark">
      <section class="sign-in-content">
        <i class="fa fa-user-circle sign-in-icon test"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSignIn} novalidate>
          <div class="input-wrapper">
            <label for="email">Email</label>
            <input type="text" id="email" name="email" />
          </div>
          <div class="input-wrapper">
            <label for="password">Password</label>
            <input type="password" id="password" name="password" />
          </div>
          <div class="input-remember">
            <input type="checkbox" id="remember-me" />
            <label for="remember-me">Remember me</label>
          </div>
          <button class="sign-in-button" type="submit">
            Sign In
          </button>
        </form>
      </section>
    </main>
  );
};
